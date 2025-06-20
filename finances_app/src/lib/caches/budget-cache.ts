import { unstable_cache } from "next/cache"
import prisma from "@/lib/prisma"
import type{ sankeyParams } from "@/types/budget-types";

async function getBudgets(userId: string) {
    const datas = await prisma.sankey.findMany({
        where: {
            userId: userId,
        }
    });
     return datas.map((item: any) => ({
        ...item,
        amount: Number(item.amount),
    })) as sankeyParams[]
}

export function getCachedBudgets(userId: string) {

    return unstable_cache(
        async () => {
            return getBudgets(userId)
        },
        [`user-budgets-${userId}`],
        {
            tags: [`budgets-${userId}`],
            revalidate: 3600,
        },
    )()
}
