"use client"

import { useI18n } from "@/locales/client"
import { Button } from "../ui/button"
import { useState } from "react"
import { Loader2 } from "lucide-react"
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
import ManagePassword from "../utils/manage-password"

export default function ChangePassword() {
    const t = useI18n();
    const [open, setOpen] = useState(false);

    return (
        <article className="flex flex-col gap-2">
        <div className="flex flex-col md:flex-row gap-2">
            <p className="my-auto text-nowrap">{t("app.dashboard.settings.components.account.form.changePassword.label")} :</p>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <Button type="button" variant={"default"} className="min-w-1/3">
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
                    <ManagePassword onOpenChange={setOpen}/>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="w-full">{t("app.dashboard.settings.components.account.button.cancel")}</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
        <p className="text-sm opacity-60">
            {t("app.dashboard.settings.components.account.form.changePassword.description")}
        </p>
        </article>
    )
}
