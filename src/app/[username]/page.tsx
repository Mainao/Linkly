import Image from "next/image";
import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

type PageProps = {
    params: Promise<{
        username: string;
    }>;
};

export default async function UserLandingPage({ params }: PageProps) {
    const { username } = await params;
    const supabase = await createClient();

    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, username, avatar_url")
        .eq("username", username)
        .single();

    if (profileError || !profile) {
        notFound();
    }

    const { data: links } = await supabase
        .from("links")
        .select("id, title, url")
        .eq("user_id", profile.id)
        .order("position", { ascending: true });

    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <section className="relative w-full max-w-md min-h-[85vh] rounded-3xl bg-[#f6e4e5] px-6 py-8 shadow-lg">
                <div className="mt-10 flex flex-col items-center text-center">
                    <div className="mb-4 h-20 w-20 rounded-full bg-[#2b2b2b] flex items-center justify-center overflow-hidden">
                        {profile.avatar_url ? (
                            <Image
                                src={profile.avatar_url}
                                alt={profile.username}
                                width={80}
                                height={80}
                                className="rounded-full object-cover"
                            />
                        ) : (
                            <span className="text-white text-xl">
                                {profile.username[0].toUpperCase()}
                            </span>
                        )}
                    </div>

                    <h1 className="text-lg font-semibold text-[#3a2c2c]">
                        {profile.username}
                    </h1>
                </div>

                <div className="mt-8 space-y-3">
                    {links?.map((link) => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full rounded-xl bg-white px-4 py-3 text-center font-medium text-[#3a2c2c] shadow hover:scale-[1.02] transition"
                        >
                            {link.title || link.url}
                        </a>
                    ))}
                </div>
            </section>
        </main>
    );
}
