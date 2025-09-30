import { z } from "zod";
// biome-ignore lint/suspicious/noExplicitAny: more complex
export const subscriptionSchemas = (
	t: (...args: Parameters<(key: string, ...params: any[]) => string>) => string,
) => ({
	subscription: z.object({
		id: z.string().optional(),
		name: z.string().min(1, { message: t("action.subscription.form.name") }),
		amount: z.coerce
			.number()
			.min(0, { message: t("action.subscription.form.amount") }),
		recurrence: z.string({ message: t("action.subscription.form.recurrence") }),
		executionDate: z.date({
			message: t("action.subscription.form.executionDate"),
		}),
		icon: z.string({ message: t("action.subscription.form.icon") }),
		userId: z.string({ message: t("action.subscription.form.id") }),
	}),
	deleteSubscription: z.object({
		id: z.string({ message: t("action.subscription.form.id") }),
	}),
});
