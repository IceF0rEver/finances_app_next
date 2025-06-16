import { z } from "zod"

export const budgetSchemas = (t: (...args: Parameters<(key: string, ...params: any[]) => string>) => string) => ({
    sankey : z.array(z.object({
        id: z.string({ message: t("action.budget.form.id") }).uuid(),
        from: z.string({ message: t("action.budget.form.categoryName") }),
        to: z.string({ message: t("action.budget.form.name") }),
        amount: z.number({ message: t("action.budget.form.amount") }),
        type: z.string(),
        parentId: z.string().uuid().optional().nullable(),
    })),
})