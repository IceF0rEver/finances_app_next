
import SubscriptionPage from "@/components/subscription/subscription-page";
import { getUser } from "@/lib/server";
import { getCachedSubscriptions } from "@/lib/caches/subscription-cache";
import EmptyUser from "@/components/dashboard/page/empty-user";

export default async function Page() {
    const user = await getUser();

    if (!user?.id) {
        return <EmptyUser/>
    }

    const subscriptions = await getCachedSubscriptions(user?.id);

    return <SubscriptionPage datas={subscriptions} />;
}