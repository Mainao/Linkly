import { NextResponse } from "next/server";

import mql from "@microlink/mql";

export async function POST(req: Request) {
    const { url } = await req.json();

    if (!url) {
        return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    try {
        const { data } = await mql(url, {
            meta: true,
            screenshot: false,
        });

        return NextResponse.json({
            title: data.title,
            description: data.description,
            favicon: data.logo?.url ?? null,
            image: data.image?.url ?? null,
        });
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch link preview" },
            { status: 500 }
        );
    }
}
