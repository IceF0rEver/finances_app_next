"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/src/components/ui/sidebar"
import { NavUser } from "./nav-user";
import { useSession } from "@/src/lib/auth-client";

export function AppSidebar() {
    const { data: session, isPending, error } = useSession();

	const dataUser = {
		name : session?.user.name || "",
		email : session?.user.email || "",
		avatar : session?.user.image || ""
	}
	
  	return (
		<Sidebar>
		<SidebarHeader />
		<SidebarContent>
			<SidebarGroup />
			<SidebarGroup />
		</SidebarContent>
		<SidebarFooter>
			<NavUser user={dataUser} />
		</SidebarFooter>
		</Sidebar>
	)
}
