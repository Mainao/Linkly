"use client";

import { Trash2 } from "lucide-react";

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
        <div className="space-y-4 mt-8 px-6 md:px-12 pb-24 max-w-2xl">
            {links.map((link) => (
                <div
                    key={link.id}
                    className="flex items-center justify-between px-4 py-3 overflow-hidden backdrop-blur-xl border rounded-2xl transition-all duration-300 bg-white/40 border-black/5 text-neutral-900 shadow-sm p-4"
                    draggable={true}
                >
                    <div className="min-w-0">
                        <div className="truncate font-medium">
                            {link.title || link.url}
                        </div>
                        <div className="truncate text-xs text-gray-500">
                            {link.url}
                        </div>
                    </div>

                    {onDelete && (
                        <button
                            onClick={() => onDelete(link.id)}
                            className="ml-4 p-2 hover:bg-gray-200 rounded-lg"
                        >
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
