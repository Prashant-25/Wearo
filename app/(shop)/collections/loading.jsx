import { Skeleton } from "@/components/ui/skeleton";

// We match the span pattern of your actual page for a seamless transition
const spanStyles = [
    "md:col-span-2 lg:col-span-2",
    "md:col-span-1 lg:col-span-1",
    "col-span-1",
    "md:col-span-2 lg:col-span-2"
];

export default function Loading() {
    return (
        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header Skeleton */}
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
                    Curated Collections
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
                    Discover our thoughtfully assembled edits designed for every season, style, and occasion.
                </p>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className={`relative min-h-[400px] md:min-h-[500px] rounded-none ${spanStyles[index]}`}
                    >
                        <Skeleton className="absolute inset-0 h-full w-full bg-zinc-200 animate-pulse" />

                        {/* Content Placeholder inside the skeleton */}
                        <div className="relative z-10 flex flex-col justify-end p-8 md:p-12 w-full h-full space-y-4">
                            <Skeleton className="h-10 w-3/4 bg-zinc-200 animate-pulse" />
                            <Skeleton className="h-6 w-1/2 bg-zinc-200 animate-pulse" />
                            <Skeleton className="h-12 w-32 bg-zinc-200 animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}