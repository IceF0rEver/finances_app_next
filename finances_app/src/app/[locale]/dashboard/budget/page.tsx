import prisma from "@/lib/prisma";
import { getUser } from "@/lib/server";
import BudgetPage from "@/components/budget/budget-page";
import { sankeyParams } from "@/types/budget-types";

export default async function Page() {
    const user = await getUser();
    const datas = await prisma.sankey.findMany({
        where: {
            userId: user?.id,
        }
    });
     const budgets: sankeyParams[] = datas.map((item: any) => ({
        ...item,
        amount: Number(item.amount),
    }))
    return <BudgetPage datas={budgets}/>
}