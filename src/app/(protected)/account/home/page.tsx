import { LinksSection } from "@/features/links";
import { ProfileSection } from "@/features/profile";

export default function HomePage() {
    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-7xl px-6 py-6">
                <div className="grid grid-cols-12 gap-6">
                    <main className="col-span-12 lg:col-span-8">
                        <ProfileSection />
                        <LinksSection />
                    </main>

                    <aside className="col-span-4 hidden lg:block">
                        <div className="sticky top-6 w-[360px]">
                            {/* preview */}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
