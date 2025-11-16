"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Provider } from "@supabase/auth-js";

const signInWith = (provider: Provider) => async (formData?: FormData) => {
    const supabase = await createClient();

    const username = formData?.get("username")?.toString();

    let callbackUrl = `${process.env.APP_BASE_URL}/callback`;

    if (username) {
        callbackUrl += `?username=${encodeURIComponent(username)}`;
    }

    console.log("👉 callbackUrl=", callbackUrl);

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: callbackUrl },
    });

    if (data?.url) redirect(data.url);
    redirect("/sign-in");
};

const signinWithGoogle = signInWith("google");

const signOut = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
};

export { signinWithGoogle, signOut };
