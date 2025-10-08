import { z } from "zod";
import type { useI18n } from "@/locales/client";

export const subscriptionTableSchema = z.object({
	id: z.string().uuid().optional(),
	name: z.string(),
	amount: z.coerce.number(),
	recurrence: z.string(),
	executionDate: z.union([z.date(), z.string()]),
	icon: z.string(),
	userId: z.string().uuid(),
});

export const subscriptionSchemas = (t: ReturnType<typeof useI18n>) => ({
	subscription: z.object({
		id: subscriptionTableSchema.shape.id,
		name: subscriptionTableSchema.shape.name.min(1, {
			message: t("action.subscription.form.name"),
		}),
		amount: subscriptionTableSchema.shape.amount.min(0, {
			message: t("action.subscription.form.amount"),
		}),
		recurrence: z.string({
			message: t("action.subscription.form.recurrence"),
		}),
		executionDate: subscriptionTableSchema.shape.executionDate,
		icon: subscriptionTableSchema.shape.icon.min(1, {
			message: t("action.subscription.form.icon"),
		}),
		userId: subscriptionTableSchema.shape.userId.optional(),
	}),
});
