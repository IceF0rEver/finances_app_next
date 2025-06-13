import Link from "next/link";
interface AuthFooterProps {
    href: string,
    text: string,
}
export default function AuthFooter({
href,
text,
}: AuthFooterProps) {
	return (
		<span className="text-center text-xs text-neutral-500">
			<Link href={href} className="underline">{text}</Link>
		</span>
	)
}