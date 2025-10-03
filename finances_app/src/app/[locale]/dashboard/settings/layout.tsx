import type { Metadata } from "next";
import LayoutHeader from "@/app/[locale]/dashboard/_components/layout-header";
import { getI18n } from "@/locales/server";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getI18n();

	return {
		title: `${t("seo.layout.app.title")} - ${t("seo.layout.settings.title")}`,
		description: t("seo.layout.settings.description"),
		keywords: [
			t("seo.layout.settings.keywords.settings"),
			t("seo.layout.settings.keywords.preferences"),
			t("seo.layout.settings.keywords.account"),
			t("seo.layout.settings.keywords.customization"),
			t("seo.layout.settings.keywords.security"),
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
				title={t("app.dashboard.settings.layout.title")}
				description={t("app.dashboard.settings.layout.description")}
			/>
			{children}
		</section>
	);
}
