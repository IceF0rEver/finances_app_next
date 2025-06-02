
import SubscriptionPage from "@/components/subscription/subscription-page";
import type { subscriptionParams } from "@/types/subscription-types";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/server";

export default async function Page() {
    const user = await getUser();
    const datas = await prisma.subscription.findMany({
        where: {
            userId: user?.id,
        }
    });
    const subscriptions: subscriptionParams[] = datas.map((sub: any) => ({
        ...sub,
        amount: Number(sub.amount),
    }))
    return <SubscriptionPage datas={subscriptions} />;
}