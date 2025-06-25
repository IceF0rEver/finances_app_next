"use client";
import { useI18n } from "@/locales/client";
import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import SettingsArticlePassword from "./settings-article-password";
import { z, type string } from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import AuthForm from "../auth/auth-form";
import { authSchemas } from "@/lib/zod/auth-schemas";
import AuthField from "../auth/auth-field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthButton from "../auth/auth-button";
import SettingsItemsHeader from "./settings-items-header";

export default function Account() {
	const t = useI18n();
	const { data: session } = useSession();

	const [loading, setLoading] = useState<boolean>(false);

	const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});

	const updateUserSchema = authSchemas(t).updateUser;
	type UpdateUserType = z.infer<typeof updateUserSchema>;
	const form = useForm<UpdateUserType>({
		resolver: zodResolver(updateUserSchema),
		defaultValues: {
			email: session?.user.email || "",
			name: session?.user.name || "",
			image: session?.user.image || "",
		},
	});
	const onSubmit = async (values: UpdateUserType) => {
		try {
			const validatedData = updateUserSchema.parse({
				email: values.email,
				name: values.name,
				image: values.image,
			});
			if (validatedData.name !== session?.user.name || validatedData.image !== session?.user.image) {
				await authClient.updateUser(
					{
						...(validatedData.name !== session?.user.name && { name: validatedData.name }),
						...(validatedData.image !== session?.user.image && { image: validatedData.image }),
					},
					{
						onResponse: () => {
							setLoading(false);
						},
						onRequest: () => {
							setLoading(true);
						},
						onError: (ctx) => {
							setErrorMessage({
								betterError: t(`BASE_ERROR_CODES.${ctx.error.code}` as keyof typeof string),
							});
						},
						onSuccess: async () => {
							toast.success(t("app.dashboard.settings.components.account.toast.nameOrImageSuccess"));
						},
					},
				);
			}
			if (validatedData.email !== session?.user.email) {
				await authClient.changeEmail(
					{ newEmail: validatedData.email },
					{
						onResponse: () => {
							setLoading(false);
						},
						onRequest: () => {
							setLoading(true);
						},
						onError: (ctx) => {
							setErrorMessage({
								betterError: t(`BASE_ERROR_CODES.${ctx.error.code}` as keyof typeof string),
							});
						},
						onSuccess: async () => {
							toast.success(t("app.dashboard.settings.components.account.toast.emailSuccess"));
						},
					},
				);
			}
		} catch (error) {
			if (error instanceof z.ZodError) {
				console.error(error);
			}
			setLoading(false);
		}
	};
	return (
		<article className="max-w-3xl">
			<SettingsItemsHeader
				title={t("app.dashboard.settings.components.account.title")}
				description={t("app.dashboard.settings.components.account.description")}
			/>
			<section className="flex flex-col gap-9">
				<SettingsArticlePassword />
				<AuthForm form={form} onSubmit={onSubmit} className="grid gap-9">
					{errorMessage.betterError && (
						<p className="text-sm text-destructive" aria-live="polite" aria-atomic="true">
							{errorMessage.betterError}
						</p>
					)}
					<AuthField
						label={t("app.dashboard.settings.components.account.form.name.label")}
						placeholder={t("app.dashboard.settings.components.account.form.name.placeholder")}
						control={form.control}
						name="name"
						type="text"
						className={"md:max-w-2/3"}
					/>
					<AuthField
						label={t("app.dashboard.settings.components.account.form.email.label")}
						placeholder={t("app.dashboard.settings.components.account.form.email.placeholder")}
						control={form.control}
						name="email"
						type="email"
						className={"md:max-w-2/3"}
					/>
					<AuthField
						label={t("app.dashboard.settings.components.account.form.image.label")}
						control={form.control}
						name="image"
						type="file"
						fieldType="image"
						className={"md:max-w-2/3"}
					/>
					<AuthButton
						className={"w-1/4"}
						isLoading={loading}
						label={t("app.dashboard.settings.components.account.button.update")}
					/>
				</AuthForm>
			</section>
		</article>
	);
}
