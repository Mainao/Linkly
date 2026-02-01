import { getCurrentUser } from "@/lib/auth/auth-service";
import { createClient } from "@/lib/supabase/client";
import { normalizeUrl } from "@/lib/utils";

import type { LinkRow } from "../types";

export async function fetchLinks(): Promise<LinkRow[]> {
    const supabase = createClient();
    const user = await getCurrentUser();

    const { data, error } = await supabase
        .from("links")
        .select("id, title, url, position")
        .eq("user_id", user.id)
        .order("position", { ascending: true });

    if (error) throw error;

    return data ?? [];
}

export async function insertLink(params: {
    title?: string;
    url: string;
}): Promise<void> {
    const supabase = createClient();
    const user = await getCurrentUser();

    const { error } = await supabase.from("links").insert({
        user_id: user.id,
        title: params.title ?? null,
        url: normalizeUrl(params.url),
    });

    if (error) throw error;
}

export async function deleteLink(linkId: string): Promise<void> {
    const supabase = createClient(); // Create here
    const user = await getCurrentUser();

    const { error } = await supabase
        .from("links")
        .delete()
        .eq("id", linkId)
        .eq("user_id", user.id);

    if (error) throw error;
}

export function subscribeToUserLinks(userId: string, onChange: () => void) {
    const supabase = createClient(); // Create here
    const channel = supabase
        .channel(`links:${userId}`)
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: "links",
                filter: `user_id=eq.${userId}`,
            },
            onChange,
        )
        .subscribe();

    return channel;
}
