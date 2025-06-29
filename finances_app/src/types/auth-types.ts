import type { UseFormReturn, FieldValues, SubmitHandler, Control, FieldPath } from "react-hook-form";
import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "@/components/ui/button";
import type { signIn } from "@/lib/auth-client";

export interface AuthFormProps<T extends FieldValues> {
	children: React.ReactNode;
	form: UseFormReturn<T>;
	onSubmit: SubmitHandler<T>;
	className?: string;
}

export interface AuthFooterProps {
	href: string;
	text: string;
}

export interface AuthFieldProps<T extends FieldValues> {
	label?: string;
	description?: string;
	placeholder?: string;
	type: string;
	name: FieldPath<T>;
	control: Control<T>;
	fieldType?: "image" | "default";
	className?: string;
}

export interface AuthCardProps {
	title: string;
	description: string;
	children: React.ReactNode;
	footer?: React.ReactNode;
	className?: string;
}

export interface AuthButtonProps {
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
	variant?: VariantProps<typeof buttonVariants>["variant"];
	className?: string;
	label: string | React.ReactNode;
	isSocial?: boolean;
	isLoading?: boolean;
	socialProvider?: Parameters<typeof signIn.social>[0]["provider"];
}
