import LayoutHeader from "@/components/dashboard/layout/layout-header";
import { getI18n } from "@/locales/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getI18n();

	return {
		title: `${t("seo.layout.app.title")} - ${t("seo.layout.budget.title")}`,
		description: t("seo.layout.budget.description"),
		keywords: [
			t("seo.layout.budget.keywords.budget"),
			t("seo.layout.budget.keywords.expenses"),
			t("seo.layout.budget.keywords.incomes"),
			t("seo.layout.budget.keywords.savings"),
			t("seo.layout.budget.keywords.planning"),
		],
		robots: {
			index: true,
			follow: true,
		},
	};
}
export default async function Layout({ children }: { children: React.ReactNode }) {
	const t = await getI18n();
	return (
		<section className="p-6">
			<LayoutHeader
				title={t("app.dashboard.budget.layout.title")}
				description={t("app.dashboard.budget.layout.description")}
			/>
			{children}
		</section>
	);
}
