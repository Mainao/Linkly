"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
    fetchLinks,
    insertLink,
    deleteLink as deleteLinkApi,
} from "../api/links";
import { subscribeToUserLinks } from "../api/links";

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
        let channel: ReturnType<typeof supabase.channel>;

        async function setupRealtime() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) return;

            channel = subscribeToUserLinks(supabase, user.id, loadLinks);
        }

        setupRealtime();

        return () => {
            if (channel) {
                supabase.removeChannel(channel);
            }
        };
    }, [supabase, loadLinks]);

    const addLink = useCallback(
        async (title: string | undefined, url: string) => {
            await insertLink({ title, url });
        },
        []
    );

    const deleteLink = useCallback(async (id: string) => {
        await deleteLinkApi(id);
    }, []);

    return {
        links,
        loading,
        loadLinks,
        addLink,
        deleteLink,
    };
}
