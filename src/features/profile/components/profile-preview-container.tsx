"use client";

import { useProfile } from "../hooks/use-profile";
import { ProfilePreview } from "./profile-preview";

export function ProfilePreviewContainer() {
    const { username } = useProfile();

    return <ProfilePreview username={username ?? ""} />;
}
