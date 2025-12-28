"use client";

import type { Link } from "../types";

interface LinkListProps {
    links: Link[];
    onDelete?: (id: string) => void;
}

export function LinkList({ links, onDelete }: LinkListProps) {
    if (links.length === 0) {
        return (
            <div className="py-6 text-center text-sm text-gray-500">
                No links yet. Add your first link above 👆
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {links.map((link) => (
                <div
                    key={link.id}
                    className="flex items-center justify-between rounded-lg shadow-sm px-4 py-3 transition hover:bg-gray-50"
                >
                    <div className="min-w-0">
                        <div className="truncate font-medium">
                            {link.title || link.url}
                        </div>
                        <div className="truncate text-sm text-gray-500">
                            {link.url}
                        </div>
                    </div>

                    {onDelete && (
                        <button
                            onClick={() => onDelete(link.id)}
                            className="ml-4 text-sm font-medium text-red-500 hover:underline"
                        >
                            Delete
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
