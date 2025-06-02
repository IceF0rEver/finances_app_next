import { Metadata } from "next";
import { getI18n } from "@/locales/server";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getI18n();

    return {
        title: t("seo.layout.login.title"),
        description: t("seo.layout.login.description"),
        keywords: [
            t("seo.layout.login.keywords.login"),
            t("seo.layout.login.keywords.account"),
            t("seo.layout.login.keywords.secure"),
            t("seo.layout.login.keywords.authentication"),
            t("seo.layout.login.keywords.access"),
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
