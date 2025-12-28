import { createClient } from "@/lib/supabase/client";
import { ProfileRow } from "../types";

const supabase = createClient();

/**
 * Get currently authenticated user
 */
export async function getCurrentUser() {
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) {
        throw new Error("User not authenticated");
    }

    return user;
}

/**
 * Fetch profile by user id
 */
export async function getProfile(userId: string): Promise<ProfileRow> {
    const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", userId)
        .single();

    if (error) {
        throw error;
    }

    return data;
}

/**
 * Upload avatar image and update profile
 */
export async function uploadAvatar(
    userId: string,
    file: File
): Promise<string> {
    const ext = file.name.split(".").pop() ?? "png";
    const filePath = `${userId}/avatar.${ext}`;

    const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

    if (uploadError) {
        throw uploadError;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

    // Cache busting
    const publicUrl = `${data.publicUrl}?t=${Date.now()}`;

    const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", userId);

    if (updateError) {
        throw updateError;
    }

    return publicUrl;
}

/**
 * Update username
 */
export async function updateUsername(userId: string, username: string) {
    const { error } = await supabase
        .from("profiles")
        .update({ username })
        .eq("id", userId);

    if (error) {
        throw error;
    }
}
