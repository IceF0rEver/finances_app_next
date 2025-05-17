import { getUser } from "@/src/lib/server";

export default async function Page() {

    const user = await getUser();

    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <h1>Bienvenu sur votre dashboard !</h1>
            <p>{user?.name}</p>
        </div>
    )
}