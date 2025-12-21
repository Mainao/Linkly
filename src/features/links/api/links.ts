import { createClient } from "@/lib/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { normalizeUrl } from "@/lib/utils";

export type LinkRecord = {
    id: string;
    title: string | null;
    url: string;
};

export async function fetchLinks(): Promise<LinkRecord[]> {
    const supabase = createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
        .from("links")
        .select("id, title, url")
        .eq("user_id", user.id)
        .order("position", { ascending: true });

    if (error) {
        throw error;
    }

    return data ?? [];
}

export async function insertLink(params: {
    title?: string;
    url: string;
}): Promise<void> {
    const supabase = createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error("User not authenticated");
    }

    const { error } = await supabase.from("links").insert({
        user_id: user.id,
        title: params.title ?? null,
        url: normalizeUrl(params.url),
    });

    if (error) {
        throw error;
    }
}

export async function deleteLink(linkId: string): Promise<void> {
    const supabase = createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error("User not authenticated");
    }

    const { error } = await supabase
        .from("links")
        .delete()
        .eq("id", linkId)
        .eq("user_id", user.id);

    if (error) {
        throw error;
    }
}

export function subscribeToUserLinks(
    supabase: SupabaseClient,
    userId: string,
    onChange: () => void
) {
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
            () => {
                onChange();
            }
        )
        .subscribe();

    return channel;
}
