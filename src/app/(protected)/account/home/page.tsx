"use client";
import { LinksSection } from "@/features/links";
import { ProfilePreviewContainer } from "@/features/profile";

export default function HomePage() {
    return (
        <>
            {/* <ProfileSection /> */}
            <main className="flex-1 overflow-y-auto bg-transparent relative">
                <LinksSection />
            </main>

            <ProfilePreviewContainer />
        </>
    );
}
