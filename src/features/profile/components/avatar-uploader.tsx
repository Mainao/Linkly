"use client";

import { useRef } from "react";
import Image from "next/image";

type AvatarUploaderProps = {
    avatarUrl: string | null;
    uploading: boolean;
    onUpload: (file: File) => Promise<void>;
};

export function AvatarUploader({
    avatarUrl,
    uploading,
    onUpload,
}: AvatarUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // basic validation
        if (!file.type.startsWith("image/")) {
            alert("Please select an image file");
            return;
        }

        await onUpload(file);

        // allow re-uploading same file
        e.target.value = "";
    };

    return (
        <>
            <button
                type="button"
                aria-label="Upload profile picture"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="relative h-16 w-16 rounded-full overflow-hidden
                           bg-gray-200 flex items-center justify-center
                           focus:outline-none focus:ring-2 focus:ring-offset-2
                           disabled:opacity-50"
            >
                {avatarUrl ? (
                    <Image
                        src={avatarUrl}
                        alt="Profile avatar"
                        fill
                        sizes="64px"
                        className="object-cover"
                    />
                ) : (
                    <span className="text-xs text-gray-500">
                        {uploading ? "Uploading..." : "Upload"}
                    </span>
                )}
            </button>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleChange}
            />
        </>
    );
}
