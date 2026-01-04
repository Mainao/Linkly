import { LinksSection } from "@/features/links";
import { ProfileSection, ProfilePreviewContainer } from "@/features/profile";

export default function HomePage() {
    return (
        <div className="mx-auto max-w-5xl px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
                <main className="space-y-6">
                    <ProfileSection />
                    <LinksSection />
                </main>

                <aside className="hidden lg:block">
                    <div className="sticky top-6 w-[360px]">
                        <ProfilePreviewContainer />
                    </div>
                </aside>
            </div>
        </div>
    );
}
