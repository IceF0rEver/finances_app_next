"use client"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { subscriptionParams } from "@/types/subscription-types"
import { Separator } from "@/components/ui/separator"
import { useI18n } from "@/locales/client";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon } from "lucide-react"
import InputIcon from "../utils/input-icon";
import { useState, useActionState, useEffect } from "react";
import { format } from 'date-fns';
import { useCurrentLocale } from "@/locales/client";
import { enUS, fr } from 'date-fns/locale';
import { Calendar } from "@/components/ui/calendar";
import { createSubscription, updateSubscription } from "@/lib/actions/subscription";
import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type SubscriptionManageProps = {
    sheetOpen: boolean;
    onSheetOpen: (sheetOpen: boolean) => void;
    status: boolean;
    data?: subscriptionParams
};

const initialState = {
    message: "",
    errors: {},
    success: false,
}

function SubmitButton({ status, t }: { status: boolean; t: any }) {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" variant="default" className="w-full" disabled={pending}>
            {pending ? (
                <Loader2 size={16} className="animate-spin" />
            ) : (
                <span>
                    {status
                        ? t("app.dashboard.subscription.components.subscriptionManage.button.update")
                        : t("app.dashboard.subscription.components.subscriptionManage.button.add")}
                </span>
            )}
        </Button>
    )
}

export default function SubscriptionManage({sheetOpen, onSheetOpen, status, data} : SubscriptionManageProps){
    const t = useI18n();
    const locale = useCurrentLocale();

    const [createState, createFormAction] = useActionState(createSubscription, initialState);
    const [updateState, updateFormAction] = useActionState(updateSubscription, initialState);

    const state = status ? updateState : createState;
    const formAction = status ? updateFormAction : createFormAction;

    const [subscriptionName, setSubscriptionName] = useState<string>(data?.name || "");
    const [subscriptionAmount, setSubscriptionAmount] = useState<number | undefined>(data?.amount || 0);
    const [subscriptionRecurrence, setSubscriptionRecurrence] = useState<string>(data?.recurrence || 'monthly');
    const [subscriptionExecutionDate, setSubscriptionExecutionDate] = useState<Date | undefined>(data?.executionDate || new Date());
    const [subscriptionIcon, setSubscriptionIcon] = useState<string | null>(data?.icon || null);

    useEffect(() => {
        if (state.success) {
            toast.success(state.message);
            onSheetOpen(false);
            setSubscriptionName("");
            setSubscriptionAmount(0);
            setSubscriptionRecurrence('monthly');
            setSubscriptionExecutionDate(new Date());
            setSubscriptionIcon(null);
        } else if (state.message && !state.success) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <Sheet open={sheetOpen} onOpenChange={onSheetOpen}>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>                                
                    { status === true 
                        ? t("app.dashboard.subscription.components.subscriptionManage.update.title") 
                        : t("app.dashboard.subscription.components.subscriptionManage.add.title") 
                    }
                </SheetTitle>
                <SheetDescription>
                    { status === true 
                        ? t("app.dashboard.subscription.components.subscriptionManage.update.description") 
                        : t("app.dashboard.subscription.components.subscriptionManage.add.description") 
                    }
                </SheetDescription>
                <Separator className="my-2" />
            </SheetHeader>
            <form action={formAction} className="grid gap-6 px-4">
                {status && data?.id && <input type="hidden" name="id" value={data.id} />}
                <div className="grid gap-2">
                    <Label htmlFor="name">{ t("app.dashboard.subscription.components.subscriptionManage.form.name.label") }</Label>
                    <Input 
                        value={subscriptionName}
                        onChange={(e) => setSubscriptionName(e.target.value)} 
                        name="name" 
                        id="name"
                        type="text" 
                        required 
                    />
                    {state.errors?.name && <p className="text-sm text-red-500">{state.errors.name[0]}</p>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="amount">{ t("app.dashboard.subscription.components.subscriptionManage.form.amount.label") }</Label>
                    <Input 
                        value={subscriptionAmount}
                        onChange={(e) => setSubscriptionAmount(Number(e.target.value))}  
                        name="amount" 
                        id="amount" 
                        type="number" 
                        required 
                    />
                    {state.errors?.amount && <p className="text-sm text-red-500">{state.errors.amount[0]}</p>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="recurrence">{ t("app.dashboard.subscription.components.subscriptionManage.form.recurrence.label") }</Label>
                    <RadioGroup 
                        name="recurrence"
                        defaultValue="monthly" 
                        value={subscriptionRecurrence}
                        onValueChange={(e) => setSubscriptionRecurrence(e)}
                        orientation="horizontal" 
                        className="flex flex-row gap-4"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem id="monthly" value="monthly" />
                            <Label htmlFor="monthly">{ t("app.dashboard.subscription.components.subscriptionManage.form.recurrence.monthly") }</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem id="annually" value="annually" />
                            <Label htmlFor="annually">{ t("app.dashboard.subscription.components.subscriptionManage.form.recurrence.annually") }</Label>
                        </div>
                    </RadioGroup>
                    {state.errors?.recurrence && <p className="text-sm text-red-500">{state.errors.recurrence[0]}</p>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="executionDate">{ t("app.dashboard.subscription.components.subscriptionManage.form.executionDate.label") }</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <div>
                                <Button variant="outline" type="button" className="w-full text-start font-normal text-muted-foreground">   
                                    <span>
                                        { subscriptionExecutionDate ? format(subscriptionExecutionDate, 'yyyy-MM-dd') : ''}
                                    </span>
                                    <CalendarIcon className="ms-auto h-4 w-4 opacity-50"/>
                                </Button>
                                <input hidden/>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                locale={locale === "fr" ? fr : enUS}
                                selected={subscriptionExecutionDate}
                                onSelect={setSubscriptionExecutionDate}
                                className="rounded-md border mx-auto"
                            />
                        </PopoverContent>
                    </Popover>
                    <input
                        type="hidden"
                        name="executionDate"
                        value={subscriptionExecutionDate ? subscriptionExecutionDate.toISOString() : ""}
                    />
                    {state.errors?.executionDate && <p className="text-sm text-red-500">{state.errors.executionDate[0]}</p>}
                </div>
                <div>
                    <InputIcon icon={subscriptionIcon} onIcon={setSubscriptionIcon}/>
                    <input 
                        type="hidden" 
                        name="icon" 
                        value={subscriptionIcon || ""} 
                    />
                    {state.errors?.icon && <p className="text-sm text-red-500">{state.errors.icon[0]}</p>}
                </div>
                <SheetFooter>
                    <SubmitButton status={status} t={t} />
                </SheetFooter>
            </form>
        </SheetContent>
        </Sheet>
    )
}