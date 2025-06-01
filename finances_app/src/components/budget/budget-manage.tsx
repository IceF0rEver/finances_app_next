"use client"

import { 
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs"
import { 
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useActionState, useState, startTransition, useEffect } from "react"
import { useI18n } from "@/locales/client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { sankeyParams } from "@/types/budget-types";
import { createSankey, updateSankey } from "@/lib/actions/budget";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type BudgetManageProps = {
    datas : sankeyParams[],
    status: boolean;
    onOpen?: (arg0: boolean) => void;
}

const initialState = {
    message: "",
    errors: {},
    success: false,
}

function SubmitButton({ status, t }: { status: boolean; t: any;}) {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" variant="default" className="w-full" disabled={pending}>
            {pending ? (
                <Loader2 size={16} className="animate-spin" />
            ) : (
                <span>
                    {status
                        ? t('app.dashboard.budget.components.budgetManage.button.saveChange')
                        : t('app.dashboard.budget.components.budgetManage.button.discoverBudget')}
                </span>
            )}
        </Button>
    )
}

export default function BudgetManage({
datas,
status,
onOpen
}: BudgetManageProps) {
    const t = useI18n();
    const [activeTab, setActiveTab] =  useState<"incomes" | "expenses">("incomes");
    const [data, setData] = useState<sankeyParams[]>([...datas]);

    const [createState, createSankeyAction] = useActionState(createSankey, initialState);
    const [updateState, updateSankeyAction] = useActionState(updateSankey, initialState);
    
    const state = status ? updateState : createState;
    const formAction = status ? updateSankeyAction : createSankeyAction;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const processedData = data.map((item) => {
            const updatedItem = { ...item }

            if (updatedItem.from === "" && updatedItem.parentId !== undefined) {
                updatedItem.from = data.find((p) => p.id === updatedItem.parentId)?.to || ""
            }

            if (
                (updatedItem.parentId === null || updatedItem.parentId === undefined) &&
                updatedItem.type === "expense" &&
                updatedItem.from === "budget"
            ) {
                const total = data.filter((e) => e.parentId === updatedItem.id).reduce((sum, e) => sum + e.amount, 0)

                updatedItem.amount = total
            }

            return updatedItem
        })

        setData(processedData);

        const formData = new FormData()
        formData.append("sankeyData", JSON.stringify(processedData))

        startTransition(() => {
            formAction(formData)
        })
    };
    
    const handleAdd = (type : 'income'|'expense'|'category', parent_id ?: string) => {
        switch (type) {
            case 'income':
                setData(prev => [...prev, { id: crypto.randomUUID() , from: '', to: 'budget', amount: 0, type: 'income', parentId: undefined }]);
                break;
            case 'category':
                const id = crypto.randomUUID()
                setData(prev => [...prev, { id: id, from: 'budget', to: '', amount: 0, type: 'expense', parentId: undefined }]);
                break;
            case 'expense':
                if (data.find(item => item.id === parent_id)){
                    setData(prev => [...prev, { id: crypto.randomUUID(), from: '', to: '', amount: 0, type: 'expense', parentId: parent_id }]);
                }
                break;
        }
    };

    const handleRemove = (type: 'category' | 'subCategory', id?: string) => {
        switch (type) {
            case 'category':
                const index = data.findIndex(item => item.id === id);
                if (index !== -1) {
                    setData(prev => prev.filter(item => item.id !== id));
                }
                break;
            case 'subCategory': 
                const subCategories = data.filter(item => item.parentId === id);
                handleRemove('category', id);
                for (const sub of subCategories) {
                    handleRemove('category', sub.id);
                }
                break;
        }
    };

    useEffect(() => {
        if (state.success) {
            toast.success(state.message);
            if (onOpen) {
                onOpen(false);
            }
        } else if (state.message && !state.success) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <form onSubmit={handleSubmit} className="overflow-x-auto max-h-screen"> 
            <Tabs 
                defaultValue={activeTab} 
                onValueChange={(value) => setActiveTab(value as typeof activeTab)}
            >
                <TabsList className="grid w-full grid-cols-2 gap-2">
                    <TabsTrigger value="incomes">{ t('app.dashboard.budget.components.budgetManage.tabs.incomes') }</TabsTrigger>
                    <TabsTrigger value="expenses">{ t('app.dashboard.budget.components.budgetManage.tabs.expenses') }</TabsTrigger>
                </TabsList>
                <TabsContent value="incomes">
                    <Card className={cn(status ? "border-none shadow-none p-1" : "", "grid gap-4")}>
                        <CardHeader className={cn(status ? "p-1" : "",)}>
                            <CardTitle>{  t('app.dashboard.budget.components.budgetManage.title.income') }</CardTitle>
                            <CardDescription>
                                { t('app.dashboard.budget.components.budgetManage.description.income') }
                                <Separator className="mt-3"/>
                                {state.errors?.message && <p className="text-sm text-red-500">{state.errors?.message}</p>}
                            </CardDescription>
                        </CardHeader>
                        {data && data.filter(i => i.type === 'income').map(itemIncome => (
                            <CardContent 
                                className={cn(status ? "p-0" : "", "grid grid-cols-11 gap-3")}
                                key={itemIncome.id}
                            >
                                <div className={cn(status ? "col-span-6" : "col-span-6 md:col-span-5", "grid gap-1")}>
                                    <Label htmlFor="name">{ t('app.dashboard.budget.components.budgetManage.form.name.label') }</Label>
                                    <Input 
                                        value={itemIncome.from}
                                        onChange={(e) => setData(prev => prev.map(item => item.id === itemIncome.id ? { ...item, from: e.target.value} : item))} 
                                        id="name"
                                    />
                                </div>
                                <div className={cn(status ? "col-span-3" : "col-span-3 md:col-span-5", "grid gap-1")}>
                                    <Label htmlFor="amount">{ t('app.dashboard.budget.components.budgetManage.form.amount.label') }</Label>
                                    <Input 
                                        value={itemIncome.amount}
                                        onChange={(e) => setData(prev => prev.map(item => item.id === itemIncome.id ? { ...item, amount: Number(e.target.value)} : item))} 
                                        id="amount" 
                                        type="number" 
                                    />
                                </div>
                                <div className={cn(status ? "col-span-2" : "col-span-2 md:col-span-1", "flex items-end")}>
                                    <Button
                                        type="button" 
                                        variant="destructive" 
                                        onClick={() => handleRemove('category', itemIncome.id)} 
                                        className="w-full p-2"
                                    >   
                                        <Trash2/>
                                    </Button>
                                </div>
                            </CardContent>
                        ))}
                        <CardFooter className={cn(status ? "p-2" : "flex justify-between",)}>
                            <Button 
                                type="button"
                                className={cn(status ? "w-full" : "",)} 
                                variant="secondary" 
                                onClick={() => handleAdd('income')}
                            >
                                { t('app.dashboard.budget.components.budgetManage.button.addIncome')}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="expenses">
                    <Card className={cn(status ? "border-none shadow-none p-1" : "", "grid gap-4")}>
                        <CardHeader className={cn(status ? "p-2" : "pb-0",)}>
                            <CardTitle>{ t('app.dashboard.budget.components.budgetManage.title.expense') }</CardTitle>
                            <CardDescription>
                                { t('app.dashboard.budget.components.budgetManage.description.expense')}
                                <Separator className="mt-3"/>
                                {state.errors?.message && <p className="text-sm text-red-500">{state.errors?.message}</p>}
                            </CardDescription>
                        </CardHeader>
                        {data && data.filter(i => i.type === 'expense' && i.from === 'budget').map(itemExpenseCategory => (
                            <Card className={cn(status ? "mt-2" : "m-2", "p-0 grid gap-1")} key={itemExpenseCategory.id}>
                                <div className="relative">
                                    <div className="absolute right-0">
                                        <Button 
                                            type="button"
                                            className="p-2 rounded-none rounded-bl-xl rounded-tr-xl" 
                                            variant="secondary" 
                                            onClick={() => handleRemove('subCategory', itemExpenseCategory.id)}
                                        >
                                            <Trash2/>
                                        </Button>
                                    </div>
                                </div>
                                <CardContent className={cn(status ? "p-1" : "p-4", "grid grid-cols-11 gap-3")}>
                                    <div className={cn(status ? "col-span-6" : "col-span-6 md:col-span-5", "grid gap-1")}>
                                        <Label htmlFor="categoryName">{ t('app.dashboard.budget.components.budgetManage.form.categoryName.label')}</Label>
                                        <Input  
                                            id="categoryName" 
                                            value={itemExpenseCategory.to}
                                            onChange={(e) => setData(prev => prev.map(item => item.id === itemExpenseCategory.id ? { ...item, to: e.target.value} : item))} 
                                        />
                                    </div>
                                    <div className="col-span-11 row-start-2">
                                        {data.filter(i => i.type === 'expense' && i.from !== 'budget' && i.parentId === itemExpenseCategory.id).map(itemExpense => (
                                            <div className="grid grid-cols-11 gap-3 py-1" key={itemExpense.id}>
                                                <div className={cn(status ? "col-span-6" : "col-span-6 md:col-span-5", "grid gap-1")}>
                                                    <Label htmlFor="name">{ t('app.dashboard.budget.components.budgetManage.form.name.label')}</Label>
                                                    <Input 
                                                    value={itemExpense.to}
                                                    onChange={(e) => setData(prev => prev.map(item => item.id === itemExpense.id ? { ...item, to: e.target.value} : item))} 
                                                    id="name"
                                                    />
                                                </div>
                                                <div className={cn(status ? "col-span-3" : "col-span-3 md:col-span-5", "grid gap-1")}>
                                                    <Label htmlFor="amount">{ t('app.dashboard.budget.components.budgetManage.form.amount.label')}</Label>
                                                    <Input 
                                                    value={itemExpense.amount}
                                                    onChange={(e) => setData(prev => prev.map(item => item.id === itemExpense.id ? { ...item, amount: Number(e.target.value)} : item))} 
                                                    id="amount" 
                                                    type="number" 
                                                    />
                                                </div>
                                                <div className={cn(status ? "col-span-2" : "col-span-2 md:col-span-1", "flex items-end")}>
                                                    <Button 
                                                        type="button"
                                                        variant="destructive" 
                                                        onClick={() => handleRemove('category', itemExpense.id)}
                                                        className="w-full p-2"
                                                    >
                                                        <Trash2/>
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className={cn(status ? "p-2" : "flex justify-between px-4 pb-4",)} >
                                    <Button 
                                        type="button"
                                        variant="secondary" 
                                        className={cn(status ? "w-full" : "",)}
                                        onClick={() => handleAdd('expense', itemExpenseCategory.id)}
                                    >
                                        { t('app.dashboard.budget.components.budgetManage.button.addExpense')}
                                        </Button>
                                </CardFooter>
                            </Card>
                        ))}
                        <div className={cn(status ? "my-2" : "m-2",)}>
                            <Button
                                type="button"
                                className="border border-dashed w-full h-[75px]" 
                                variant="ghost" 
                                onClick={() => handleAdd('category')}
                            >
                                { t('app.dashboard.budget.components.budgetManage.button.addCategoryExpense')}
                            </Button>
                        </div>
                    </Card>
                    <div className="py-3 px-1 flex justify-end">
                       <SubmitButton status={status} t={t}/>
                    </div>
                </TabsContent>
            </Tabs>
        </form>
    )
}