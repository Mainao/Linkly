"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

type Props = {
    username: string;
    setUsername: (s: string) => void;
    loading: boolean;
    setLoading: (b: boolean) => void;
    available: boolean | null;
    setAvailable: (b: boolean | null) => void;
};

export default function UsernameInput({
    username,
    setUsername,
    loading,
    setLoading,
    available,
    setAvailable,
}: Props) {
    const supabase = createClient();

    useEffect(() => {
        const delay = setTimeout(async () => {
            if (!username.trim()) {
                setAvailable(null);
                setLoading(false);
                return;
            }

            setLoading(true);

            const { data } = await supabase
                .from("profiles")
                .select("id")
                .eq("username", username.trim())
                .maybeSingle();

            setAvailable(!data);
            setLoading(false);
        }, 300);

        return () => clearTimeout(delay);
    }, [username, supabase, setLoading, setAvailable]);

    return (
        <div className="space-y-2">
            <div className="mt-1">
                <input
                    placeholder="Choose a username"
                    className="block h-10 w-full rounded-md border border-gray-300 border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase())}
                />
            </div>

            <div className="text-sm">
                {loading && <span className="text-gray-500">Checking...</span>}
                {available === true && (
                    <span className="text-green-600">
                        ✓ Username available!
                    </span>
                )}
                {available === false && (
                    <span className="text-red-600">
                        ✗ Username already taken
                    </span>
                )}
            </div>
        </div>
    );
}
