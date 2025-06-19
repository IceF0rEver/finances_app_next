"use client"

import BudgetManage from "@/components/budget/budget-manage";
import { useEffect, useState } from "react";
import BudgetChart from "./budget-chart";
import type { BudgetPageProps } from "@/types/budget-types"; 

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
        <div className="w-full">
            <div className="flex justify-center">
                {status && status === true ? (        
                    <div className="w-full sm:max-w-4/5">
                        <BudgetChart datas={datas}/>
                    </div>
                ):(
                    <div className="h-full md:p-6 w-full md:max-w-4/5 lg:max-w-3/5 xl:max-w-2/5">
                        <BudgetManage datas={datas} status={status}/>
                    </div>
                )}
            </div>
        </div>
    )
}