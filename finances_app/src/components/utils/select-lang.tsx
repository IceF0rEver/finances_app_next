"use client"
import { useI18n } from "@/locales/client"
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectValue } from "@/components/ui/select"
import { useChangeLocale, useCurrentLocale } from "@/locales/client";

export default function SelectLang(){
    const t = useI18n();
    const changeLocale = useChangeLocale();
    const currentLocale = useCurrentLocale();
    
    return (
        <Select onValueChange={(value) => changeLocale(value as 'fr' | 'en')} value={currentLocale}>
            <SelectTrigger>
                <SelectValue placeholder={t('components.utils.selectLang.select')}/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="fr">
                        { t('components.utils.selectLang.fr') }
                    </SelectItem>
                    <SelectItem value="en">
                        { t('components.utils.selectLang.en') }
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}