"use client"

import { useI18n } from "@/locales/client"
import { Button } from "../ui/button"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription
} from "@/components/ui/alert-dialog"
import UpdatePassword from "./update-password"
import SettingsArticle from "./settings-article"

export default function SettingsArticlePassword() {
    const t = useI18n();
    const [open, setOpen] = useState<boolean>(false);

    return (
        <SettingsArticle
            className={"flex flex-col gap-2"}
            label={t("app.dashboard.settings.components.account.form.changePassword.label")}
            description={t("app.dashboard.settings.components.account.form.changePassword.description")}
        >
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <Button type="button" variant={"default"} className="min-w-1/4">
                        <p>{t("app.dashboard.settings.components.account.link.changePassword")}</p>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {t("app.dashboard.settings.components.account.form.changePassword.confirmTitle")}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {t("app.dashboard.settings.components.account.form.changePassword.confirmDescription")}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <UpdatePassword onOpenChange={setOpen}/>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="w-full">{t("app.dashboard.settings.components.account.button.cancel")}</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </SettingsArticle>
    )
}
