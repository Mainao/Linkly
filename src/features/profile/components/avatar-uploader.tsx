"use client";

import Image from "next/image";
import { useRef } from "react";

type AvatarUploaderProps = {
    avatarUrl: string | null;
    onUpload: (file: File) => void;
};

export default function AvatarUploader({
    avatarUrl,
    onUpload,
}: AvatarUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <div
                className="relative h-16 w-16 rounded-full bg-gray-200 overflow-hidden cursor-pointer flex items-center justify-center"
                onClick={() => fileInputRef.current?.click()}
            >
                {avatarUrl ? (
                    <Image
                        src={avatarUrl}
                        alt="Avatar"
                        fill
                        sizes="64px"
                        className="object-cover"
                    />
                ) : (
                    <span className="text-gray-500 text-sm">Upload</span>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onUpload(file);
                }}
            />
        </>
    );
}
