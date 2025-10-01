"use server";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { getUser } from "@/lib/auth/server";
import { getCachedBudgets } from "@/lib/caches/budget-cache";
import BudgetPage from "./_components/budget-page";
// biome-ignore lint/suspicious/noShadowRestrictedNames: erro name
import Error from "./error";
import Loading from "./loading";

export default async function Page() {
	const user = await getUser();

	if (!user?.id) {
		return <Error />;
	}

	const cachedbudgets = getCachedBudgets(user.id);

	return (
		<ErrorBoundary fallback={<Error />}>
			<Suspense fallback={<Loading />}>
				<BudgetPage budgets={cachedbudgets} />
			</Suspense>
		</ErrorBoundary>
	);
}
