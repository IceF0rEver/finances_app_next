import { Separator } from "@/components/ui/separator"
import { getI18n } from "@/locales/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getI18n();

    return {
        title:  `${t("seo.layout.app.title")} - ${t("seo.layout.subscription.title")}`,
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
    }
}
export default async function Layout({ children }: { children: React.ReactNode }) {
    const t = await getI18n();
    return (
         <section className="p-6">
            <header>
                <h1 className="text-3xl font-bold">{t('app.dashboard.subscription.layout.title')}</h1>
                <p className="py-2">{t('app.dashboard.subscription.layout.description')}</p>
                <Separator className="my-4" />
            </header>
            {children}           
        </section>
    )
}