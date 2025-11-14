"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Provider } from "@supabase/auth-js";

const signInWith = (provider: Provider) => async () => {
    const supabase = await createClient();

    const auth_callback_url = `${process.env.APP_BASE_URL}/callback`;

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: auth_callback_url,
        },
    });

    console.log(data);

    if (error) {
        console.log(error);
    }

    if (data && typeof data.url === "string") {
        redirect(data.url);
    } else {
        // Fallback to sign-in page if redirect URL is missing
        redirect("/sign-in");
    }
};

const signinWithGoogle = signInWith("google");

const signOut = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
};

export { signinWithGoogle, signOut };
