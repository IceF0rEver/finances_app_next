import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import type { Metadata } from "next";
import { getI18n } from "@/locales/server";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getI18n();

	return {
		title: t("seo.layout.dashboard.title"),
		description: t("seo.layout.dashboard.description"),
		keywords: [
			t("seo.layout.dashboard.keywords.dashboard"),
			t("seo.layout.dashboard.keywords.budget"),
			t("seo.layout.dashboard.keywords.expenses"),
			t("seo.layout.dashboard.keywords.incomes"),
			t("seo.layout.dashboard.keywords.subscriptions"),
		],
		robots: {
			index: true,
			follow: true,
		},
	};
}
export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="w-full h-screen">
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	);
}
