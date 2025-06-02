"use client"

import SubscriptionCalendar from "@/components/subscription/subscription-calendar";
import SubscriptionList from "@/components/subscription/subscription-list";
import type { subscriptionParams } from "@/types/subscription-types"
import { useEffect, useState } from "react";

type SubscriptionPageProps = {
    datas: subscriptionParams[]
}

export default function SubscriptionPage({datas}: SubscriptionPageProps) {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [data, setData] = useState<subscriptionParams[]>([...datas])
    
    useEffect(()=> {
        setData([...datas]);
    }, [datas]);
    
    return (
        <div className="flex flex-col xl:flex-row gap-6 pt-4">
            <div className="w-full xl:w-2/5">
                <SubscriptionCalendar datas={data} date={date} setDate={setDate}/>
            </div>
            <div className="w-full xl:w-3/5">
                <SubscriptionList datas={data} date={date}/>
            </div>
        </div>
    )
}