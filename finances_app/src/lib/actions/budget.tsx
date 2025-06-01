"use server"

import { PrismaClient } from '@/generated/prisma';
import z from "zod";
import { revalidatePath } from "next/cache";
import { getUser } from '@/lib/server';
import { getCurrentLocale, getI18n } from '@/locales/server';
import { Decimal } from '@/generated/prisma/runtime/library';

const prisma = new PrismaClient()

type SankeyState = {
    errors?: {
        message?: string
        sankeyData?: string[]
    }
    message?: string
    success?: boolean
}

export async function createSankey(prevState: SankeyState, formData: FormData): Promise<SankeyState> {
    const user = await getUser()
    const t = await getI18n()
    const locale = await getCurrentLocale()

    const sankeySchema = z.array(z.object({
        id: z.string({ message: t("action.budget.form.id") }).uuid(),
        from: z.string({ message: t("action.budget.form.categoryName") }),
        to: z.string({ message: t("action.budget.form.name") }),
        amount: z.number({ message: t("action.budget.form.amount") }),
        type: z.string(),
        parentId: z.string().uuid().optional().nullable(),
    }))

    if (!user?.id) {
        return {
            errors: {
                message: t("action.budget.user.badId"),
            }
        }
    }

    try {
        const parsedData = JSON.parse(formData.get("sankeyData") as string)
        const validatedData = sankeySchema.safeParse(parsedData)

        if (!validatedData.success) {
            return {
                errors: {
                    sankeyData: validatedData.error.errors.map((e) => e.message),
                    message: t("action.budget.form.validateField"),
                },
            }
        }

        const sankeyArray = validatedData.data.map((item) => ({
            id: item.id,
            from: item.from,
            to: item.to,
            amount: new Decimal(item.amount),
            type: item.type,
            parentId: item.parentId,
            userId: user.id, 
        }))


        const sankey = await prisma.sankey.createMany({
            data: sankeyArray,
        })

        revalidatePath(`/${locale}/dashboard/budget`, "page")

        return {
            success: true,
            message: t("action.budget.create.success"),
        }
    } catch (err) {
        console.error(err)        
        return {
            message: t("action.budget.create.error"),
        };
    };
};

export async function updateSankey(prevState: SankeyState, formData: FormData): Promise<SankeyState> {
    const user = await getUser()
    const t = await getI18n()
    const locale = await getCurrentLocale()

    const sankeySchema = z.array(z.object({
        id: z.string({ message: t("action.budget.form.id") }).uuid(),
        from: z.string({ message: t("action.budget.form.categoryName") }),
        to: z.string({ message: t("action.budget.form.name") }),
        amount: z.number({ message: t("action.budget.form.amount") }),
        type: z.string(),
        parentId: z.string().uuid().optional().nullable(),
    }))

    if (!user?.id) {
        return {
            errors: {
                message: t("action.budget.user.badId"),
            }
        }
    }

    try {
        const parsedData = JSON.parse(formData.get("sankeyData") as string)
        const validatedData = sankeySchema.safeParse(parsedData)

        if (!validatedData.success) {
            return {
                errors: {
                    message: t("action.budget.form.validateField"),
                    sankeyData: validatedData.error.errors.map((e) => e.message)
                },
            }
        }

        const sankeyArray = validatedData.data.map((item) => ({
            id: item.id,
            from: item.from,
            to: item.to,
            amount: new Decimal(item.amount),
            type: item.type,
            parentId: item.parentId,
            userId: user.id, 
        }))

        await deleteSankey(prevState)

        const sankey = await prisma.sankey.createMany({
            data: sankeyArray,
        })

        revalidatePath(`/${locale}/dashboard/budget`, "page")

        return {
            success: true,
            message: t("action.budget.update.success"),
        }
    } catch (err) {
        console.error(err)        
        return {
            message: t("action.budget.update.error"),
        };
    };
}

export async function deleteSankey(prevState: SankeyState): Promise<SankeyState> {
    const user = await getUser();
    const t = await getI18n();
    const locale = await getCurrentLocale();
   
    if (!user?.id) {
        return {
            errors: {
                message: t("action.budget.user.badId"),
            }
        }
    }
    try {
        const existingSankeys = await prisma.sankey.findMany({
            where: {
                userId : user.id,
            },
        })
        if (existingSankeys) {
            await prisma.sankey.deleteMany({
                where: { 
                    userId : user.id, 
                },
            });
        }
   
        revalidatePath(`/${locale}/dashboard/budget`, 'page');
   
        return {
            success: true,
            message: t("action.budget.delete.success"),
        }
    } catch (err) {
        console.error(err);
        return {
            message: t("action.budget.delete.success"),
        };
    };
}
