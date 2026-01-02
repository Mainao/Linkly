import { LinkButton } from "./link-button";

interface PublicLinksListProps {
    links: {
        id: string;
        title: string | null;
        url: string;
    }[];
}

export function PublicLinksList({ links }: PublicLinksListProps) {
    return (
        <div className="mt-8 space-y-3">
            {links.map((link) => (
                <LinkButton key={link.id} title={link.title} url={link.url} />
            ))}
        </div>
    );
}
