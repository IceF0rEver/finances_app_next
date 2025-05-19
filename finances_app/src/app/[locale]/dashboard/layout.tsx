import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar"
import { AppSidebar } from "@/src/components/sidebar/app-sidebar";


export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
		<AppSidebar />
		<main className="w-full h-screen">
			<SidebarTrigger />
			{children}
		</main>
		</SidebarProvider>
	)
}
