"use client"

import { useI18n } from "@/locales/client"
import { Button } from "../ui/button"
import { useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { z, type string } from "zod"
import { authClient, useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function ChangePassword() {
    const t = useI18n()
    const { data : session } = useSession();
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<Record<string, string>>({})
    const changePasswordSchema = z.object({
        email: z.string().email(t("app.auth.forgetPassword.page.error.email")),
    })

    const handleChangePassword = async () => {
        try {
            setErrorMessage({})
            const validatedData = changePasswordSchema.parse({
                email: session?.user.email,
            })
            await authClient.forgetPassword(
                { email: validatedData.email, redirectTo: "/auth/reset-password" },
                {
                onRequest: (ctx) => {
                    setLoading(true)
                },
                onResponse: (ctx) => {
                    setLoading(false)
                },
                onError: (ctx) => {
                    setErrorMessage({ betterError: t(`BASE_ERROR_CODES.${ctx.error.code}` as keyof typeof string) })
                },
                onSuccess: async () => {
                    toast.success(t("app.auth.forgetPassword.page.toast.success"))
                    await authClient.signOut()
                    router.push("/auth/login")
                },
                },
            )
        } catch (error) {
            if (error instanceof z.ZodError) {
                const messages: Record<string, string> = {}

                error.errors.forEach((err) => {
                const key = err.path.join(".")
                messages[key] = err.message
                })

                setErrorMessage(messages)
            }
            setLoading(false)
        }
    }

    return (
        <article className="flex flex-col gap-2">
        <div className="flex flex-col md:flex-row gap-2">
            <p className="my-auto text-nowrap">{t("app.dashboard.settings.components.account.form.changePassword.label")} :</p>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button type="button" variant={"default"} className="min-w-1/3" disabled={loading}>
                    {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <p>{t("app.dashboard.settings.components.account.link.changePassword")}</p>
                    )}
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
                    <AlertDialogFooter>
                        <AlertDialogCancel>{t("app.dashboard.settings.components.account.button.cancel")}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleChangePassword}>{t("app.dashboard.settings.components.account.button.continue")}</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
        {errorMessage.betterError && (
            <p className="text-sm text-red-500" aria-live="polite" aria-atomic="true">
            {errorMessage.betterError}
            </p>
        )}
        {errorMessage.email && (
            <p className="text-sm text-red-500" aria-live="polite" aria-atomic="true">
            {errorMessage.email}
            </p>
        )}
        <p className="text-sm opacity-60">
            {t("app.dashboard.settings.components.account.form.changePassword.description")}
        </p>
        </article>
    )
}
