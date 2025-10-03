"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import type { BudgetChartProps } from "@/app/[locale]/dashboard/budget/_components/_types/budget-types";
import ManageMenu from "@/components/utils/manage-menu";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/locales/client";
import { deleteSankey } from "./_serveractions/actions";
import BudgetChartItem from "./budget-chart-item";
import BudgetSheet from "./budget-sheet";

export default function BudgetChart({ datas }: BudgetChartProps) {
	const t = useI18n();

	const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
	const [remainingAmount, setRemainingAmount] = useState<number>(0);

	const [state, deleteFormAction, isPending] = useActionState(deleteSankey, {
		success: false,
	});

	useToast(state, isPending, {
		loadingMessage: t("toast.loading.deleteSankey"),
		successMessage: t("toast.success.deleteSankey"),
		errorMessage: t("toast.error"),
	});

	useEffect(() => {
		const total =
			datas
				.filter((e) => e.to === "budget")
				.reduce((sum, e) => sum + Number(e.amount), 0) -
			datas
				.filter((e) => e.parentId === null && e.from === "budget")
				.reduce((sum, e) => sum + Number(e.amount), 0);
		setRemainingAmount(total);
	}, [datas]);

	return (
		<>
			<div className="float-end">
				<ManageMenu
					disabled={isPending}
					onOpenAction={() => {
						setIsSheetOpen(true);
					}}
					onDialogAction={() => {
						startTransition(() => {
							deleteFormAction();
						});
					}}
					title={t("budget.components.budgetChart.delete.title")}
					description={t("budget.components.budgetChart.delete.description")}
				/>
			</div>
			<div>
				<BudgetChartItem datas={datas} />
				<div className="flex justify-center text-center">
					{remainingAmount > 0 ? (
						<p>
							{/* @ts-ignore */}
							{t("budget.components.budgetChart.remainingAmount.positive", {
								amount: remainingAmount.toFixed(2) ?? 0,
							})}
						</p>
					) : (
						<p>
							{/* @ts-ignore */}
							{t("budget.components.budgetChart.remainingAmount.negative", {
								amount: remainingAmount.toFixed(2) ?? 0,
							})}
						</p>
					)}
				</div>
			</div>
			<BudgetSheet
				data={datas}
				sheetOpen={isSheetOpen}
				onSheetOpen={setIsSheetOpen}
			/>
		</>
	);
}
