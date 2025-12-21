export async function fetchLinkPreview(url: string) {
    const res = await fetch("/api/link-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
    });

    if (!res.ok) {
        throw new Error("Failed to fetch link preview");
    }

    return res.json();
}
