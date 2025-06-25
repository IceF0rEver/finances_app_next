"use server";

import { unstable_cache } from "next/cache";
import { getSubscriptions } from "../actions/subscription-action";

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
