import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Oversized Fits</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    <Skeleton className="h-4 w-40" />
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-72 w-full bg-zinc-200 animate-pulse rounded-lg" />
                        <Skeleton className="h-4 w-3/4 bg-zinc-200 animate-pulse rounded" />
                        <Skeleton className="h-4 w-1/2 bg-zinc-200 animate-pulse rounded" />
                    </div>
                ))}
            </div>
        </div>
    )
}