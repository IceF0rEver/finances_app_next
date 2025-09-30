import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { ReactElement } from "react";
import ThemeColorProvider from "@/components/providers/theme-color-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { I18nProviderClient } from "@/locales/client";
import { getI18n } from "@/locales/server";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
	const t = await getI18n();
	return {
		title: {
			default: t("seo.layout.app.title"),
			template: `${t("seo.layout.app.title")} - %s`,
		},
		description: t("seo.layout.app.description"),
		keywords: [
			t("seo.layout.app.keywords.budget"),
			t("seo.layout.app.keywords.expenses"),
			t("seo.layout.app.keywords.incomes"),
			t("seo.layout.app.keywords.investment"),
			t("seo.layout.app.keywords.subscription"),
		],
		metadataBase: new URL("https://finances-app-next.vercel.app/"),
		alternates: {
			canonical: "/",
			languages: {
				"fr-FR": "/fr",
				"en-US": "/en",
			},
		},
		openGraph: {
			type: "website",
			locale: "fr_FR",
			url: "https://finances-app-next.vercel.app/",
			title: t("seo.layout.app.title"),
			description: t("seo.layout.app.description"),
			siteName: t("seo.layout.app.title"),
			images: [
				{
					url: "/og-image.jpg",
					width: 1200,
					height: 630,
					alt: `${t("seo.layout.app.title")} - Image`,
				},
			],
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
			},
		},
		category: "technology",
	};
}

type RootLayoutProps = {
	params: Promise<{ locale: string }>;
	children: ReactElement;
};
export default async function RootLayout({
	params,
	children,
}: RootLayoutProps) {
	const { locale } = await params;

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
