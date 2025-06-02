import { Metadata } from "next";
import { getI18n } from "@/locales/server";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getI18n();

    return {
        title: t("seo.layout.forgotPassword.title"),
        description: t("seo.layout.forgotPassword.description"),
        keywords: [
            t("seo.layout.forgotPassword.keywords.security"),
			t("seo.layout.forgotPassword.keywords.password"),
			t("seo.layout.forgotPassword.keywords.reset"),
			t("seo.layout.forgotPassword.keywords.account"),
			t("seo.layout.forgotPassword.keywords.access"),
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
