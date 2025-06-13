"use client"

import { z, string } from "zod";
import { useI18n } from "@/locales/client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authSchemas } from "@/lib/zod/auth-schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import AuthCard from "@/components/auth/auth-card";
import AuthForm from "@/components/auth/auth-form";
import AuthField from "@/components/auth/auth-field";
import AuthButton from "@/components/auth/auth-button";
import AuthFooter from "@/components/auth/auth-footer";


export default function Page() {
	const t = useI18n();
	const router = useRouter();

	const [loading, setLoading] = useState<boolean>(false);
	
	const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});

	const forgotPasswordSchema = authSchemas(t).forgotPassword
	type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>
	
	const form = useForm<ForgotPasswordType>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});
	const onSubmit = async (values: ForgotPasswordType) => {
		try {
			const validatedData = forgotPasswordSchema.parse({
				email: values.email,
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
					toast.success(t('app.auth.forgetPassword.page.toast.success'))
					router.push("/auth/login")
				},
			});
		} catch (error) {
			if (error instanceof z.ZodError) {
				console.error(error)
			}
			setLoading(false)
		}
	};
	return (
		<AuthCard
			title={t('app.auth.forgetPassword.page.title')}
			description={t('app.auth.forgetPassword.page.description')}
			className="max-w-md"
			footer={<AuthFooter href={"/auth/login"} text={t('app.auth.forgetPassword.page.link.login')} />}
		>
			<AuthForm form={form} onSubmit={onSubmit} className="grid gap-4">
				{errorMessage.betterError && <p className="text-sm text-destructive" aria-live="polite" aria-atomic="true">{errorMessage.betterError}</p>}
				<AuthField 
					label={t('app.auth.forgetPassword.page.form.email.label')}
					placeholder={t('app.auth.forgetPassword.page.form.email.placeholder')}
					control={form.control}
					name="email"
					type="email"
				/>
				<AuthButton isLoading={loading} label={t('app.auth.forgetPassword.page.button.submit')}/>
			</AuthForm>
		</AuthCard>
	)
}