import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"
import { I18nProviderClient } from "@/locales/client";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ThemeColorProvider from "@/components/providers/theme-color-provider";
import { Toaster } from "@/components/ui/sonner";
import { ReactElement } from 'react'


const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Finance App",
	description: "Manage your budget with Finance App",
};
export default async function RootLayout(
{ 
params, 
children 
}: { 
params: Promise<{ locale: string }>, 
children: ReactElement 
}
) {
	const { locale } = await params

	return (
		<html lang={locale} suppressHydrationWarning>
		<body
			className={`${geistSans.variable} ${geistMono.variable} antialiased`}
		>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<I18nProviderClient locale={locale}>
					<ThemeColorProvider>
						{children}
						<Toaster />
					</ThemeColorProvider>
				</I18nProviderClient>
		  	</ThemeProvider>
		</body>
		</html>
	);
}
