"use client";

import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { startTransition, useActionState, useState } from "react";
import type { SubscriptionListItemProps } from "@/app/[locale]/dashboard/subscription/_components/_types/subscription-types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ManageMenu from "@/components/utils/manage-menu";
import type { Subscription } from "@/generated/prisma";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/locales/client";
import { deleteSubscription } from "./_serveractions/actions";
import SubscriptionManage from "./subscription-manage";

export default function SubscriptionListItem({
	item,
}: SubscriptionListItemProps) {
	const t = useI18n();
	const [_isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false);
	const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);

	const [state, deleteFormAction, isPending] = useActionState(
		deleteSubscription,
		{
			success: false,
		},
	);

	useToast(state, isPending, {
		loadingMessage: t("toast.loading.deleteSubscription"),
		successMessage: t("toast.success.deleteSubscription"),
		errorMessage: t("toast.error"),
		onSuccess: () => {
			setIsOpenDeleteDialog(false);
		},
	});

	const onSubmit = (id: Subscription["id"]) => {
		startTransition(() => {
			deleteFormAction(id);
		});
	};
	return (
		<Card className="overflow-hidden border-border/40 hover:border-border/80 transition-colors p-0">
			<SubscriptionManage
				sheetOpen={isSheetOpen}
				onSheetOpen={setIsSheetOpen}
				status={isEdit}
				data={item}
			/>
			<div className="flex">
				<div className="flex items-center justify-center bg-muted w-16 sm:w-20">
					<div className="flex items-center justify-center">
						<Icon
							icon={item.icon}
							className="size-10 sm:size-12 text-primary"
						/>
					</div>
				</div>
				<CardContent className="flex-1 p-3 sm:p-4">
					<div className="flex justify-between items-start">
						<div>
							<h3 className="font-semibold text-base sm:text-lg">
								{item.name}
							</h3>
							<div className="flex flex-wrap items-center gap-2 mt-1">
								<Badge
									variant={
										item.recurrence === "monthly" ? "default" : "outline"
									}
									className="text-xs"
								>
									{item.recurrence === "monthly"
										? t(
												"subscription.components.subscriptionList.badge.monthly",
											)
										: t(
												"subscription.components.subscriptionList.badge.annually",
											)}
								</Badge>
								<span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 whitespace-nowrap">
									<Calendar />
									{format(item.executionDate, "yyyy-MM-dd")}
								</span>
							</div>
						</div>
						<div className="font-bold text-right whitespace-nowrap">
							{item.amount.toFixed(2)} €
						</div>
					</div>
				</CardContent>
				<div className="flex items-start p-2">
					<ManageMenu
						disabled={isPending}
						onOpenAction={() => {
							setIsSheetOpen(true);
							setIsEdit(true);
						}}
						onDialogAction={() => {
							onSubmit(item?.id!);
						}}
						title={t("subscription.components.subscriptionList.delete.title")}
						description={t(
							"subscription.components.subscriptionList.delete.description",
						)}
					/>
				</div>
			</div>
		</Card>
	);
}
