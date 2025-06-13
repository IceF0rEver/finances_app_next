import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AuthCardProps {
    title: string
    description: string
    children: React.ReactNode
    footer?: React.ReactNode
    className?: string
}

export default function AuthCard({ title, description, children, footer, className }: AuthCardProps) {
    return (
        <section className="flex h-screen justify-center items-center">
            <Card className={cn("w-full", className)}>
                <CardHeader>
                <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
                <CardDescription className="text-xs md:text-sm">{description}</CardDescription>
                </CardHeader>
                <CardContent>{children}</CardContent>
                {footer && (
                <CardFooter>
                    <div className="flex justify-center w-full border-t py-4">{footer}</div>
                </CardFooter>
                )}
            </Card>
        </section>
    )
}
