"use client"

import ManageMenu from "@/components/utils/manage-menu";
import { useState, useActionState, useEffect } from "react";
import { useI18n } from "@/locales/client";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { sankeyParams } from "@/types/budget-types";
import BudgetChartItem from "./budget-chart-item";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { deleteSankey } from "@/lib/actions/budget";
import { toast } from "sonner";
import BudgetSheet from "./budget-sheet";

type BudgetChartProps = {
    datas: sankeyParams[]
}

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
                    { t('app.dashboard.budget.components.budgetChart.button.delete') }
                </span>
            )}
        </Button>
    )
}


export default function BudgetChart({
datas   
}: BudgetChartProps) {
    const t = useI18n();
    const [isOpenDeleteDialog,setIsOpenDeleteDialog] = useState<boolean>(false);
    const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [remainingAmount, setRemainingAmount] = useState<number>(0);

    const [state, deleteFormAction] = useActionState(deleteSankey, initialState);

    useEffect(() => {
        if (state.success) {
            toast.success(state.message)
            setIsOpenDeleteDialog(false)
        } else if (state.message && !state.success) {
            toast.error(state.message)
        }
    }, [state]);

    useEffect(() => {
        const total = (datas.filter((e) => e.to === "budget").reduce((sum, e) => sum + e.amount, 0)) - (datas.filter((e) => e.parentId === null && e.from === "budget").reduce((sum, e) => sum + e.amount, 0));
        setRemainingAmount(total)
    }, [datas]);
    return (
        <div className="pt-12">
            <div className="float-end">
                <ManageMenu 
                    onSheetOpen={setIsSheetOpen} 
                    onEdit={setIsEdit}
                    title={t('app.dashboard.budget.components.budgetChart.delete.title')}
                    description={t('app.dashboard.budget.components.budgetChart.delete.description')}
                >
                    <div className="grid gap-2 w-full">
                        <div className="float-start">
                            {state.errors && <p className="text-sm text-red-500">{state.errors?.sankeyData}</p>}
                        </div>  
                        <div className="flex flex-row justify-end gap-2">
                            <AlertDialogCancel >
                                { t('app.dashboard.budget.components.budgetChart.button.cancel') }
                            </AlertDialogCancel>
                            <form action={deleteFormAction}>
                                <DeleteButton t={t} />
                            </form>
                        </div>
                    </div>
               </ManageMenu>
            </div>
            <div>
                <BudgetChartItem datas={datas} />
                <div className="flex justify-center">
                    <p>{t('app.dashboard.budget.components.budgetChart.remainingAmount', { amount: remainingAmount.toFixed(2) ?? 0 })}</p>
                </div>
            </div>
            <BudgetSheet data={datas} sheetOpen={isSheetOpen} onSheetOpen={setIsSheetOpen} status={isEdit}/>
        </div>
    )
}