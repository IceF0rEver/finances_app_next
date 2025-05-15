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
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";

export default function SignUp() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});
	const signUpSchema = z.object({
		email: z.string().email("Please enter a valid email address"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		passwordConfirmation: z.string(),
		name: z.string(),
		image: z.string(),
	}).refine(data => data.password === data.passwordConfirmation, {
		message: "Passwords do not match",
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
				<CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
				<CardDescription className="text-xs md:text-sm">
					Enter your information to create an account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					{errorMessage.prismaError && <p className="text-sm text-red-500" aria-live="polite" aria-atomic="true">{errorMessage.prismaError}</p>}
					<div className="grid grid-cols-2 gap-x-4 gap-y-2">
						<div className="grid gap-2">
							<Label htmlFor="first-name">First name</Label>
							<Input
								id="first-name"
								placeholder="Max"
								required
								onChange={(e) => {
									setFirstName(e.target.value);
								}}
								value={firstName}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="last-name">Last name</Label>
							<Input
								id="last-name"
								placeholder="Robinson"
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
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							required
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							value={email}
						/>
						{errorMessage.email && <p className="text-sm text-red-500" aria-live="polite" aria-atomic="true">{errorMessage.email}</p>}
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							autoComplete="new-password"
							placeholder="Password"
						/>
						{errorMessage.password && <p className="text-sm text-red-500" aria-live="polite" aria-atomic="true">{errorMessage.password}</p>}
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Confirm Password</Label>
						<Input
							id="password_confirmation"
							type="password"
							value={passwordConfirmation}
							onChange={(e) => setPasswordConfirmation(e.target.value)}
							autoComplete="new-password"
							placeholder="Confirm Password"
						/>
						{errorMessage.passwordsMatch && <p className="text-sm text-red-500" aria-live="polite" aria-atomic="true">{errorMessage.passwordsMatch}</p>}
					</div>
					<div className="grid gap-2">
						<Label htmlFor="image">Profile Image (optional)</Label>
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
										setErrorMessage({prismaError: ctx.error.message})
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
										toast.error(err.message);
									});
									
									setErrorMessage(messages);
								} else {
									toast.error("An unexpected error occurred")
								}
								setLoading(false)
							}
						}}
					>
						{loading ? (
							<Loader2 size={16} className="animate-spin" />
						) : (
							"Create an account"
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
						<span>Sign In</span>
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