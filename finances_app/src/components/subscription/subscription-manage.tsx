"use client"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { subscriptionParams } from "@/types/subscription-types";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/locales/client";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect, useCallback, startTransition } from "react";
import { createSubscription, updateSubscription } from "@/lib/actions/subscription-action";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subscriptionSchemas } from "@/lib/zod/subscription-schemas";
import { z } from "zod";
import { useSession } from "@/lib/auth-client"; 
import SubscriptionField from "./form/subscription-field";
import type { SubscriptionManageProps } from "@/types/subscription-types";


export default function SubscriptionManage({
sheetOpen, 
onSheetOpen, 
status, 
data
} : SubscriptionManageProps){
    const t = useI18n();
    const { data: session} = useSession();

    const getDefaultValues = useCallback(
        (subscriptionData?: subscriptionParams) => ({
            id: subscriptionData?.id || "",
            name: subscriptionData?.name || "",
            amount: subscriptionData?.amount || 0,
            recurrence: subscriptionData?.recurrence || "monthly",
            executionDate: subscriptionData?.executionDate || new Date(),
            icon: subscriptionData?.icon || "",
            userId: session?.user.id,
        }),
        [session?.user.id],
    )
    
    const [state, FormAction, isPending] = useActionState(status ? updateSubscription: createSubscription , {success: false});

    const subscriptionSchema = subscriptionSchemas(t).subscription
    type SubscriptionType = z.infer<typeof subscriptionSchema>
    const form = useForm<SubscriptionType>({
        resolver: zodResolver(subscriptionSchema),
        defaultValues: getDefaultValues(),
    })
    
    useEffect(() => {
        if (sheetOpen) {
            form.reset(getDefaultValues(data))
        }
    }, [sheetOpen, data, getDefaultValues, form])
    
    useEffect(() => {
        if (state.success) {
            toast.success(state.message);
            onSheetOpen(false);
        } else if (state.message && !state.success) {
            toast.error(state.message);
        }
    }, [state]);
    
    const onSubmit = () => {
        const formData = new FormData();
        Object.entries(form.getValues()).forEach(([key, value]) => {
            formData.append(key, value instanceof Date ? value.toISOString() : String(value));
        });

        startTransition(() => {
            FormAction(formData);
        });
    };

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
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 px-4">
                    <SubscriptionField
                        label={t("app.dashboard.subscription.components.subscriptionManage.form.name.label")}
                        control={form.control}
                        name="name"
                        type="text"
                    />
                    <SubscriptionField
                        label={t("app.dashboard.subscription.components.subscriptionManage.form.amount.label")}
                        control={form.control}
                        name="amount"
                        type="number"
                    />
                    <SubscriptionField
                        label={t("app.dashboard.subscription.components.subscriptionManage.form.recurrence.label")}
                        control={form.control}
                        fieldType="radio"
                        name="recurrence"
                        className="flex gap-4"
                        datas={[
                            {label: t("app.dashboard.subscription.components.subscriptionManage.form.recurrence.monthly"), value: "monthly"},
                            {label: t("app.dashboard.subscription.components.subscriptionManage.form.recurrence.annually"), value: "annually"}
                        ]}
                    />
                    <SubscriptionField
                        label={t("app.dashboard.subscription.components.subscriptionManage.form.executionDate.label")}
                        control={form.control}
                        name="executionDate"
                        fieldType="date"
                    />
                    <SubscriptionField
                        label={t("components.utils.inputIcon.label")}
                        placeholder={t("components.utils.inputIcon.placeholder")}
                        control={form.control}
                        name="icon"
                        fieldType="icon"
                    />
                    <SheetFooter>
                        <Button type="submit" variant="default" className="w-full" disabled={isPending}>
                            {isPending ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                <span>
                                    {status
                                        ? t("app.dashboard.subscription.components.subscriptionManage.button.update")
                                        : t("app.dashboard.subscription.components.subscriptionManage.button.add")}
                                </span>
                            )}
                        </Button>
                    </SheetFooter>
                </form>
		    </Form>
        </SheetContent>
        </Sheet>
    )
}