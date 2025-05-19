"use client"

import { Separator } from "@/src/components/ui/separator"
import { Label } from "@radix-ui/react-label"
import { useI18n } from "@/src/locales/client"
import DarkMode from "../utils/dark-mode"
import SelectLang from "../utils/select-lang"
import ThemeColor from "../utils/theme-color"
import { Card } from "../ui/card"

export default function Appearance() {
    const t = useI18n()
    return (
        <article className="max-w-3xl">
            <header>
                <h1 className="text-xl font-bold">{t('app.dashboard.settings.components.appearance.title')}</h1>
                <p className="py-2">{t('app.dashboard.settings.components.appearance.description')}</p>
                <Separator className="my-4" />           
            </header>
            <section className="flex flex-col w-full gap-9">
                <article className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                        <Label className="my-auto">{t('app.dashboard.settings.components.appearance.form.language.label')} :</Label>
                        <SelectLang />
                    </div>
                    <p className="text-sm opacity-60">{t('app.dashboard.settings.components.appearance.form.language.description')}</p>
                </article>
                <article className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                        <Label className="my-auto">{t('app.dashboard.settings.components.appearance.form.darkMode.label')} :</Label>
                        <DarkMode />
                    </div>
                    <p className="text-sm opacity-60">{t('app.dashboard.settings.components.appearance.form.darkMode.description')}</p>
                </article>
                <article className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                        <Label className="my-auto">{t('app.dashboard.settings.components.appearance.form.themeColor.label')} :</Label>
                        <ThemeColor />
                    </div>
                    <p className="text-sm opacity-60">{t('app.dashboard.settings.components.appearance.form.themeColor.description')}</p>
                </article>
            </section>
        </article>
    )
}