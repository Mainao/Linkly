"use client";

interface LinkListSkeletonProps {
    count?: number;
}

export function LinkListSkeleton({ count = 5 }: LinkListSkeletonProps) {
    return (
        <div
            role="status"
            className="space-y-4 px-6 md:px-12 pb-24 max-w-2xl animate-pulse"
        >
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-4 shadow-sm"
                >
                    <div className="space-y-2">
                        <div className="h-3 w-28 rounded-full bg-gray-300" />
                        <div className="h-2 w-40 rounded-full bg-gray-200" />
                    </div>

                    <div className="h-3 w-12 rounded-full bg-gray-300" />
                </div>
            ))}

            <span className="sr-only">Loading links...</span>
        </div>
    );
}
