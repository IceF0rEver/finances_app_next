"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { authSchemas } from "@/lib/zod/auth-schemas";
import { z, string } from "zod"
import { useI18n } from "@/locales/client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AuthCard from "@/components/auth/auth-card"
import AuthField from "@/components/auth/auth-field";
import AuthForm from "@/components/auth/auth-form";
import AuthButton from "@/components/auth/auth-button";
import AuthFooter from "@/components/auth/auth-footer";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";

async function convertImageToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}

export default function Page() {
	const t = useI18n();
	const router = useRouter();

	const signUpSchema = authSchemas(t).signUp
	type SignUpType = z.infer<typeof signUpSchema>

	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});

	const form = useForm<SignUpType>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			password: "",
			passwordConfirmation: "",
			name: "",
			image: "",
		},
	})
	const onSubmit = async (values: SignUpType) => {
		try {
			const validatedData = signUpSchema.parse({
				email: values.email,
				password: values.password,
				passwordConfirmation: values.passwordConfirmation,
				name: values.name,
				image: values.image ?? "",
			});

			await signUp.email(validatedData, {
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
					router.push(`/dashboard`)
				},
			});
		} catch (error) {
			if (error instanceof z.ZodError) {
				console.error(error)
			}
			setLoading(false)
		}
	}
	return (
		<AuthCard
			title={t('app.auth.register.page.title')}
			description={t('app.auth.register.page.description')}
			className="max-w-md"
			footer={<AuthFooter href={"/auth/login"} text={t('app.auth.register.page.link.login')} />}
		>
			<AuthForm form={form} onSubmit={onSubmit} className="grid gap-4">
				{errorMessage.betterError && <p className="text-sm text-destructive" aria-live="polite" aria-atomic="true">{errorMessage.betterError}</p>}
				<AuthField 
					label={t('app.auth.register.page.form.firstName.label')}
					placeholder={t('app.auth.register.page.form.firstName.placeholder')}
					control={form.control}
					name="name"
					type="text"
				/>
				<AuthField 
					label={t('app.auth.login.page.form.email.label')}
					placeholder={t('app.auth.login.page.form.email.placeholder')}
					control={form.control}
					name="email"
					type="email"
				/>
				<AuthField 
					label={t('app.auth.login.page.form.password.label')}
					placeholder={t('app.auth.login.page.form.password.placeholder')}
					control={form.control}
					name="password"
					type="password"
				/>
				<AuthField 
					label={t('app.auth.register.page.form.confirmPassword.label')}
					placeholder={t('app.auth.register.page.form.confirmPassword.placeholder')}
					control={form.control}
					name="passwordConfirmation"
					type="password"
				/>
				<AuthField 
					label={t('app.auth.register.page.form.image.label')}
					control={form.control}
					name="image"
					type="file"
					fieldType="image"
				/>
				<AuthButton isLoading={loading} label={t('app.auth.register.page.button.submit')}/>
			</AuthForm>
		</AuthCard>
	)
};