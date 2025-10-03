import type { Metadata } from "next";
import LayoutHeader from "@/app/[locale]/dashboard/_components/layout-header";
import { getI18n } from "@/locales/server";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getI18n();

	return {
		title: `${t("seo.layout.app.title")} - ${t("seo.layout.subscription.title")}`,
		description: t("seo.layout.subscription.description"),
		keywords: [
			t("seo.layout.subscription.keywords.subscription"),
			t("seo.layout.subscription.keywords.manage"),
			t("seo.layout.subscription.keywords.billing"),
			t("seo.layout.subscription.keywords.renewal"),
			t("seo.layout.subscription.keywords.services"),
		],
		robots: {
			index: true,
			follow: true,
		},
	};
}
export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const t = await getI18n();
	return (
		<section className="p-6">
			<LayoutHeader
				title={t("subscription.layout.title")}
				description={t("subscription.layout.description")}
			/>
			{children}
		</section>
	);
}
