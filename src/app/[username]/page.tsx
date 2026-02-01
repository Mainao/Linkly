import { notFound } from "next/navigation";

import { PublicLinksList } from "@/features/links/components/public-links-list";
import { getPublicLinksByUserId } from "@/features/links/services/links-public-service";
import { PublicProfileHeader } from "@/features/profile/components/public-profile-header";
import { getPublicProfileByUsername } from "@/features/profile/services/profile-public-service";

type PageProps = {
    params: Promise<{
        username: string;
    }>;
};

export default async function UserLandingPage({ params }: PageProps) {
    const { username } = await params;

    const profile = await getPublicProfileByUsername(username);

    if (!profile) {
        notFound();
    }

    const links = await getPublicLinksByUserId(profile.id);

    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <section className="relative w-full max-w-md min-h-[85vh] rounded-3xl bg-orange-100 px-6 py-8 shadow-lg">
                <PublicProfileHeader
                    username={profile.username}
                    avatarUrl={profile.avatar_url}
                />

                <PublicLinksList links={links} />
            </section>
        </main>
    );
}
