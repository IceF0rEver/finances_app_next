"use client"

import { Form } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import type { UseFormReturn, FieldValues, SubmitHandler } from "react-hook-form"


interface AuthFormProps<T extends FieldValues> {
    children: React.ReactNode,
    form: UseFormReturn<T>,
    onSubmit: SubmitHandler<T>
    className?: string, 
}

export default function AuthForm<T extends FieldValues>({
children,
form,
onSubmit,
className,
}: AuthFormProps<T>) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn(className)}>
                {children}
            </form>
        </Form>
    )
}