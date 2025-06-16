"use client"

import { useI18n } from "@/locales/client"
import DarkMode from "../utils/dark-mode"
import SelectLang from "../utils/select-lang"
import ThemeColor from "../utils/theme-color"
import SettingsArticle from "./settings-article"
import SettingsItemsHeader from "./settings-items-header"

export default function Appearance() {
    const t = useI18n()
    return (
        <article className="max-w-3xl">
            <SettingsItemsHeader
                title={t('app.dashboard.settings.components.appearance.title')}
                description={t('app.dashboard.settings.components.appearance.description')}
            />
            <section className="flex flex-col w-full gap-9">
                <SettingsArticle
                    className={"flex flex-col gap-2"}
                    label={t('app.dashboard.settings.components.appearance.form.language.label')}
                    description={t('app.dashboard.settings.components.appearance.form.language.description')}
                >
                    <SelectLang />
                </SettingsArticle>
                <SettingsArticle
                    className={"flex flex-col gap-2"}
                    label={t('app.dashboard.settings.components.appearance.form.darkMode.label')}
                    description={t('app.dashboard.settings.components.appearance.form.darkMode.description')}
                >
                    <DarkMode />
                </SettingsArticle>
                <SettingsArticle
                    className={"flex flex-col gap-2"}
                    label={t('app.dashboard.settings.components.appearance.form.themeColor.label')}
                    description={t('app.dashboard.settings.components.appearance.form.themeColor.description')}
                >
                    <ThemeColor />
                </SettingsArticle>
            </section>
        </article>
    )
}