import { Metadata } from "next";
import { getI18n } from "@/locales/server";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getI18n();

    return {
        title: t("seo.layout.register.title"),
        description: t("seo.layout.register.description"),
        keywords: [
            t("seo.layout.register.keywords.register"),
            t("seo.layout.register.keywords.account"),
            t("seo.layout.register.keywords.create"),
            t("seo.layout.register.keywords.budget"),
            t("seo.layout.register.keywords.start"),
        ],
        robots: {
            index: false,
            follow: true,
        },
    }
}
export default function Layout({ children }: { children: React.ReactNode }) {
	return (
        <div>
            {children}
        </div>
    )
}
