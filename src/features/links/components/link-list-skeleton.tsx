"use client";

export default function LinkListSkeleton({ count = 5 }: { count?: number }) {
    return (
        <div role="status" className="space-y-3 animate-pulse">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-4 shadow-sm"
                >
                    <div className="space-y-2">
                        <div className="h-3 bg-gray-300 rounded-full w-28" />
                        <div className="h-2 bg-gray-200 rounded-full w-40" />
                    </div>

                    <div className="h-3 bg-gray-300 rounded-full w-12" />
                </div>
            ))}

            <span className="sr-only">Loading links...</span>
        </div>
    );
}
