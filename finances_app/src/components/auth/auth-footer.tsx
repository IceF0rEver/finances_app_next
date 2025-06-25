"use client";

import Link from "next/link";
import type { AuthFooterProps } from "@/types/auth-types";

export default function AuthFooter({ href, text }: AuthFooterProps) {
	return (
		<span className="text-center text-xs text-neutral-500">
			<Link href={href} className="underline">
				{text}
			</Link>
		</span>
	);
}
