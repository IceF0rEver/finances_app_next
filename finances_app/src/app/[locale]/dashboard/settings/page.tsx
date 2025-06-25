"use client";
import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { useI18n } from "@/locales/client";
import Appearance from "@/components/settings/appearance";
import Account from "@/components/settings/account";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
	const t = useI18n();
	const router = useRouter();
	const searchParams = useSearchParams();
	const [settingItemSelected, setSettingItemSelected] = useState<string>(
		searchParams.get("selected") || "appearance",
	);

	const items = [
		{ title: t("app.dashboard.settings.page.items.appearance.title"), key: "appearance" },
		{ title: t("app.dashboard.settings.page.items.account.title"), key: "account" },
	];

	return (
		<section className="md:grid md:grid-cols-5 md:p-6">
			<aside className="md:col-span-1">
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupContent>
							<SidebarMenu className="flex-row md:flex-col">
								{items?.map((item) => (
									<SidebarMenuItem key={item.key}>
										<SidebarMenuButton
											asChild
											variant={"primary"}
											isActive={settingItemSelected === item.key}
											onClick={() => {
												setSettingItemSelected(item.key);
												const params = new URLSearchParams(searchParams);
												params.set("selected", item.key);
												router.replace(`?${params.toString()}`);
											}}
										>
											<span>{item.title}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
			</aside>
			<section className="md:col-span-4 px-6">
				{settingItemSelected === "account" && <Account />}
				{settingItemSelected === "appearance" && <Appearance />}
			</section>
		</section>
	);
}
