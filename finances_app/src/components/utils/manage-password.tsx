"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/locales/client";
import { z, string } from "zod";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";

export default function ManagePassword({
onOpenChange
}: {
onOpenChange?: (open: boolean) => void;
}) {
	const t = useI18n();
    const {data : session} = useSession();
    const router = useRouter();

	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	
	const [password, setPassword] = useState<string>("");
	const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

	const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});

	const resetPasswordSchema = z.object({
		password: z.string().min(6, t('components.utils.managePassword.error.password')),
        passwordConfirmation: z.string(),
	}).refine(data => data.password === data.passwordConfirmation, {
        message: t('components.utils.managePassword.error.passwordMatch'),
        path : ["passwordsMatch"],
    });

    const resetPasswordSessionSchema = z.object({
		password: z.string().min(6, t('components.utils.managePassword.error.password')),
        passwordConfirmation: z.string(),
        currentPassword: z.string(),
	}).refine(data => data.password === data.passwordConfirmation, {
        message: t('components.utils.managePassword.error.passwordMatch'),
        path : ["passwordsMatch"],
    });

	const handleSubmit = async () => {
		try {
			setErrorMessage({});
			const validatedData = resetPasswordSchema.parse({
				password,
				passwordConfirmation,
			});
			await authClient.resetPassword({newPassword: validatedData.password, token: token as string}, {
				onRequest: (ctx) => {
					setLoading(true)
				},
				onResponse: (ctx) => {
					setLoading(false)
				},
				onError: (ctx) => {
					setErrorMessage({betterError: t(`BASE_ERROR_CODES.${ctx.error.code}` as keyof typeof string)})
				},
				onSuccess: async () => {
					toast.success(t('components.utils.managePassword.toast.success'))
					router.push("/auth/login")
				},
			});
		} catch (error) {
			if (error instanceof z.ZodError) {
				const messages: Record<string, string> = {};
						
				error.errors.forEach((err) => {
					const key = err.path.join(".");
					messages[key] = err.message;
				});
						
				setErrorMessage(messages);
			}
			setLoading(false)
		}
	};

    const handleSubmitSession = async () => {
		try {
			setErrorMessage({});
			const validatedData = resetPasswordSessionSchema.parse({
				password,
                currentPassword,
				passwordConfirmation,
			});
			await authClient.changePassword({newPassword: validatedData.password, currentPassword: validatedData.currentPassword, revokeOtherSessions: true,}, {
				onRequest: (ctx) => {
					setLoading(true)
				},
				onResponse: (ctx) => {
					setLoading(false)
				},
				onError: (ctx) => {
					setErrorMessage({betterError: t(`BASE_ERROR_CODES.${ctx.error.code}` as keyof typeof string)})
				},
				onSuccess: async () => {
					toast.success(t('components.utils.managePassword.toast.success'))
					onOpenChange?.(false);
				},
			});
		} catch (error) {
			if (error instanceof z.ZodError) {
				const messages: Record<string, string> = {};
						
				error.errors.forEach((err) => {
					const key = err.path.join(".");
					messages[key] = err.message;
				});
						
				setErrorMessage(messages);
			}
			setLoading(false)
		}
	};
	return (
        <div className="grid gap-4">
            {errorMessage.betterError && <p className="text-sm text-red-500" aria-live="polite" aria-atomic="true">{errorMessage.betterError}</p>}
            {session?.user &&
                <div className="grid gap-2">
                    <Label htmlFor="password">{t('components.utils.managePassword.form.currentPassword.label')}</Label>
                    <Input
                        id="current_password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        autoComplete={t('components.utils.managePassword.form.currentPassword.placeholder')}
                        placeholder={t('components.utils.managePassword.form.currentPassword.placeholder')}
                    />
                    {errorMessage.password && <p className="text-sm text-red-500" aria-live="polite" aria-atomic="true">{errorMessage.password}</p>}
                </div>
            }
			<div className="grid gap-2">
				<Label htmlFor="password">{t('components.utils.managePassword.form.password.label')}</Label>
				<Input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					autoComplete={t('components.utils.managePassword.form.password.placeholder')}
					placeholder={t('components.utils.managePassword.form.password.placeholder')}
				/>
				{errorMessage.password && <p className="text-sm text-red-500" aria-live="polite" aria-atomic="true">{errorMessage.password}</p>}
			</div>
			<div className="grid gap-2">
				<Label htmlFor="password">{t('components.utils.managePassword.form.confirmPassword.label')}</Label>
				<Input
					id="password_confirmation"
					type="password"
					value={passwordConfirmation}
					onChange={(e) => setPasswordConfirmation(e.target.value)}
					autoComplete={t('components.utils.managePassword.form.confirmPassword.placeholder')}
					placeholder={t('components.utils.managePassword.form.confirmPassword.placeholder')}
				/>
				{errorMessage.passwordsMatch && <p className="text-sm text-red-500" aria-live="polite" aria-atomic="true">{errorMessage.passwordsMatch}</p>}
			</div>
			<Button
				type="submit"
				className="w-full"
				variant={"default"}
				disabled={loading}
				onClick={session?.user ? handleSubmitSession : handleSubmit} 
			>
                {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                ) : (
                    <p> {t('components.utils.managePassword.button.submit')} </p>
                )}
            </Button>
        </div>
	)
}