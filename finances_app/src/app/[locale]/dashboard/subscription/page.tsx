
import SubscriptionPage from "@/components/subscription/subscription-page";
import type { subscriptionParams } from "@/types/subscription-types"
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export default async function Page() {
    const datas: subscriptionParams[] = await prisma.subscription.findMany();
    return <SubscriptionPage datas={datas} />;
}