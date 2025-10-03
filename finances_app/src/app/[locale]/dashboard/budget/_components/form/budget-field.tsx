"use client";

import type { FieldValues } from "react-hook-form";
import type { BudgetFieldProps } from "@/app/[locale]/dashboard/budget/_components/_types/budget-types";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function BudgetField<T extends FieldValues>({
	label,
	description,
	placeholder,
	type,
	name,
	control,
	className,
}: BudgetFieldProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => {
				return (
					<FormItem>
						{label && <FormLabel>{label}</FormLabel>}
						<FormControl>
							<Input
								placeholder={placeholder}
								type={type}
								{...field}
								className={cn(className)}
							/>
						</FormControl>
						{description && <FormDescription>{description}</FormDescription>}
						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
}
