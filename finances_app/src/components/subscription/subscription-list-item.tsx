"use client"

import { MoreVertical, Pencil, Trash2, Calendar} from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { Icon } from "@iconify/react"
import { Card, CardContent } from "@/components/ui/card"
import type { subscriptionParams } from "@/types/subscription-types"
import { Button } from "@/components/ui/button";
import { useI18n } from "@/locales/client";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";
import SubscriptionManage from "./subscription-manage";
import { deleteSubscription } from "@/lib/actions/subscription";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import ManageMenu from "../utils/manage-menu";

type SubscriptionListItemProps = {
    item: subscriptionParams;
};

const initialState = {
    message: "",
    errors: {},
    success: false,
}

function DeleteButton({ t }: { t: any }) {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" variant="default" className="w-full" disabled={pending}>
            {pending ? (
                <Loader2 size={16} className="animate-spin" />
            ) : (
                <span>
                    { t('app.dashboard.subscription.components.subscriptionList.button.delete') }
                </span>
            )}
        </Button>
    )
}

export default function SubscriptionListItem({item} : SubscriptionListItemProps){
    const t = useI18n();
    const [isOpenDeleteDialog,setIsOpenDeleteDialog] = useState<boolean>(false);
    const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [state, deleteFormAction] = useActionState(deleteSubscription, initialState);

    useEffect(() => {
        if (state.success) {
            toast.success(state.message)
            setIsOpenDeleteDialog(false)
        } else if (state.message && !state.success) {
            toast.error(state.message)
        }
    }, [state]);
    return (
        <Card className="overflow-hidden border-border/40 hover:border-border/80 transition-colors p-0">
            <SubscriptionManage sheetOpen={isSheetOpen} onSheetOpen={setIsSheetOpen} status={isEdit} data={item} />
            <div className="flex">
                <div className="flex items-center justify-center bg-muted w-16 sm:w-20">
                    <div className="flex items-center justify-center">
                        <Icon icon={item.icon} className="size-10 sm:size-12 text-primary"/>
                    </div>
                </div>
                <CardContent className="flex-1 p-3 sm:p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-semibold text-base sm:text-lg">
                                {item.name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                                <Badge variant={item.recurrence === 'monthly' ? 'default' : 'outline'} className="text-xs">
                                    { item.recurrence === "monthly" 
                                        ? t('app.dashboard.subscription.components.subscriptionList.badge.monthly') 
                                        : t('app.dashboard.subscription.components.subscriptionList.badge.annually') 
                                    }
                                </Badge>
                                <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 whitespace-nowrap">
                                    <Calendar/>
                                    {format(item.executionDate, 'yyyy-MM-dd')}
                                </span>
                            </div>
                        </div>
                        <div className="font-bold text-right whitespace-nowrap">
                            { item.amount.toFixed(2) } €
                        </div>
                    </div>
                </CardContent>
                <div className="flex items-start p-2">
                    <ManageMenu 
                        onSheetOpen={setIsSheetOpen} 
                        onEdit={setIsEdit}
                        title={t('app.dashboard.subscription.components.subscriptionList.delete.title')}
                        description={t('app.dashboard.subscription.components.subscriptionList.delete.description')}
                    >
                        <div className="grid gap-2 w-full">
                            <div className="float-start">
                                {state.errors?.id && <p className="text-sm text-red-500">{state.errors.id[0]}</p>}
                            </div>  
                            <div className="flex flex-row justify-end gap-2">
                                <AlertDialogCancel >
                                    { t('app.dashboard.subscription.components.subscriptionList.button.cancel') }
                                </AlertDialogCancel>
                                <form action={deleteFormAction}>
                                    {item?.id && <input type="hidden" name="id" value={item.id} />}
                                    <DeleteButton t={t} />
                                </form>
                            </div>
                        </div>
                    </ManageMenu>
                </div>
            </div>
        </Card>
    )
}