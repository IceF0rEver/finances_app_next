import { z } from "zod";
import type { useI18n } from "@/locales/client";

export const sankeyTableSchema = z.object({
	id: z.string().uuid(),
	from: z.string(),
	to: z.string(),
	amount: z.coerce.number(),
	type: z.string(),
	parentId: z.string().uuid().nullish(),
	userId: z.string().uuid(),
});

export const sankeyTableArraySchema = z.array(sankeyTableSchema);

export const budgetSchemas = (t: ReturnType<typeof useI18n>) => ({
	sankeyArray: z.array(
		z.object({
			id: sankeyTableSchema.shape.id,
			from: sankeyTableSchema.shape.from.min(1, {
				message: t("action.budget.form.name"),
			}),

			to: sankeyTableSchema.shape.to.min(1, {
				message: t("action.budget.form.name"),
			}),
			amount: sankeyTableSchema.shape.amount.min(0, {
				message: t("action.budget.form.amount"),
			}),
			type: sankeyTableSchema.shape.type,
			parentId: sankeyTableSchema.shape.parentId,
		}),
	),
});
