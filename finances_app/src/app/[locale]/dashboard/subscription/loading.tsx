import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="flex flex-col xl:flex-row gap-6">
			<Card className="w-full xl:w-2/5">
				<CardHeader className="space-y-2">
					<Skeleton className="h-6 w-20 dark:bg-zinc-700 bg-zinc-300" />
					<Skeleton className="h-4 w-48 dark:bg-zinc-700 bg-zinc-300" />
				</CardHeader>
				<CardContent className="grid gap-4">
					<Card className="p-2">
						<div className="flex flex-row justify-around">
							<Skeleton className="w-8 h-8 dark:bg-zinc-700 bg-zinc-300" />
							<Skeleton className="w-24 h-8 dark:bg-zinc-700 bg-zinc-300" />
							<Skeleton className="w-8 h-8 dark:bg-zinc-700 bg-zinc-300" />
						</div>
						<Skeleton className="w-full h-96 dark:bg-zinc-700 bg-zinc-300" />
					</Card>
				</CardContent>
			</Card>
			<Card className="w-full xl:w-3/5">
				<CardHeader className="flex justify-between">
					<div className="flex flex-col gap-2">
						<Skeleton className="h-6 w-60 dark:bg-zinc-700 bg-zinc-300" />
						<Skeleton className="h-4 w-82 dark:bg-zinc-700 bg-zinc-300" />
					</div>
					<div>
						<Skeleton className="h-8 w-20 dark:bg-zinc-700 bg-zinc-300" />
					</div>
				</CardHeader>
				<CardContent className="grid gap-4">
					<Card className="flex flex-row justify-around p-2">
						<Skeleton className="w-48 h-6 dark:bg-zinc-700 bg-zinc-300" />
						<Skeleton className="w-48 h-6 dark:bg-zinc-700 bg-zinc-300" />
						<Skeleton className="w-48 h-6 dark:bg-zinc-700 bg-zinc-300" />
						<Skeleton className="w-48 h-6 dark:bg-zinc-700 bg-zinc-300" />
					</Card>
					<Skeleton className="w-full h-24 dark:bg-zinc-700 bg-zinc-300" />
					<Skeleton className="w-full h-24 dark:bg-zinc-700 bg-zinc-300" />
					<Separator />
					<Skeleton className="w-full h-32 dark:bg-zinc-700 bg-zinc-300" />
				</CardContent>
			</Card>
		</div>
	);
}
