"use client";

import { type JSX, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BudgetTabProps {
	triggerData: { label: string; value: "incomes" | "expenses" }[];
	contentData: { component: JSX.Element; value: "incomes" | "expenses" }[];
}

export default function BudgetTab({
	triggerData,
	contentData,
}: BudgetTabProps) {
	const [activeTab, setActiveTab] = useState<"incomes" | "expenses">("incomes");

	return (
		<Tabs
			defaultValue={activeTab}
			onValueChange={(value) => setActiveTab(value as typeof activeTab)}
		>
			<TabsList className="grid w-full grid-cols-2 gap-2">
				{triggerData?.map((item) => (
					<TabsTrigger key={item.value} value={item.value}>
						{item.label}
					</TabsTrigger>
				))}
			</TabsList>
			{contentData?.map(
				(item: { component: JSX.Element; value: "incomes" | "expenses" }) => (
					<TabsContent key={item.value} value={item.value}>
						{item.component}
					</TabsContent>
				),
			)}
		</Tabs>
	);
}
