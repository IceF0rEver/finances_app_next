"use client"

import { 
    Tabs,
    TabsContent,
    TabsTrigger,
    TabsList,
} from "@/components/ui/tabs";
import { useState } from "react";

interface BudgetTabProps {
    triggerData: { label: string; value: "incomes" | "expenses" }[],
    contentData: { component: any; value: "incomes" | "expenses" }[],
}

export default function BudgetTab({
triggerData,
contentData,
}: BudgetTabProps) {
        
    const [activeTab, setActiveTab] = useState<"incomes" | "expenses">("incomes")
    
    return (
        <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)}>
            <TabsList className="grid w-full grid-cols-2 gap-2">
                {triggerData && triggerData.map((item) => (
                    <TabsTrigger key={item.value} value={item.value}>
                        {item.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            {contentData && contentData.map((item : any) => (
                <TabsContent key={item.value} value={item.value}>
                    {item.component}
                </TabsContent>
            ))}
        </Tabs>
    )
}