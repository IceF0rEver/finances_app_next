"use client";

import AuthCard from "@/components/auth/auth-card";
import AuthForm from "@/components/auth/auth-form";
import { useI18n } from "@/locales/client";
import { authSchemas } from "@/lib/zod/auth-schemas";
import { z, type string } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthField from "@/components/auth/auth-field";
import AuthButton from "@/components/auth/auth-button";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

export default function Page() {
	const t = useI18n();
	const router = useRouter();
	const searchParams = useSearchParams();

	const [loading, setLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});
	const token = searchParams.get("token");

	const resetPasswordSchema = authSchemas(t).resetPassword;
	type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
	const form = useForm<ResetPasswordType>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: "",
			passwordConfirmation: "",
		},
	});

	const onSubmit = async (values: ResetPasswordType) => {
		try {
			const validatedData = resetPasswordSchema.parse({
				password: values.password,
				passwordConfirmation: values.passwordConfirmation,
			});
			await authClient.resetPassword(
				{ newPassword: validatedData.password, token: token as string },
				{
					onRequest: () => {
						setLoading(true);
					},
					onResponse: () => {
						setLoading(false);
					},
					onError: (ctx) => {
						setErrorMessage({
							betterError: t(`BASE_ERROR_CODES.${ctx.error.code}` as keyof typeof string),
						});
					},
					onSuccess: async () => {
						toast.success(t("components.utils.managePassword.toast.success"));
						router.push("/auth/login");
					},
				},
			);
		} catch (error) {
			if (error instanceof z.ZodError) {
				console.error(error);
			}
			setLoading(false);
		}
	};

	return (
		<AuthCard
			title={t("app.auth.resetPassword.page.title")}
			description={t("app.auth.resetPassword.page.description")}
			className="max-w-md"
		>
			<AuthForm form={form} onSubmit={onSubmit} className="grid gap-4">
				{errorMessage.betterError && (
					<p className="text-sm text-destructive" aria-live="polite" aria-atomic="true">
						{errorMessage.betterError}
					</p>
				)}
				<AuthField
					label={t("components.utils.managePassword.form.password.label")}
					placeholder={t("components.utils.managePassword.form.password.placeholder")}
					control={form.control}
					name="password"
					type="password"
				/>
				<AuthField
					label={t("components.utils.managePassword.form.confirmPassword.label")}
					placeholder={t("components.utils.managePassword.form.confirmPassword.placeholder")}
					control={form.control}
					name="passwordConfirmation"
					type="password"
				/>
				<AuthButton isLoading={loading} label={t("components.utils.managePassword.button.submit")} />
			</AuthForm>
		</AuthCard>
	);
}
