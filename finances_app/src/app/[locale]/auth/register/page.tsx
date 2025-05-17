"use client";

import { Button } from "@/src/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useState } from "react";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import { signUp } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { string, z } from "zod";
import { useI18n } from "@/src/locales/client";

export default function SignUp() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const router = useRouter();
	const t = useI18n();
	const [loading, setLoading] = useState(false);

	const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});
	const signUpSchema = z.object({
		email: z.string().email(t('app.auth.register.page.error.email')),
		password: z.string().min(6, t('app.auth.register.page.error.password')),
		passwordConfirmation: z.string(),
		name: z.string(),
		image: z.string(),
	}).refine(data => data.password === data.passwordConfirmation, {
		message: t('app.auth.register.page.error.passwordMatch'),
		path : ["passwordsMatch"],
	});

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<section className="flex h-screen justify-center items-center">
		<Card className="max-w-md w-full">
			<CardHeader>
				<CardTitle className="text-lg md:text-xl">{t('app.auth.register.page.title')}</CardTitle>
				<CardDescription className="text-xs md:text-sm">
					{t('app.auth.register.page.description')}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					{errorMessage.betterError && <p className="text-sm text-red-500" aria-live="polite" aria-atomic="true">{errorMessage.betterError}</p>}
					<div className="grid grid-cols-2 gap-x-4 gap-y-2">
						<div className="grid gap-2">
							<Label htmlFor="first-name">{t('app.auth.register.page.form.firstName.label')}</Label>
							<Input
								id="first-name"
								placeholder={t('app.auth.register.page.form.firstName.placeholder')}
								required
								onChange={(e) => {
									setFirstName(e.target.value);
								}}
								value={firstName}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="last-name">{t('app.auth.register.page.form.lastName.label')}</Label>
							<Input
								id="last-name"
								placeholder={t('app.auth.register.page.form.lastName.placeholder')}
								required
								onChange={(e) => {
									setLastName(e.target.value);
								}}
								value={lastName}
							/>
						</div>
						{errorMessage.name && <p className="text-sm text-red-500" aria-live="polite" aria-atomic="true">{errorMessage.name}</p>}
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email">{t('app.auth.register.page.form.email.label')}</Label>
						<Input
							id="email"
							type="email"
							placeholder={t('app.auth.register.page.form.email.placeholder')}
							required
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							value={email}
						/>
						{errorMessage.email && <p className="text-sm text-red-500" aria-live="polite" aria-atomic="true">{errorMessage.email}</p>}
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">{t('app.auth.register.page.form.password.label')}</Label>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							autoComplete="new-password"
							placeholder={t('app.auth.register.page.form.password.placeholder')}
						/>
						{errorMessage.password && <p className="text-sm text-red-500" aria-live="polite" aria-atomic="true">{errorMessage.password}</p>}
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">{t('app.auth.register.page.form.confirmPassword.label')}</Label>
						<Input
							id="password_confirmation"
							type="password"
							value={passwordConfirmation}
							onChange={(e) => setPasswordConfirmation(e.target.value)}
							autoComplete="new-password"
							placeholder={t('app.auth.register.page.form.confirmPassword.placeholder')}
						/>
						{errorMessage.passwordsMatch && <p className="text-sm text-red-500" aria-live="polite" aria-atomic="true">{errorMessage.passwordsMatch}</p>}
					</div>
					<div className="grid gap-2">
						<Label htmlFor="image">{t('app.auth.register.page.form.image.label')}</Label>
						<div className="flex items-end gap-4">
							{imagePreview && (
								<div className="relative w-16 h-16 rounded-sm overflow-hidden">
									<Image
										src={imagePreview}
										alt="Profile preview"
										layout="fill"
										objectFit="cover"
									/>
								</div>
							)}
							<div className="flex items-center gap-2 w-full">
								<Input
									id="image"
									type="file"
									accept="image/*"
									onChange={handleImageChange}
									className="w-full"
								/>
								{imagePreview && (
									<X
										className="cursor-pointer"
										onClick={() => {
											setImage(null);
											setImagePreview(null);
										}}
									/>
								)}
							</div>
						</div>
					</div>
					<Button
						type="submit"
						className="w-full"
						disabled={loading}
						onClick={async () => {
							try {
								setErrorMessage({});
								const validatedData = signUpSchema.parse({
									email,
									password,
									passwordConfirmation,
									name: `${firstName} ${lastName}`,
									image: image ? await convertImageToBase64(image) : "",
								});

								await signUp.email(validatedData, {
									onResponse: () => {
										setLoading(false);
									},
									onRequest: () => {
										setLoading(true);
									},
									onError: (ctx) => {
										setErrorMessage({betterError: t(`BASE_ERROR_CODES.${ctx.error.code}` as keyof typeof string)})
									},
									onSuccess: async () => {
										router.push("/dashboard");
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
							t('app.auth.register.page.button.submit')
						)}
					</Button>
				</div>
			</CardContent>
			<CardFooter>
				<div className="flex justify-center w-full border-t py-4">
					<p className="text-center text-xs text-neutral-500">
					<Link
						href="/auth/login"
						className="underline"
					>
						<span>{t('app.auth.register.page.link.login')}</span>
					</Link>
					</p>
				</div>
			</CardFooter>
		</Card>
		</section>
	);
}

async function convertImageToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}