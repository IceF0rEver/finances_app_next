import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"
import { I18nProviderClient } from "@/src/locales/client";

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

export default async function RootLayout({
	params,
	children,
}: Readonly<{
	params : Promise<{locale: string}>,
	children: React.ReactNode;
}>) {

	const { locale } = await params;

	return (
		<html lang="en">
		<body
			className={`${geistSans.variable} ${geistMono.variable} antialiased`}
		>
			<I18nProviderClient locale={locale}>
				{children}
			</I18nProviderClient>
		</body>
		</html>
	);
}
