import { LinksSection } from "@/features/links";
import { ProfilePreviewContainer } from "@/features/profile";

// Add this line to prevent static generation
export const dynamic = "force-dynamic";

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
