"use client"

import { Card, CardTitle, CardDescription, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { useI18n } from "@/locales/client"
import { Tabs,TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarX, PlusCircle} from "lucide-react";
import type { subscriptionParams } from "@/types/subscription-types"
import { useEffect, useState } from "react";
import { calendarCheckDate } from "@/lib/utils";
import SubscriptionListItem from "./subscription-list-item";
import SubscriptionManage from "./subscription-manage";

type SubscriptionCalendarProps = {
  datas: subscriptionParams[];
  date: Date | undefined;
};

export default function SubscriptionList({datas, date}: SubscriptionCalendarProps) {
    const t = useI18n();
    const [activeTab, setActiveTab] = useState<'this-day' | 'all' | 'annually' | 'monthly'>('this-day');
    const [filtredDatas, setFiltredDatas] = useState<subscriptionParams[]>([...datas]);
    const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    useEffect(() => {
        handleActiveTab()
    }, [date]);

    useEffect(() => {
        handleActiveTab()
    }, [activeTab]);

    const handleActiveTab = () => {
        switch (activeTab) {
        case 'this-day':
            setFiltredDatas([...datas.filter(s => calendarCheckDate(s, date))]);
            break;
        case 'all':
            setFiltredDatas([...datas]);
            break;
        case 'annually':
            setFiltredDatas([...datas.filter(item => item.recurrence === 'annually')]);
            break;
        case 'monthly':
            setFiltredDatas([...datas.filter(item => item.recurrence === 'monthly')]);
            break;
        default:
            setFiltredDatas([...datas]);
            break;
        };
    };

    const totalMonthly = () => {
        return datas
        .filter(sub => sub.recurrence === 'monthly')
        .reduce((sum, sub) => sum + sub.amount, 0);
    };

    const totalAnnual = () => {
        const monthlyTotal = totalMonthly() * 12;
        const annualSubs = datas
        .filter(sub => sub.recurrence === 'annually')
        .reduce((sum, sub) => sum + sub.amount, 0);
        return monthlyTotal + annualSubs;
    };

    return (
        <Card>
            <SubscriptionManage sheetOpen={isSheetOpen} onSheetOpen={setIsSheetOpen} status={isEdit} />
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl font-bold">{ t('app.dashboard.subscription.components.subscriptionList.title') }</CardTitle>
                        <CardDescription>{ t('app.dashboard.subscription.components.subscriptionList.description') }</CardDescription>
                    </div>
                    <Button 
                        onClick={() => {setIsSheetOpen(true), setIsEdit(false)}} 
                        // subscriptionData = { name: '', amount: 0, recurrence: 'monthly', execution_date: new Date(), icon: '' }" 
                        className="flex items-center gap-1.5"
                        >
                        <PlusCircle/>
                        <span>{ t('app.dashboard.subscription.components.subscriptionList.button.add') }</span>
                    </Button>
                </div>
                <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)} className="w-full mt-4">
                    <TabsList className="grid grid-cols-4 w-full">
                        <TabsTrigger value="this-day">{ t('app.dashboard.subscription.components.subscriptionList.tabs.thisDay') }</TabsTrigger>
                        <TabsTrigger value="all">{ t('app.dashboard.subscription.components.subscriptionList.tabs.all') }</TabsTrigger>
                        <TabsTrigger value="annually">{ t('app.dashboard.subscription.components.subscriptionList.tabs.annually') }</TabsTrigger>
                        <TabsTrigger value="monthly">{ t('app.dashboard.subscription.components.subscriptionList.tabs.monthly') }</TabsTrigger>
                    </TabsList>
                </Tabs>
            </CardHeader>
            <CardContent className="p-4 overflow-y-auto max-h-[350px] md:max-h-[calc(100vw-(100vw/4)*3)]">
                { filtredDatas.length > 0 && 
                    <div className="space-y-3">
                        { filtredDatas.map((item: subscriptionParams) => (
                            <div 
                                key={item.id} 
                                className="w-full"
                            >
                            <SubscriptionListItem item={item}/>
                            </div>
                        ))}
                    </div>
                }{ filtredDatas.length === 0 && 
                    <div className="py-8 text-center">
                        <div className="mx-auto flex flex-col items-center justify-center">
                            <CalendarX className="size-12 text-muted-foreground"/>
                            <h3 className="mt-4 text-lg font-medium">{ t('app.dashboard.subscription.components.subscriptionList.empty.title') }</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{ t('app.dashboard.subscription.components.subscriptionList.empty.description') }</p>
                        </div>
                    </div>
                }
            </CardContent>
            <CardFooter className="flex-col border-t pt-6 px-6">
                <div className="w-full flex justify-between items-center mb-2 whitespace-nowrap">
                    <span className="text-sm text-muted-foreground">{ t('app.dashboard.subscription.components.subscriptionList.totalMonthly') }</span>
                    <span className="font-medium">
                        { totalMonthly().toFixed(2) } €
                    </span>
                </div>
                <div className="w-full flex justify-between items-center whitespace-nowrap">
                    <span className="text-sm text-muted-foreground">{ t('app.dashboard.subscription.components.subscriptionList.totalAnnually') }</span>
                    <span className="font-medium">
                        { totalAnnual().toFixed(2) }  €
                    </span>
                </div>
            </CardFooter>
        </Card>
    )
}