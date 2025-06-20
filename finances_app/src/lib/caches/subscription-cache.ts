import { unstable_cache } from "next/cache"
import prisma from "@/lib/prisma"
import type { subscriptionParams } from "@/types/subscription-types"

async function getSubscriptions(userId: string) {
    "use server"
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

export function getCachedSubscriptions(userId: string) {
    return unstable_cache(
        async () => {
            return getSubscriptions(userId)
        },
        [`user-subscriptions-${userId}`],
        {
            tags: [`subscriptions-${userId}`],
            revalidate: 3600,
        },
    )()
}
