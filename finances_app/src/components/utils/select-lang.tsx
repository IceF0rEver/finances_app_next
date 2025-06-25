"use client";
import { useI18n } from "@/locales/client";
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectValue } from "@/components/ui/select";
import { useChangeLocale, useCurrentLocale } from "@/locales/client";

export default function SelectLang() {
	const t = useI18n();
	const changeLocale = useChangeLocale();
	const currentLocale = useCurrentLocale();

	const langs = [
		{ key: "fr", label: t("components.utils.selectLang.fr") },
		{ key: "en", label: t("components.utils.selectLang.en") },
	];

	return (
		<Select onValueChange={(value) => changeLocale(value as "fr" | "en")} value={currentLocale}>
			<SelectTrigger>
				<SelectValue placeholder={t("components.utils.selectLang.select")} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{langs?.map((item) => (
						<SelectItem key={item.key} value={item.key}>
							{item.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
