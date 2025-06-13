"use client"

import { Loader2 } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { VariantProps } from "class-variance-authority";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useI18n } from "@/locales/client";
import { string } from "zod";


interface AuthButtonProps {
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"],
    variant?: VariantProps<typeof buttonVariants>["variant"],
    className?: string,
    label: string | React.ReactNode,
    isSocial?: boolean,
    isLoading?: boolean,
    socialProvider?: Parameters<typeof signIn.social>[0]["provider"],
}

export default function AuthButton({
type = "submit",
variant = "default",
className,
label,
isSocial = false,
socialProvider = "google",
isLoading = false,
}: AuthButtonProps) {
    const router = useRouter();
    const t = useI18n();

    const [loading, setLoading] = useState<boolean>(isLoading);

    const handleSubmitSocial = async () => {
        await signIn.social({
            provider: socialProvider,
            callbackURL: "/dashboard"
        },
        {
            onRequest: (ctx) => {
                setLoading(true);
                },
            onResponse: (ctx) => {
                setLoading(false);
            },
            onError: (ctx) => {
                console.error({betterError: t(`BASE_ERROR_CODES.${ctx.error.code}` as keyof typeof string)})
            },
            onSuccess: async () => {
                router.push(`/dashboard`)
            },
        });
    }
    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading])

    return (
        <Button
            variant={variant}
            type={type}
            className={className}
            disabled={loading}
            onClick={isSocial === true ? () => handleSubmitSocial() : undefined}
        >
            {loading ? (
                <Loader2 size={16} className="animate-spin" />
            ) : (
                <span>{label}</span>
            )}
        </Button>
    )
}
