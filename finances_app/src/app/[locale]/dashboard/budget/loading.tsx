
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className="flex flex-col xl:flex-row gap-6">
            <Card className="w-full">
                <CardHeader className="space-y-2">
                    <Skeleton className="h-6 w-20 dark:bg-zinc-700 bg-zinc-300" />
                    <Skeleton className="h-4 w-48 dark:bg-zinc-700 bg-zinc-300" />
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Card className="p-2 flex flex-row">
                        <Skeleton className="w-1/3 h-96 dark:bg-zinc-700 bg-zinc-300" />
                        <Skeleton className="w-1/3 h-96 dark:bg-zinc-700 bg-zinc-300" />
                        <Skeleton className="w-1/3 h-96 dark:bg-zinc-700 bg-zinc-300" />
                    </Card>
                </CardContent>
            </Card>
        </div>
    );
}
