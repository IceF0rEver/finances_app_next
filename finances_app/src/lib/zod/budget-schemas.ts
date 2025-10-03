import { z } from "zod";
import type { useI18n } from "@/locales/client";
export const budgetSchemas = (t: ReturnType<typeof useI18n>) => ({
	sankey: z.array(
		z.object({
			id: z.string({ message: t("action.budget.form.id") }).uuid(),
			from: z.string().min(1, { message: t("action.budget.form.name") }),
			to: z.string().min(1, { message: t("action.budget.form.name") }),
			amount: z.coerce
				.number()
				.min(0, { message: t("action.budget.form.amount") }),
			type: z.string(),
			parentId: z.string().uuid().optional().nullable(),
		}),
	),
});
