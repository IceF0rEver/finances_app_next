"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/locales/client";
import Link from "next/link";
import { z, string } from "zod";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function Page() {
	const t = useI18n();
    const router = useRouter();

	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [loading, setLoading] = useState(false);

	const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});
	const resetPasswordSchema = z.object({
		password: z.string().min(6, t('app.auth.register.page.error.password')),
        passwordConfirmation: z.string(),
	}).refine(data => data.password === data.passwordConfirmation, {
        message: t('app.auth.register.page.error.passwordMatch'),
        path : ["passwordsMatch"],
    });

	return (
		<section className="flex h-screen justify-center items-center">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>{t('app.auth.resetPassword.page.title')}</CardTitle>
					<CardDescription>{t('app.auth.resetPassword.page.description')}</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
                    {errorMessage.betterError && <p className="text-sm text-red-500" aria-live="polite" aria-atomic="true">{errorMessage.betterError}</p>}
					<div className="grid gap-2">
						<Label htmlFor="password">{t('app.auth.resetPassword.page.form.password.label')}</Label>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							autoComplete="new-password"
							placeholder={t('app.auth.resetPassword.page.form.password.placeholder')}
						/>
						{errorMessage.password && <p className="text-sm text-red-500" aria-live="polite" aria-atomic="true">{errorMessage.password}</p>}
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">{t('app.auth.resetPassword.page.form.confirmPassword.label')}</Label>
						<Input
							id="password_confirmation"
							type="password"
							value={passwordConfirmation}
							onChange={(e) => setPasswordConfirmation(e.target.value)}
							autoComplete="new-password"
							placeholder={t('app.auth.resetPassword.page.form.confirmPassword.placeholder')}
						/>
						{errorMessage.passwordsMatch && <p className="text-sm text-red-500" aria-live="polite" aria-atomic="true">{errorMessage.passwordsMatch}</p>}
					</div>
					<Button
						type="submit"
						className="w-full"
						variant={"default"}
						disabled={loading}
						onClick={async () => {
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
										toast.success(t('app.auth.resetPassword.page.toast.success'))
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
						}} 
					>
                        {loading ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <p> {t('app.auth.resetPassword.page.button.submit')} </p>
                        )}
                    </Button>
				</CardContent>
			</Card>
		</section>
	)
}