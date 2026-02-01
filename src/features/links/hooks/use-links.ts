"use client";

import { useCallback, useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

import {
    deleteLink as deleteLinkApi,
    fetchLinks,
    insertLink,
    subscribeToUserLinks,
} from "../services/links-service";

type Link = {
    id: string;
    title: string | null;
    url: string;
};

export function useLinks() {
    // Move client creation inside useEffect/callbacks where it's needed
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
        const supabase = createClient(); // Create client here instead
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
    }, [loadLinks]); // Remove supabase from dependencies

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
