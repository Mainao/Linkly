"use client";

import { useEffect, useState } from "react";
import { fetchLinkPreview } from "@/lib/link-preview";
import { normalizeUrl } from "@/lib/utils";

type LinkPreview = {
    favicon?: string;
    title?: string | undefined;
};

export function useLinkPreview(url: string | undefined) {
    const [preview, setPreview] = useState<LinkPreview | null>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!url) return;

        const normalized = normalizeUrl(url);
        if (!normalized.startsWith("https://")) return;

        setLoading(true);
        const t = setTimeout(async () => {
            try {
                setPreview(await fetchLinkPreview(normalized));
            } catch {
                setPreview(null);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(t);
    }, [url]);

    return { preview, loading };
}
