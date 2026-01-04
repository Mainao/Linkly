import { Link } from "../types";
import { LinkButton } from "./link-button";

type PublicLinksListProps = {
    links: Link[];
};

export function PublicLinksList({ links }: PublicLinksListProps) {
    return (
        <div className="mt-8 space-y-4">
            {links.map((link) => (
                <LinkButton key={link.id} title={link.title} url={link.url} />
            ))}
        </div>
    );
}
