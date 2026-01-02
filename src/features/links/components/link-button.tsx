interface LinkButtonProps {
    title?: string | null;
    url: string;
}

export function LinkButton({ title, url }: LinkButtonProps) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-xl bg-white px-4 py-3 text-center font-medium text-[#3a2c2c] shadow hover:scale-[1.02] transition"
        >
            {title || url}
        </a>
    );
}
