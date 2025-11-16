import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);

    const code = searchParams.get("code");
    const username = searchParams.get("username");
    let next = searchParams.get("next") ?? "/";
    if (!next.startsWith("/")) {
        // if "next" is not a relative URL, use the default
        next = "/";
    }

    if (!code) {
        return NextResponse.redirect(`${origin}/auth/error`);
    }

    const supabase = await createClient();

    // Exchange code for session
    const { error: sessionError } = await supabase.auth.exchangeCodeForSession(
        code
    );

    if (sessionError) {
        return NextResponse.redirect(`${origin}/auth/error`);
    }

    // Get the logged-in user
    const {
        data: { user },
    } = await supabase.auth.getUser();

    console.log("🔍 user =", user);

    if (!user) {
        return NextResponse.redirect(`${origin}/auth/error`);
    }

    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();

    if ((!profile || !profile.username) && username) {
        const { error: insertError } = await supabase.from("profiles").upsert({
            id: user.id,
            username,
        });
    } else {
        console.log("➡️ Existing user — no insert needed");
    }

    return NextResponse.redirect(`${origin}${next}`);
}
