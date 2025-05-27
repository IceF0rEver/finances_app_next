"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user";
import { useSession } from "@/lib/auth-client";
import { useI18n } from "@/locales/client";
import { usePathname } from "next/navigation";
import { Calendar, HandCoins } from "lucide-react";


export function AppSidebar() {
    const { data: session, isPending, error } = useSession();
	const t = useI18n();
	const pathname = usePathname();

	const dataSideBar = {
		navMain: [{
			title: t('components.appSideBar.navMain.title'),
			url: "#",
			items: [
				{
					title: t('components.appSideBar.navMain.items.budget.name'),
					url: "budget",
					icon: <HandCoins/>,
				},
				{
					title: t('components.appSideBar.navMain.items.subscription.name'),
					url: "subscription",
					icon: <Calendar/>,
				},
			],
		}]
	};

	const dataUser = {
		name : session?.user.name || "",
		email : session?.user.email || "",
		avatar : session?.user.image || "/image/userDefault.webp"
	};
	
  	return (
		<Sidebar>
		<SidebarHeader />
		<SidebarContent>
			<SidebarGroup />
				<SidebarMenu>
					{dataSideBar.navMain.map((item) => (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton variant={"transparent"} asChild>
						<a href={`/dashboard/${item.url}`} className="font-medium">
							{item.title}
						</a>
						</SidebarMenuButton>
						{item.items?.length ? (
						<SidebarMenuSub>
							{item.items.map((item) => (
							<SidebarMenuSubItem key={item.title}>
								<SidebarMenuSubButton asChild isActive={item.url === pathname.split("/")[pathname.split("/").findIndex((i) => i === "dashboard")+1] ? true : false }>
								<a href={item.url}>{item.icon}{item.title}</a>
								</SidebarMenuSubButton>
							</SidebarMenuSubItem>
							))}
						</SidebarMenuSub>
						) : null}
					</SidebarMenuItem>
					))}
				</SidebarMenu>
			<SidebarGroup />
		</SidebarContent>
		<SidebarFooter>
			<NavUser user={dataUser} />
		</SidebarFooter>
		</Sidebar>
	)
}
