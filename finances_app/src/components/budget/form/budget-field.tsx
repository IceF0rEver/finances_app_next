"use client"

import { 
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";
import type { BudgetFieldProps } from "@/types/budget-types";

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
                        { label && <FormLabel>{label}</FormLabel>}
                        <FormControl>
                            <Input
                                placeholder={placeholder}
                                type={type}
                                {...field}
                                className={cn(className)}
                            />
                        </FormControl>
                        { description && <FormDescription>{description}</FormDescription>}
                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    )
}