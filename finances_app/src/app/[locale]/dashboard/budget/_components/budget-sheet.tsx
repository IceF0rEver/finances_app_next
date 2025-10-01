"use client";

import type { BudgetSheetProps } from "@/app/[locale]/dashboard/budget/_components/_types/budget-types";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { useI18n } from "@/locales/client";
import BudgetManage from "./budget-manage";

export default function BudgetSheet({
	sheetOpen,
	onSheetOpen,
	data,
}: BudgetSheetProps) {
	const t = useI18n();

	return (
		<Sheet open={sheetOpen} onOpenChange={onSheetOpen}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>
						{t("budget.components.budgetSheet.update.title")}
					</SheetTitle>
					<SheetDescription>
						{t("budget.components.budgetSheet.update.description")}
					</SheetDescription>
					<Separator className="my-2" />
				</SheetHeader>
				<BudgetManage datas={data} status={true} onOpen={onSheetOpen} />
			</SheetContent>
		</Sheet>
	);
}
