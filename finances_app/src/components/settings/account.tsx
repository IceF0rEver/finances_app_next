"use client"
import { useI18n } from "@/locales/client"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { useSession } from "@/lib/auth-client";
import ChangePassword from "./change-password";
import Image from "next/image";
import { X } from "lucide-react";
import { z, string } from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function Account() {
    const t = useI18n();
    const { data : session } = useSession();

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState<string | null>(session?.user.name || null);
    const [email, setEmail] = useState<string | null>(session?.user.email || null);
    const [imagePreview, setImagePreview] = useState<string | null>(session?.user.image || null);
    const [image, setImage] = useState<File | null>(null);
    const [isImageChanged, setIsImageChanged] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);


    const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});
    const updateUserSchema = z.object({
        email: z.string().email(t('app.dashboard.settings.components.account.error.email')),
        name: z.string(),
        image: z.string(),
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImage(file);
            setIsImageChanged(true)
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

    const handleRemoveImage = () => {
        setImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setIsImageChanged(true);
    }

    const handleSubmit = async () => {
        try {
            setErrorMessage({});
            const validatedData = updateUserSchema.parse({
                email,
                name,
                image: image ? await convertImageToBase64(image) : "",
            });
            if (name != session?.user.name || isImageChanged) {
                await authClient.updateUser({
                    ...(validatedData.name != session?.user.name && { name: validatedData.name }),
                    ...(isImageChanged && { image: validatedData.image })
                    }, {
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
                        setIsImageChanged(false)
                        toast.success(t('app.dashboard.settings.components.account.toast.nameOrImageSuccess'))
                    },
                });
            } 
            if (email != session?.user.email) {
                await authClient.changeEmail({ newEmail: validatedData.email}, {
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
                        toast.success(t('app.dashboard.settings.components.account.toast.emailSuccess'))
                    },
                });
            }
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
    };
    
    return (
        <article className="max-w-3xl">
            <header>
              <h1 className="text-xl font-bold">{t('app.dashboard.settings.components.account.title')}</h1>
                <p className="py-2">{t('app.dashboard.settings.components.account.description')}</p>
                <Separator className="my-4" />          
            </header>
            <section className="flex flex-col gap-9">
                <ChangePassword/>
                <form className="grid gap-9">
                    {errorMessage.betterError && <p className="text-sm text-red-500" aria-live="polite" aria-atomic="true">{errorMessage.betterError}</p>}
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="name">{t('app.dashboard.settings.components.account.form.name.label')}</Label>
                        <Input 
                            id="name" 
                            type="text"
                            className="md:max-w-2/3"
                            value={name || ""} 
                            placeholder={t('app.dashboard.settings.components.account.form.name.placeholder')}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errorMessage.name && <p className="text-sm text-red-500" aria-live="polite" aria-atomic="true">{errorMessage.name}</p>}
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="email">{t('app.dashboard.settings.components.account.form.email.label')}</Label>
                        <Input 
                            id="email" 
                            type="email"
                            className="md:max-w-2/3" 
                            value={email  || ""} 
                            placeholder={t('app.dashboard.settings.components.account.form.email.placeholder')}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        {errorMessage.email && <p className="text-sm text-red-500" aria-live="polite" aria-atomic="true">{errorMessage.email}</p>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="image">{t('app.dashboard.settings.components.account.form.image.label')}</Label>
                        <div className="flex items-end gap-4 md:max-w-2/3">
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
                                    ref={fileInputRef}
                                />
                                {imagePreview && (
                                    <X
                                        className="cursor-pointer"
                                        onClick={handleRemoveImage}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </section>
            <Button 
                className="mt-4 min-w-1/4" 
                onClick={handleSubmit}
            >
                {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                ) : (
                    <p>{t('app.dashboard.settings.components.account.button.update')}</p>
                )}
            </Button>
        </article>
    )
}

async function convertImageToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}