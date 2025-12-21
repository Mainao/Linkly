"use client";

type Link = {
    id: string;
    title: string | null;
    url: string;
};

interface LinkListProps {
    links: Link[];
    onDelete?: (id: string) => void;
}

export default function LinkList({ links, onDelete }: LinkListProps) {
    if (links.length === 0) {
        return (
            <div className="text-center text-gray-500 text-sm py-6">
                No links yet. Add your first link above 👆
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {links.map((link) => (
                <div
                    key={link.id}
                    className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50 transition"
                >
                    <div className="min-w-0">
                        <div className="font-medium truncate">
                            {link.title || link.url}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                            {link.url}
                        </div>
                    </div>

                    {onDelete && (
                        <button
                            onClick={() => onDelete(link.id)}
                            className="text-red-500 text-sm font-medium hover:underline ml-4"
                        >
                            Delete
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
