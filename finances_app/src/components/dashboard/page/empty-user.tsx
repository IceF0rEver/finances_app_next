import { getI18n } from "@/locales/server";
import { CircleAlert } from "lucide-react";

export default async function EmptyUser() {
    const t = await getI18n();
    
    return (
        <div className="flex flex-col justify-center items-center w-full gap-2 text-accent-foreground/20">
            <CircleAlert className="size-24"/>
            <h3 className="text-2xl font-bold">
                {t('BASE_ERROR_CODES.FAILED_TO_GET_USER_INFO')}
            </h3>
        </div>
    )
}