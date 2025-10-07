import { getCachedUser } from "@/lib/caches/auth-cache";

export default async function Page() {
	const user = await getCachedUser();

	return (
		<section className="flex flex-col justify-center items-center gap-4">
			<p>{user?.name}</p>
		</section>
	);
}
