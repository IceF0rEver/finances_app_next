import { z } from "zod";
import type { useI18n } from "@/locales/client";
export const subscriptionSchemas = (t: ReturnType<typeof useI18n>) => ({
	subscription: z.object({
		id: z.string().optional(),
		name: z.string().min(1, { message: t("action.subscription.form.name") }),
		amount: z.coerce
			.number()
			.min(0, { message: t("action.subscription.form.amount") }),
		recurrence: z.string({ message: t("action.subscription.form.recurrence") }),
		executionDate: z.union([
			z.date({ message: t("action.subscription.form.executionDate") }),
			z.string({ message: t("action.subscription.form.executionDate") }),
		]),
		icon: z.string({ message: t("action.subscription.form.icon") }),
		userId: z.string(),
	}),
	deleteSubscription: z.object({
		id: z.string().min(1),
	}),
});
