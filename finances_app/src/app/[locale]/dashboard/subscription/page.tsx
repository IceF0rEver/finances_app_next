"use client"

import SubscriptionCalendar from "@/components/subscription/subscription-calendar";
import SubscriptionList from "@/components/subscription/subscription-list";
import type { subscriptionParams } from "@/types/subscription-types"
import { useState } from "react";

export default function Page() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    
    const subscriptionsData: subscriptionParams[]= [
        {
            id: 1,
            name: "téléphone",
            amount: 15,
            recurrence: 'monthly',
            executionDate:  new Date("2025-5-25"),
            icon: "lucide:phone",
        },
        {
            id: 2,
            name: "téléphone",
            amount: 15.50,
            recurrence: 'annually',
            executionDate:  new Date("2025-5-25"),
            icon: "lucide:phone",
        },
        {
            id: 3,
            name: "téléphone",
            amount: 15,
            recurrence: 'monthly',
            executionDate: new Date("2025-5-25"),
            icon: "lucide:phone",
        },
        {
            id: 4,
            name: "téléphone",
            amount: 15,
            recurrence: 'monthly',
            executionDate:  new Date("2025-5-25"),
            icon: "lucide:phone",
        },
        {
            id: 5,
            name: "téléphone",
            amount: 15,
            recurrence: 'monthly',
            executionDate: new Date("2025-5-25"),
            icon: "lucide:phone",
        },
        {
            id: 6,
            name: "téléphone",
            amount: 15,
            recurrence: 'monthly',
            executionDate:  new Date("2025-5-26"),
            icon: "lucide:phone",
        },
    ];
    return (
        <div className="flex flex-col xl:flex-row gap-6 pt-4">
            <div className="w-full xl:w-2/5">
                <SubscriptionCalendar datas={subscriptionsData} date={date} setDate={setDate}/>
            </div>
            <div className="w-full xl:w-3/5">
                <SubscriptionList datas={subscriptionsData} date={date}/>
            </div>
        </div>
    )
}