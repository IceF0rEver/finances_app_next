import { getUser } from "@/src/lib/server";
import { getI18n } from "@/src/locales/server";

export default async function Page() {

    const user = await getUser();
    const t = await getI18n();

    return (
        <section className="flex flex-col justify-center items-center gap-4">
            <h1>{t('app.dashboard.page.title')}</h1>
            <p>{user?.name}</p>
        </section>
    )
}