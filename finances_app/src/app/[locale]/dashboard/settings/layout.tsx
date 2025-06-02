import { Separator } from "@/components/ui/separator"
import { getI18n } from "@/locales/server";
import { Metadata } from "next";

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
    }
}
export default async function Layout({ children }: { children: React.ReactNode }) {
    const t = await getI18n();
    return (
         <section className="p-6">
            <header>
                <h1 className="text-3xl font-bold">{t('app.dashboard.settings.layout.title')}</h1>
                <p className="py-2">{t('app.dashboard.settings.layout.description')}</p>
                <Separator className="my-4" />
            </header>
            {children}           
        </section>
    )
}