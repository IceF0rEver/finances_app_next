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
import { useState } from "react";
import { format } from 'date-fns';
import { useCurrentLocale } from "@/locales/client";
import { enUS, fr } from 'date-fns/locale';
import { Calendar } from "@/components/ui/calendar";

type SubscriptionManageProps = {
    sheetOpen: boolean;
    onSheetOpen: (sheetOpen: boolean) => void;
    status: boolean;
    data?: subscriptionParams
};

export default function SubscriptionManage({sheetOpen, onSheetOpen, status, data} : SubscriptionManageProps){
    const t = useI18n();
    const locale = useCurrentLocale();

    const [subscriptionName, setSubscriptionName] = useState<string>(data?.name || "");
    const [subscriptionAmount, setSubscriptionAmount] = useState<number>(data?.amount || 0);
    const [subscriptionRecurrence, setSubscriptionRecurrence] = useState<string>(data?.recurrence || 'monthly');
    const [subscriptionExecutionDate, setSubscriptionExecutionDate] = useState<Date | undefined>(data?.executionDate || new Date());
    const [subscriptionIcon, setSubscriptionIcon] = useState<string | null>(data?.icon || null);
    
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
            {/* <p v-if="errorMessage" className="text-red-500 text-sm pt-2">{ errorMessage }</p> */}
            <div className="grid gap-6 px-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">{ t("app.dashboard.subscription.components.subscriptionManage.form.name.label") }</Label>
                    <Input 
                        value={subscriptionName}
                        onChange={(e) => setSubscriptionName(e.target.value)}  
                        id="name"
                        type="text" 
                        required 
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="amount">{ t("app.dashboard.subscription.components.subscriptionManage.form.amount.label") }</Label>
                    <Input 
                        value={subscriptionAmount}
                        onChange={(e) => setSubscriptionAmount(Number(e.target.value))}   
                        id="amount" 
                        type="number" 
                        required 
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="recurrence">{ t("app.dashboard.subscription.components.subscriptionManage.form.recurrence.label") }</Label>
                    <RadioGroup 
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
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="executionDate">{ t("app.dashboard.subscription.components.subscriptionManage.form.executionDate.label") }</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <div>
                                <Button variant="outline" className="w-full text-start font-normal text-muted-foreground">   
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
                </div>
                <div>
                    <InputIcon icon={subscriptionIcon} onIcon={setSubscriptionIcon}/>
                </div>
            </div>
            <SheetFooter>
                <div>
                    { status === true &&
                        <Button 
                        // @click="manage('update')"
                        type="submit"
                        variant={"default"}
                        className="w-full" 
                        >
                            { t("app.dashboard.subscription.components.subscriptionManage.button.update") }
                        </Button>
                    }
                    { status === false &&
                        <Button 
                        // @click="manage('add')"
                        type="submit"
                        variant={"default"}
                        className="w-full" 
                        >
                            { t("app.dashboard.subscription.components.subscriptionManage.button.add") }
                        </Button>
                    }
                </div>
            </SheetFooter>
        </SheetContent>
        </Sheet>
    )
}