"use client"
import BudgetManage from "@/components/budget/budget-manage";
import type { sankeyParams } from "@/types/budget-types";
import { useEffect, useState } from "react";
import BudgetChart from "./budget-chart";

type BudgetPageProps = {
    datas: sankeyParams[]
}

export default function BudgetPage({
datas
} : BudgetPageProps) {
    const [status, setStatus] = useState<boolean>(false);

    useEffect(() => {
        if (datas.length === 0) {
            setStatus(false);
        } else {
            setStatus(true);
        }
    }, [datas])

    return (
        <div className="max-w-[calc(100vw-3rem)] md:w-full">
            <div className="flex justify-center">
                {status && status === true ? (        
                    <div className="overflow-x-auto">
                        <BudgetChart datas={datas}/>
                    </div>
                ):(
                    <div className="md:p-6 w-full max-w-2/5">
                        <BudgetManage datas={datas} status={status}/>
                    </div>
                )}
            </div>
        </div>
    )
}