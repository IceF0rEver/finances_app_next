import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import SubscriptionPage from "@/app/[locale]/dashboard/subscription/_components/subscription-page";
import { getCachedUser } from "@/lib/caches/auth-cache";
import { getCachedSubscriptions } from "@/lib/caches/subscription-cache";
// biome-ignore lint/suspicious/noShadowRestrictedNames: error name
import Error from "./error";
import Loading from "./loading";

export default async function Page() {
	const user = await getCachedUser();

	if (!user?.id) {
		return <Error />;
	}

	const subscriptions = getCachedSubscriptions(user.id);

	return (
		<ErrorBoundary fallback={<Error />}>
			<Suspense fallback={<Loading />}>
				<SubscriptionPage subscriptionDatas={subscriptions} />
			</Suspense>
		</ErrorBoundary>
	);
}
