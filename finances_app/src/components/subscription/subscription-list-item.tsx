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
import { AlertDialog, AlertDialogContent, AlertDialogCancel, AlertDialogHeader, AlertDialogAction, AlertDialogFooter, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";
import SubscriptionManage from "./subscription-manage";

type SubscriptionListItemProps = {
  item: subscriptionParams;
};

export default function SubscriptionListItem({item} : SubscriptionListItemProps){
    const t = useI18n();
    const [isOpenDeleteDialog,setIsOpenDeleteDialog] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

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
                    <AlertDialog open={isOpenDeleteDialog} onOpenChange={setIsOpenDeleteDialog}>
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical/>
                                    <span className="sr-only">{ t('app.dashboard.subscription.components.subscriptionList.button.menu') }</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem 
                                    onClick={() => {
                                        setIsSheetOpen(true),
                                        setIsEdit(true)
                                    }}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <Pencil/>
                                    { t('app.dashboard.subscription.components.subscriptionList.button.update') }
                                </DropdownMenuItem>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem
                                        className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
                                        >
                                        <Trash2 className="text-destructive"/>
                                        { t('app.dashboard.subscription.components.subscriptionList.button.delete') }
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>{ t('app.dashboard.subscription.components.subscriptionList.delete.title') }</AlertDialogTitle>
                                <AlertDialogDescription>{ t('app.dashboard.subscription.components.subscriptionList.delete.description') }</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel >
                                    { t('app.dashboard.subscription.components.subscriptionList.button.cancel') }
                                </AlertDialogCancel>
                                <AlertDialogAction 
                                    // @click="remove(subscription.id?.toString() ?? '')"
                                >
                                    { t('app.dashboard.subscription.components.subscriptionList.button.delete') }
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </Card>
    )
}