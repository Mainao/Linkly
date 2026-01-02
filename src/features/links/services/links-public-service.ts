import { createClient } from "@/lib/supabase/server";

export async function getPublicLinksByUserId(userId: string) {
    const supabase = await createClient();

    const { data } = await supabase
        .from("links")
        .select("id, title, url")
        .eq("user_id", userId)
        .order("position", { ascending: true });

    return data ?? [];
}
