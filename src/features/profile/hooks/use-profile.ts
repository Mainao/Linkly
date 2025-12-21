"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useProfile() {
    const supabase = createClient();
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
            .from("profiles")
            .select("username, avatar_url")
            .eq("id", user.id)
            .single();

        setAvatarUrl(data?.avatar_url ?? null);
        setUsername(data?.username ?? null);
    }

    async function uploadAvatar(file: File) {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        try {
            setUploading(true);

            const ext = file.name.split(".").pop() || "png";
            const path = `${user.id}/avatar.${ext}`;

            await supabase.storage
                .from("avatars")
                .upload(path, file, { upsert: true });

            const { data } = supabase.storage
                .from("avatars")
                .getPublicUrl(path);

            await supabase
                .from("profiles")
                .update({ avatar_url: data.publicUrl })
                .eq("id", user.id);

            setAvatarUrl(data.publicUrl);
        } finally {
            setUploading(false);
        }
    }

    return { avatarUrl, username, uploading, uploadAvatar };
}
