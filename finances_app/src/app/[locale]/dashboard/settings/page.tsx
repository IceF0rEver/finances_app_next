"use client"
import { SidebarContent, 
    SidebarGroup, 
    SidebarGroupContent, 
    SidebarMenu, 
    SidebarMenuItem,
    SidebarMenuButton } 
from "@/components/ui/sidebar"
import { useState } from "react"
import { useI18n } from "@/locales/client";
import Appearance from "@/components/settings/appearance";
import Account from "@/components/settings/account";

export default function Page() {
    const t = useI18n();
    const [settingItemSelected, setSettingItemSelected] = useState<string>("appearance");

    const items = [
        { title: t('app.dashboard.settings.page.items.appearance.title'), key: "appearance" },
        { title: t('app.dashboard.settings.page.items.account.title'), key: "account" },
    ];

    return (
        <section className="md:grid md:grid-cols-5 md:p-6">
            <aside className="md:col-span-1">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu className="flex-row md:flex-col">
                                { items && items.map((item) => (
                                    <SidebarMenuItem key={item.key}>
                                        <SidebarMenuButton asChild
                                            variant={"primary"} 
                                            isActive={settingItemSelected === item.key}
                                            onClick={() => (setSettingItemSelected(item.key))}
                                        >
                                            <span>{ item.title }</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </aside>
            <section className="md:col-span-4 px-6">
                { settingItemSelected === 'account' && <Account />}
                { settingItemSelected === 'appearance' && <Appearance />}
            </section>
        </section>
    )
}