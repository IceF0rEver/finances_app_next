"use client"

import { useState } from "react"
import { useI18n, useCurrentLocale } from "@/locales/client"
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { enUS, fr } from 'date-fns/locale';
import type { subscriptionParams } from "@/types/subscription-types"

type SubscriptionCalendarProps = {
  datas: subscriptionParams[];
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
};

export default function SubscriptionCalendar({datas, date, setDate}: SubscriptionCalendarProps) {

    const t = useI18n();
    const locale = useCurrentLocale();
    
    return (
        <Card>
            <CardHeader>
                <div>
                    <CardTitle className="text-xl font-medium">{ t('app.dashboard.subscription.components.subscriptionCalendar.title') }</CardTitle>
                    <CardDescription>{ t('app.dashboard.subscription.components.subscriptionCalendar.description') }</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="px-2 md:px-4">
                <Calendar
                    utilitie="subscription"
                    mode="single"
                    locale={locale === "fr" ? fr : enUS}
                    selected={date}
                    onSelect={setDate}
                    datas={datas}
                    className="rounded-md border mx-auto"
                />
            </CardContent>
        </Card>
    )
}