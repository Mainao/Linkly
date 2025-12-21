"use client";

import AvatarUploader from "@/features/profile/components/avatar-uploader";
import UsernameDisplay from "@/features/profile/components/username-display";
import { useProfile } from "@/features/profile/hooks/use-profile";
import LinksSection from "@/features/links/link-section";

export default function EditorPage() {
    const { avatarUrl, username, uploading, uploadAvatar } = useProfile();

    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-7xl grid grid-cols-12 gap-6 px-6 py-6">
                <main className="col-span-12 lg:col-span-7 space-y-8">
                    <section className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center gap-4">
                            <AvatarUploader
                                avatarUrl={avatarUrl}
                                onUpload={uploadAvatar}
                            />

                            {uploading && (
                                <span className="text-sm text-gray-500">
                                    Uploading avatar…
                                </span>
                            )}

                            {username && (
                                <UsernameDisplay username={username} />
                            )}
                        </div>
                    </section>

                    <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
                        <h2 className="text-lg font-semibold">Links</h2>
                        <LinksSection />
                    </section>
                </main>
            </div>

            <aside className="col-span-4 hidden lg:flex justify-center">
                {" "}
                <div className="sticky top-6 w-[360px]"></div>{" "}
            </aside>
        </div>
    );
}
