"use client";

import { use, useEffect, useState } from "react";
import type { BudgetPageProps } from "@/app/[locale]/dashboard/budget/_components/_types/budget-types";

import BudgetChart from "./budget-chart";
import BudgetManage from "./budget-manage";

export default function BudgetPage({ budgets }: BudgetPageProps) {
	const [status, setStatus] = useState<boolean>(false);

	const { sankeyDatas } = use(budgets);

	useEffect(() => {
		if (sankeyDatas.length === 0) {
			setStatus(false);
		} else {
			setStatus(true);
		}
	}, [sankeyDatas]);

	return (
		<div className="w-full">
			<div className="flex justify-center">
				{status ? (
					<div className="w-full sm:max-w-4/5">
						<BudgetChart datas={sankeyDatas} />
					</div>
				) : (
					<div className="h-full md:p-6 w-full md:max-w-4/5 lg:max-w-3/5 xl:max-w-2/5">
						<BudgetManage datas={sankeyDatas} status={status} />
					</div>
				)}
			</div>
		</div>
	);
}
