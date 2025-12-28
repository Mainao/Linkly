"use client";

import { useState } from "react";

import { useLinkPreview } from "../hooks/use-link-preview";
import { useLinks } from "../hooks/use-links";
import { LinkInput } from "./link-input";
import { LinkPreviewSkeleton } from "./link-preview-skeleton";
import { LinkError } from "./link-error";
import { LinkPreview } from "./link-preview";
import { LinkListSkeleton } from "./link-list-skeleton";
import { LinkList } from "./link-list";

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
        <section className="p-6">
            <h2 className="text-lg font-semibold">Links</h2>
            <div className="relative space-y-4 mt-4">
                <LinkInput
                    value={url}
                    onChange={(value) => {
                        setUrl(value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                />

                {/* Preview dropdown */}
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

                {/* Links list */}
                {linksLoading && <LinkListSkeleton />}

                {!linksLoading && links.length === 0 && <LinkListSkeleton />}

                {!linksLoading && links.length > 0 && (
                    <LinkList links={links} onDelete={deleteLink} />
                )}
            </div>
        </section>
    );
}
