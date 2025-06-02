import { Metadata } from "next";
import { getI18n } from "@/locales/server";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getI18n();

    return {
        title: t("seo.layout.resetPassword.title"),
        description: t("seo.layout.resetPassword.description"),
        keywords: [
            t("seo.layout.resetPassword.keywords.reset"),
            t("seo.layout.resetPassword.keywords.password"),
            t("seo.layout.resetPassword.keywords.security"),
            t("seo.layout.resetPassword.keywords.account"),
            t("seo.layout.resetPassword.keywords.new"),
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
