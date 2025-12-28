"use client";

import { useCallback, useEffect, useState } from "react";
import {
    fetchLinks,
    insertLink,
    deleteLink as deleteLinkApi,
    subscribeToUserLinks,
} from "../services/links-service";
import { createClient } from "@/lib/supabase/client";

type Link = {
    id: string;
    title: string | null;
    url: string;
};

export function useLinks() {
    const supabase = createClient();

    const [links, setLinks] = useState<Link[]>([]);
    const [loading, setLoading] = useState(false);

    const loadLinks = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchLinks();
            setLinks(data);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadLinks();
    }, [loadLinks]);

    useEffect(() => {
        let channel: ReturnType<typeof subscribeToUserLinks>;

        async function setupRealtime() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) return;

            channel = subscribeToUserLinks(user.id, loadLinks);
        }

        setupRealtime();

        return () => {
            if (channel) {
                supabase.removeChannel(channel);
            }
        };
    }, [supabase, loadLinks]);

    const addLink = useCallback(
        async (url: string, title?: string) => {
            await insertLink({ url, title });
            await loadLinks();
        },
        [loadLinks]
    );

    const deleteLink = useCallback(async (id: string) => {
        await deleteLinkApi(id);
        setLinks((prev) => prev.filter((l) => l.id !== id));
    }, []);

    return {
        links,
        loading,
        addLink,
        deleteLink,
    };
}
