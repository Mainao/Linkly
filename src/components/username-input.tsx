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
            <label className="text-slate-900 text-sm font-medium mb-2 block">
                Choose a username
            </label>
            <div className="mt-1">
                <input
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
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
