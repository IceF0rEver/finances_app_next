"use client"
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useCurrentLocale } from '@/src/locales/client';

export default function Home() {
	const router = useRouter();
	const pathname = usePathname();
	const locale  = useCurrentLocale();
	useEffect(() => {
		if (pathname === `/${locale}`){
			router.push(`/${locale}/auth/login`)
		}
	}, [])
}
