"use client";

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
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { useSession } from "@/lib/auth-client";
import { useI18n } from "@/locales/client";
import { usePathname } from "next/navigation";
import { Calendar, HandCoins } from "lucide-react";
import Image from "next/image";

const NavUserSkeleton = () => {
	return (
		<div className="flex flex-row gap-1 w-full h-12 rounded-lg dark:bg-zinc-800 bg-zinc-200 p-2">
			<span className="w-10 aspect-square rounded-lg dark:bg-zinc-700 bg-zinc-300"></span>
			<div className="grid gap-1 w-full p-1">
				<span className="rounded-full w-3/5 dark:bg-zinc-700 bg-zinc-300"></span>
				<span className="rounded-full w-4/5 dark:bg-zinc-700 bg-zinc-300"></span>
			</div>
		</div>
	);
};

export function AppSidebar() {
	const { data: session, isPending } = useSession();
	const t = useI18n();
	const pathname = usePathname();

	const dataSideBar = {
		navMain: [
			{
				title: t("components.appSideBar.navMain.title"),
				url: "#",
				items: [
					{
						title: t("components.appSideBar.navMain.items.budget.name"),
						url: "budget",
						icon: <HandCoins />,
					},
					{
						title: t("components.appSideBar.navMain.items.subscription.name"),
						url: "subscription",
						icon: <Calendar />,
					},
				],
			},
		],
	};

	const dataUser = {
		name: session?.user.name || "",
		email: session?.user.email || "",
		avatar: session?.user.image || "./",
	};

	return (
		<Sidebar>
			<SidebarHeader className="p-0">
				<div className="w-full flex flex-row justify-center items-center gap-2 bg-primary/30">
					<Image src="/image/MyBudget.png" width={250} height={250} alt="Logo picture" className="w-1/3" />
					<h1 className="text-2xl font-bold whitespace-nowrap">
						<span className="text-primary">My</span>Budget
					</h1>
				</div>
			</SidebarHeader>
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
											<SidebarMenuSubButton
												asChild
												isActive={
													item.url ===
													pathname.split("/")[
														pathname.split("/").findIndex((i) => i === "dashboard") + 1
													]
												}
											>
												<a href={`/dashboard/${item.url}`}>
													{item.icon}
													{item.title}
												</a>
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
			<SidebarFooter>{isPending ? <NavUserSkeleton /> : <NavUser user={dataUser} />}</SidebarFooter>
		</Sidebar>
	);
}
