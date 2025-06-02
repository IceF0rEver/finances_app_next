"use client"
import { sankeyParams } from "@/types/budget-types";
import BudgetManage from "./budget-manage";
import { 
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription, 
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/locales/client";

type BudgetSheetProps = {
    sheetOpen: boolean;
    onSheetOpen: (sheetOpen: boolean) => void;
    status: boolean;
    data: sankeyParams[]
};
export default function BudgetSheet({
sheetOpen, 
onSheetOpen, 
status, 
data
} : BudgetSheetProps) {
    const t = useI18n();

    return (
        <Sheet open={sheetOpen} onOpenChange={onSheetOpen}>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>
                    { status === true 
                        ? t("app.dashboard.budget.components.budgetSheet.update.title")
                        : t("app.dashboard.budget.components.budgetSheet.add.title")
                    }
                </SheetTitle>
                <SheetDescription>
                    { status === true 
                        ? t("app.dashboard.budget.components.budgetSheet.update.description")
                        : t("app.dashboard.budget.components.budgetSheet.add.description")
                    }
                </SheetDescription>
                <Separator className="my-2" />
            </SheetHeader>
            <BudgetManage datas={data} status={status} onOpen={onSheetOpen} />
            </SheetContent>
        </Sheet>
    )
}