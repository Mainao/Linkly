"use client";

import { useProfile } from "../hooks/use-profile";
import { AvatarUploader } from "./avatar-uploader";
import { UsernameDisplay } from "./username-display";

export function ProfileSection() {
    const { avatarUrl, username, uploading, uploadAvatar } = useProfile();

    return (
        <section className="p-6">
            <div className="flex items-center gap-4">
                {!avatarUrl && (
                    <div className="animate-pulse">
                        <div className="h-16 w-16 rounded-full bg-gray-200" />
                    </div>
                )}

                {avatarUrl && (
                    <AvatarUploader
                        avatarUrl={avatarUrl}
                        uploading={uploading}
                        onUpload={uploadAvatar}
                    />
                )}

                {uploading && (
                    <span className="text-sm text-gray-500">
                        Uploading avatar…
                    </span>
                )}

                {username && <UsernameDisplay username={username} />}
            </div>
        </section>
    );
}
