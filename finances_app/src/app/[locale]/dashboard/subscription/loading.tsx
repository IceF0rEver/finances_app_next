
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className="flex flex-col xl:flex-row gap-6">
            <Card className="w-full xl:w-2/5">
                <CardHeader className="space-y-2">
                    <Skeleton className="h-6 w-20 bg-zinc-700" />
                    <Skeleton className="h-4 w-48 bg-zinc-700" />
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Card className="p-2">
                        <div className="flex flex-row justify-around">
                        <Skeleton className="w-8 h-8 bg-zinc-700" />
                        <Skeleton className="w-24 h-8 bg-zinc-700" />
                        <Skeleton className="w-8 h-8 bg-zinc-700" />
                        </div>
                    <Skeleton className="w-full h-96 bg-zinc-700" />
                    </Card>
                </CardContent>
            </Card>
            <Card className="w-full xl:w-3/5">
                <CardHeader className="flex justify-between">
                    <div className='flex flex-col gap-2'>
                        <Skeleton className="h-6 w-60 bg-zinc-700" />
                        <Skeleton className="h-4 w-82 bg-zinc-700" />
                    </div>
                    <div>
                        <Skeleton className="h-8 w-20 bg-zinc-700" />
                    </div>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Card className='flex flex-row justify-around p-2'>
                        <Skeleton className="w-48 h-6 bg-zinc-700" />
                        <Skeleton className="w-48 h-6 bg-zinc-700" />
                        <Skeleton className="w-48 h-6 bg-zinc-700" />
                        <Skeleton className="w-48 h-6 bg-zinc-700" />
                    </Card>
                    <Skeleton className="w-full h-24 bg-zinc-700" />
                    <Skeleton className="w-full h-24 bg-zinc-700" />
                    <Separator />
                    <Skeleton className="w-full h-32 bg-zinc-700" />
                </CardContent>
            </Card>
        </div>
    );
}
