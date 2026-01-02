import { createClient } from "@/lib/supabase/server";

export async function getPublicProfileByUsername(username: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("profiles")
        .select("id, username, avatar_url")
        .eq("username", username)
        .single();

    if (error || !data) {
        return null;
    }

    return data;
}
