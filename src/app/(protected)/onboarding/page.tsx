"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
    const supabase = createClient();
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [available, setAvailable] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if (username.length < 3) {
                setAvailable(null);
                return;
            }

            setLoading(true);

            const { data } = await supabase
                .from("profiles")
                .select("id")
                .eq("username", username)
                .maybeSingle();

            setAvailable(!data);
            setLoading(false);
        }, 300);

        return () => clearTimeout(timeout);
    }, [username, supabase]);

    async function continueNext() {
        if (!available) return;

        setSaving(true);

        const {
            data: { user },
        } = await supabase.auth.getUser();

        const { error } = await supabase
            .from("profiles")
            .update({ username })
            .eq("id", user?.id);

        if (error) {
            setError("Username already taken");
            setSaving(false);
            return;
        }

        router.push("/account/home");
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-6">
                <h1 className="text-2xl font-semibold text-center">
                    Choose your username
                </h1>

                <div>
                    <div className="flex items-center border rounded px-3 py-2">
                        <span className="text-gray-400 mr-1">yourapp.com/</span>
                        <input
                            className="flex-1 outline-none"
                            value={username}
                            onChange={(e) =>
                                setUsername(
                                    e.target.value
                                        .toLowerCase()
                                        .replace(/[^a-z0-9_]/g, "")
                                )
                            }
                            placeholder="username"
                        />
                    </div>

                    <div className="text-sm mt-2">
                        {loading && (
                            <span className="text-gray-500">Checking…</span>
                        )}
                        {available === true && (
                            <span className="text-green-600">✓ Available</span>
                        )}
                        {available === false && (
                            <span className="text-red-600">✗ Taken</span>
                        )}
                    </div>
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <button
                    disabled={!available || saving}
                    onClick={continueNext}
                    className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Continue"}
                </button>
            </div>
        </div>
    );
}
