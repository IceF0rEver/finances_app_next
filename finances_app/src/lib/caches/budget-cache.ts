"use server";

import { unstable_cache } from "next/cache";
import { getBudgets } from "@/app/[locale]/dashboard/budget/_components/_serveractions/actions";

export async function getCachedBudgets(userId: string) {
	return unstable_cache(
		async () => {
			return getBudgets(userId);
		},
		[`user-budgets-${userId}`],
		{
			tags: [`budgets-${userId}`],
			revalidate: 3600,
		},
	)();
}
