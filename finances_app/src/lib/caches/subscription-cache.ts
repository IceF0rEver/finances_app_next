"use server";

import { unstable_cache } from "next/cache";
import { getSubscriptions } from "@/app/[locale]/dashboard/subscription/_components/_serveractions/actions";

export async function getCachedSubscriptions(userId: string) {
	return unstable_cache(
		async () => {
			return getSubscriptions(userId);
		},
		[`user-subscriptions-${userId}`],
		{
			tags: [`subscriptions-${userId}`],
			revalidate: 3600,
		},
	)();
}
