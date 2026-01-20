"use client";

import { useState } from "react";

import { useLinkPreview } from "../hooks/use-link-preview";
import { useLinks } from "../hooks/use-links";
import { LinkError } from "./link-error";
import { LinkInput } from "./link-input";
import { LinkList } from "./link-list";
import { LinkListSkeleton } from "./link-list-skeleton";
import { LinkPreview } from "./link-preview";
import { LinkPreviewSkeleton } from "./link-preview-skeleton";

export function LinksSection() {
    const [url, setUrl] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const { preview, loading: previewLoading } = useLinkPreview(url);

    const { links, addLink, deleteLink, loading: linksLoading } = useLinks();

    const handleSelect = async () => {
        if (!url) return;

        await addLink(url, preview?.title);

        setIsOpen(false);
        setUrl("");
    };

    return (
        <>
            <header className="sticky top-0 p-6 md:p-12 pb-6 flex items-center justify-between z-10 backdrop-blur-md">
                <div>
                    <h2 className="text-3xl font-extralight tracking-tight capitalize">
                        links
                    </h2>
                    <p className="text-neutral-500 text-sm font-light mt-1">
                        Real-time page editor
                    </p>
                </div>
            </header>
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
                    <div className="absolute z-10 mt-4 w-full rounded-md border bg-white shadow">
                        {previewLoading && !preview && <LinkPreviewSkeleton />}

                        {!previewLoading && url && !preview && <LinkError />}

                        {!previewLoading && preview && (
                            <button
                                type="button"
                                onClick={handleSelect}
                                className="w-full px-4 py-3 text-left hover:bg-gray-50"
                            >
                                <LinkPreview {...preview} />
                            </button>
                        )}
                    </div>
                )}

                {linksLoading && <LinkListSkeleton />}

                {!linksLoading && links.length === 0 && <LinkListSkeleton />}

                {!linksLoading && links.length > 0 && (
                    <LinkList links={links} onDelete={deleteLink} />
                )}
            </div>
        </>
    );
}
