import { getUser } from "@/lib/auth/server";

export default async function Page() {
	const user = await getUser();

	return (
		<section className="flex flex-col justify-center items-center gap-4">
			<p>{user?.name}</p>
		</section>
	);
}
