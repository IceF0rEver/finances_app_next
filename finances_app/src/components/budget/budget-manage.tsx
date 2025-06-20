"use client"

import { useActionState, startTransition, useEffect, useCallback } from "react";
import { useI18n } from "@/locales/client";
import type { sankeyParams } from "@/types/budget-types";
import { createSankey, updateSankey } from "@/lib/actions/budget-action";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { BudgetManageProps } from "@/types/budget-types";
import { budgetSchemas } from "@/lib/zod/budget-schemas";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import BudgetTab from "./form/budget-tab";
import BudgetCard from "./form/budget-card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';


export default function BudgetManage({ datas, status, onOpen }: BudgetManageProps) {
    const t = useI18n()

    const getDefaultValues = useCallback(
        (budgetData?: sankeyParams[]) => ({
            sankey: budgetData || [],
        }),
        [],
    )

    const [state, FormAction, isPending] = useActionState(status ? updateSankey : createSankey, { success: false })

    const sankeySchema = budgetSchemas(t).sankey
    const formSchema = z.object({
        sankey: sankeySchema,
    })

    type BudgetFormType = z.infer<typeof formSchema>

    const form = useForm<BudgetFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: getDefaultValues(),
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "sankey",
    })

    useEffect(() => {
        form.reset(getDefaultValues(datas))
    }, [datas, getDefaultValues, form])

    useEffect(() => {
        if (state.success) {
        toast.success(state.message)
        if (onOpen) {
            onOpen(false)
        }
        } else if (state.message && !state.success) {
        toast.error(state.message)
        }
    }, [state, onOpen])

    const handleAdd = (type: "income" | "expense" | "category", parent_id?: string) => {
        switch (type) {
        case "income":
            append({ id: uuidv4(), from: "", to: "budget", amount: 0, type: "income" as const, parentId: undefined })
            break
        case "category":
            append({ id: uuidv4(), from: "budget", to: "", amount: 0, type: "expense" as const, parentId: undefined })
            break
        case "expense":
            if (currentData.find((item) => item.id === parent_id)) {
            const id = uuidv4();
            append({ id: id, from: id, to: "", amount: 0, type: "expense" as const, parentId: parent_id })
            }
            break
        }
    }

    const handleRemove = (type: "category" | "subCategory", id?: string) => {
        const currentData = form.getValues("sankey")

        switch (type) {
        case "category":
            const index = currentData.findIndex((item) => item.id === id)
            if (index !== -1) {
            remove(index)
            }
            break
        case "subCategory":
            const subCategories = currentData
            .map((item, index) => ({ ...item, index }))
            .filter((item) => item.parentId === id)

            const mainCategoryIndex = currentData.findIndex((item) => item.id === id)

            ;[...subCategories, { index: mainCategoryIndex }]
            .sort((a, b) => b.index - a.index)
            .forEach((item) => {
                if (item.index !== -1) {
                remove(item.index)
                }
            })
            break
        }
    }

    const onSubmit = (data: BudgetFormType) => {
        const processedData = data.sankey.map((item) => {
        const updatedItem = { ...item }

        if (updatedItem.from === updatedItem.id && updatedItem.parentId !== undefined) {
            updatedItem.from = data.sankey.find((p) => p.id === updatedItem.parentId)?.to || ""
        }

        if (
            (updatedItem.parentId === null || updatedItem.parentId === undefined) &&
            updatedItem.type === "expense" &&
            updatedItem.from === "budget"
        ) {
            const total = data.sankey.filter((e) => e.parentId === updatedItem.id).reduce((sum, e) => sum + e.amount, 0)
            updatedItem.amount = total
        }

        return updatedItem
        })

        const formData = new FormData()
        formData.append("sankeyData", JSON.stringify(processedData))
        startTransition(() => {
            FormAction(formData)
        })
    }

    const currentData = form.watch("sankey") as sankeyParams[]
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn(status ? "overflow-y-auto max-h-screen" : "md:overflow-y-hidden md:max-h-full", "w-full")}
            >
                <BudgetTab
                triggerData={[
                    { label: t("app.dashboard.budget.components.budgetManage.tabs.incomes"), value: "incomes" },
                    { label: t("app.dashboard.budget.components.budgetManage.tabs.expenses"), value: "expenses" },
                ]}
                contentData={[
                    {
                    component: (
                        <BudgetCard
                            title={t("app.dashboard.budget.components.budgetManage.title.income")}
                            description={t("app.dashboard.budget.components.budgetManage.description.income")}
                            status={status}
                            datas={currentData.filter((i) => i.type === "income")}
                            allData={currentData}
                            form={form}
                            type={"income"}
                            onAdd={handleAdd}
                            onRemove={handleRemove}
                            errors={state.errors}
                        />
                    ),
                    value: "incomes",
                    },
                    {
                    component: (
                        <BudgetCard
                            title={t("app.dashboard.budget.components.budgetManage.title.expense")}
                            description={t("app.dashboard.budget.components.budgetManage.description.expense")}
                            status={status}
                            datas={currentData.filter((i) => i.type === "expense" && i.from === "budget")}
                            allData={currentData}
                            form={form}
                            type={"expense"}
                            onAdd={handleAdd}
                            onRemove={handleRemove}
                            errors={state.errors}
                        />
                    ),
                    value: "expenses",
                    },
                ]}
                />
                <div className="py-3 px-1 flex justify-end">
                    <Button type="submit" variant="default" className="w-full" disabled={isPending}>
                        {isPending ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <span>
                                {status
                                ? t("app.dashboard.budget.components.budgetManage.button.saveChange")
                                : t("app.dashboard.budget.components.budgetManage.button.discoverBudget")}
                            </span>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
