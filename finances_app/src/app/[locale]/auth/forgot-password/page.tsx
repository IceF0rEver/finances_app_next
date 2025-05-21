"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { z, string } from "zod";
import { useI18n } from "@/locales/client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Page() {
	const t = useI18n();
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	
	const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});
	const forgotPasswordSchema = z.object({
		email: z.string().email(t('app.auth.fortgetPassword.page.error.email')),
	});

	return (
		<section className="flex h-screen justify-center items-center">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>{t('app.auth.fortgetPassword.page.title')}</CardTitle>
					<CardDescription>{t('app.auth.fortgetPassword.page.description')}</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					{errorMessage.betterError && <p className="text-sm text-red-500" aria-live="polite" aria-atomic="true">{errorMessage.betterError}</p>}
					<div className="grid gap-2">
						<Label htmlFor="email">{t('app.auth.fortgetPassword.page.form.email.label')}</Label>
						<Input
							id="email"
							type="email"
							placeholder={t('app.auth.fortgetPassword.page.form.email.placeholder')}
							required
							onChange={(e) => {
							setEmail(e.target.value);
							}}
							value={email}
						/>
					</div>
					{errorMessage.email && <p className="text-sm text-red-500" aria-live="polite" aria-atomic="true">{errorMessage.email}</p>}
					<Button
						type="submit"
						className="w-full"
						variant={"default"}
						disabled={loading}
						onClick={async () => {
							try {
								setErrorMessage({});
								const validatedData = forgotPasswordSchema.parse({
									email,
								});
								await authClient.forgetPassword({email: validatedData.email, redirectTo: "/auth/reset-password"}, {
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
										toast.success(t('app.auth.fortgetPassword.page.toast.success'))
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
							<p> {t('app.auth.fortgetPassword.page.button.submit')} </p>
						)}
					</Button>
				</CardContent>
				<CardFooter>
					<div className="flex justify-center w-full border-t py-4">
						<p className="text-center text-xs text-neutral-500">
						<Link
							href="/auth/login"
							className="underline"
						>
							<span>{t('app.auth.fortgetPassword.page.link.login')}</span>
						</Link>
						</p>
					</div>
				</CardFooter>
			</Card>
		</section>
	)
}