'use server'

import { PrismaClient } from '@/generated/prisma';
import z from "zod";
import { revalidatePath } from "next/cache";
import { getUser } from '@/lib/server';
import { getCurrentLocale, getI18n } from '@/locales/server';

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

export async function createSubscription(prevState: SubscriptionState, formData: FormData): Promise<SubscriptionState> {
    const user = await getUser();
    const t = await getI18n();
    const locale = await getCurrentLocale();

    const subscriptionSchema = z.object({
        id: z.string().optional(),
        name: z.string({ message: t('action.subscription.form.name')}),
        amount: z.number({ message: t('action.subscription.form.amount')}),
        recurrence: z.string({ message: t('action.subscription.form.recurrence')}),
        executionDate: z.string({ message: t('action.subscription.form.executionDate')}),
        icon: z.string({ message: t('action.subscription.form.icon')}),
        userId: z.string({ message: t('action.subscription.form.id')}),
    });

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
            executionDate: formData.get("executionDate"),
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

        const subscription = await prisma.subscription.create({
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

    const subscriptionSchema = z.object({
        id: z.string().optional(),
        name: z.string({ message: t('action.subscription.form.name')}),
        amount: z.number({ message: t('action.subscription.form.amount')}),
        recurrence: z.string({ message: t('action.subscription.form.recurrence')}),
        executionDate: z.string({ message: t('action.subscription.form.executionDate')}),
        icon: z.string({ message: t('action.subscription.form.icon')}),
        userId: z.string({ message: t('action.subscription.form.id')}),
    });

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
            executionDate: formData.get("executionDate"),
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

        const subscription = await prisma.subscription.update({
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

    const delteSubscriptionSchema = z.object({
        id: z.string({ message: t('action.subscription.form.id')}),
    });

    if (!user?.id) {
        return {
            message: t('action.subscription.user.badId'),
        }
    }
    try {
        const validatedData = delteSubscriptionSchema.safeParse({
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