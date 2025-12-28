"use client";

import { useCallback, useEffect, useState } from "react";
import {
    getCurrentUser,
    getProfile,
    uploadAvatar,
    updateUsername,
} from "../services/profile-service";

type Profile = {
    username: string | null;
    avatarUrl: string | null;
};

export function useProfile() {
    const [profile, setProfile] = useState<Profile>({
        username: null,
        avatarUrl: null,
    });
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadProfile = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const user = await getCurrentUser();
            const data = await getProfile(user.id);

            setProfile({
                username: data.username,
                avatarUrl: data.avatar_url,
            });
        } catch (err: unknown) {
            setError((err as Error).message ?? "Failed to load profile");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    const handleAvatarUpload = useCallback(async (file: File) => {
        try {
            setUploading(true);
            setError(null);

            const user = await getCurrentUser();
            const avatarUrl = await uploadAvatar(user.id, file);

            setProfile((prev) => ({
                ...prev,
                avatarUrl,
            }));
        } catch (err: unknown) {
            setError((err as Error).message ?? "Avatar upload failed");
        } finally {
            setUploading(false);
        }
    }, []);

    const handleUsernameUpdate = useCallback(async (username: string) => {
        try {
            setError(null);
            const user = await getCurrentUser();
            await updateUsername(user.id, username);

            setProfile((prev) => ({
                ...prev,
                username,
            }));
        } catch (err: unknown) {
            setError((err as Error).message ?? "Username update failed");
        }
    }, []);

    return {
        profile,
        loading,
        uploading,
        avatarUrl: profile.avatarUrl,
        username: profile.username,
        error,
        reloadProfile: loadProfile,
        uploadAvatar: handleAvatarUpload,
        updateUsername: handleUsernameUpdate,
    };
}
