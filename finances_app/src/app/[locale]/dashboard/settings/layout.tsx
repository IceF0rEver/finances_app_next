import { Separator } from "@/components/ui/separator"
import { getI18n } from "@/locales/server";
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