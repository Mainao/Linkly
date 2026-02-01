import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);

    const code = searchParams.get("code");
    const username = searchParams.get("username");
    let next = searchParams.get("next") ?? "/";

    if (!next.startsWith("/")) {
        next = "/";
    }

    if (!code) {
        return NextResponse.redirect(`${origin}/auth/error`);
    }

    const supabase = await createClient();

    const { error: sessionError } =
        await supabase.auth.exchangeCodeForSession(code);

    if (sessionError) {
        return NextResponse.redirect(`${origin}/auth/error`);
    }

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.redirect(`${origin}/auth/error`);
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();

    if ((!profile || !profile.username) && username) {
        const { error } = await supabase.from("profiles").upsert({
            id: user.id,
            username,
        });

        if (error) {
            return NextResponse.redirect(`${origin}/auth/error`);
        }
    }

    return NextResponse.redirect(`${origin}${next}`);
}
