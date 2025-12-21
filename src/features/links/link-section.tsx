"use client";

import { useState, useEffect } from "react";
import LinkInput from "./components/link-input";
import LinkPreview from "./components/link-preview";
import LinkError from "./components/link-error";
import LinkSkeleton from "./components/link-skeleton";
import LinkList from "./components/link-list";
import { useLinkPreview } from "./hooks/use-linkpreview";
import { useLinks } from "./hooks/use-links";
import LinkListSkeleton from "./components/link-list-skeleton";

export default function LinksSection() {
    const [url, setUrl] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const { preview, loading } = useLinkPreview(url);
    const { links, addLink, deleteLink, loadLinks } = useLinks();

    useEffect(() => {
        loadLinks();
    }, [loadLinks]);

    function handleSelect() {
        if (!preview) return;
        addLink(preview.title, url);
        setIsOpen(false);
        setUrl("");
    }

    return (
        <div className="relative space-y-4">
            <LinkInput
                value={url}
                onChange={(value) => {
                    setUrl(value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
            />

            {isOpen && url && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow">
                    {loading && !preview && <LinkSkeleton />}
                    {!loading && url && !preview && <LinkError />}
                    {!loading && preview && (
                        <button
                            type="button"
                            onClick={handleSelect}
                            className="w-full text-left hover:bg-gray-50 px-4 py-3"
                        >
                            <LinkPreview {...preview} />
                        </button>
                    )}
                </div>
            )}

            {links.length === 0 && <LinkListSkeleton />}

            {links.length > 0 && (
                <LinkList links={links} onDelete={deleteLink} />
            )}
        </div>
    );
}
