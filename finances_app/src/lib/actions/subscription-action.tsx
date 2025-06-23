'use server'

import { PrismaClient } from '@/generated/prisma';
import { revalidatePath, revalidateTag } from "next/cache";
import { getUser } from '@/lib/server';
import { getCurrentLocale, getI18n } from '@/locales/server';
import { subscriptionSchemas  } from '../zod/subscription-schemas';
import type { subscriptionParams } from "@/types/subscription-types"

const prisma = new PrismaClient()

type SubscriptionState = {
    errors?: {
        name?: string[]
        amount?: string[]
        recurrence?: string[]
        executionDate?: string[]
        icon?: string[]
        userId?: string[]
        id?: string[]
    }
    message?: string
    success?: boolean
}

export async function getSubscriptions(userId: string) {
    const datas = await prisma.subscription.findMany({
        where: {
            userId: userId,
        },
    })

    return datas.map((sub: any) => ({
        ...sub,
        amount: Number(sub.amount),
    })) as subscriptionParams[]
}

export async function createSubscription(prevState: SubscriptionState, formData: FormData): Promise<SubscriptionState> {
    const user = await getUser();
    const t = await getI18n();
    const locale = await getCurrentLocale();

    const subscriptionSchema = subscriptionSchemas(t).subscription
    
    if (!user?.id) {
        return {
            message: t('action.subscription.user.badId'),
        }
    }
    try {
        const validatedData = subscriptionSchema.safeParse({
			name: formData.get("name"),
            amount: Number(formData.get("amount")),
            recurrence: formData.get("recurrence"),
            executionDate: new Date(formData.get("executionDate") as string),
            icon: formData.get("icon"),
            userId: user?.id,
		});
        if (!validatedData.success) {
            return {
            errors: validatedData.error.flatten().fieldErrors,
            message: t('action.subscription.form.validateField'),
            };
        };
        const { name, amount, recurrence, executionDate, icon, userId } = validatedData.data;

        await prisma.subscription.create({
            data: {
                name,
                amount,
                recurrence,
                executionDate,
                icon,
                userId,
            },
        });
        revalidatePath(`/${locale}/dashboard/subscription`, 'page');
        revalidateTag(`subscriptions-${user.id}`);
        return {
            success: true,
            message: t('action.subscription.create.success'),
        }
    } catch (err) {
        console.error(err)        
        return {
            message: t('action.subscription.create.error'),
        };
    };
};

export async function updateSubscription(prevState: SubscriptionState, formData: FormData): Promise<SubscriptionState> {
    const user = await getUser();
    const t = await getI18n();
    const locale = await getCurrentLocale();

    const subscriptionSchema = subscriptionSchemas(t).subscription

    if (!user?.id) {
        return {
            message: t('action.subscription.user.badId'),
        }
    }
    try {
        const validatedData = subscriptionSchema.safeParse({
            id: formData.get("id"),
			name: formData.get("name"),
            amount: Number(formData.get("amount")),
            recurrence: formData.get("recurrence"),
            executionDate: new Date(formData.get("executionDate") as string),
            icon: formData.get("icon"),
            userId: user?.id,
		});

        if (!validatedData.success) {
            return {
            errors: validatedData.error.flatten().fieldErrors,
            message: t('action.subscription.form.validateField'),
            };
        };
        const { id, name, amount, recurrence, executionDate, icon, userId } = validatedData.data;

        await prisma.subscription.update({
            where: { id, userId },
            data: {
                name,
                amount,
                recurrence,
                executionDate,
                icon,
            },
        });

        revalidatePath(`/${locale}/dashboard/subscription`, 'page');
        revalidateTag(`subscriptions-${user.id}`);
        
        return {
            success: true,
            message: t('action.subscription.update.success'),
        }
    } catch (err) {
        console.error(err);
        return {
            message: t('action.subscription.update.error'),
        };
    };
}

export async function deleteSubscription(prevState: SubscriptionState, formData: FormData): Promise<SubscriptionState> {
    const user = await getUser();
    const t = await getI18n();
    const locale = await getCurrentLocale();

    const deleteSubscriptionSchema = subscriptionSchemas(t).deleteSubscription

    if (!user?.id) {
        return {
            message: t('action.subscription.user.badId'),
        }
    }
    try {
        const validatedData = deleteSubscriptionSchema.safeParse({
            id: formData.get("id"),
		});

        if (!validatedData.success) {
            return {
            errors: validatedData.error.flatten().fieldErrors,
                message: t('action.subscription.delete.badId'),
            };
        };
        const { id } = validatedData.data;
        const existingSubscription = await prisma.subscription.findFirst({
            where: {
                id,
                userId : user.id,
            },
        })
        if (existingSubscription) {
            await prisma.subscription.delete({
                where: { id },
            });
        }

        revalidatePath(`/${locale}/dashboard/subscription`, 'page');
        revalidateTag(`subscriptions-${user.id}`);

        return {
            success: true,
            message: t('action.subscription.delete.success'),
        }
    } catch (err) {
        console.error(err);
        return {
            message: ('action.subscription.delete.error'),
        };
    };
}