import Image from "next/image";

interface AvatarProps {
    username: string;
    avatarUrl?: string | null;
}

export function Avatar({ username, avatarUrl }: AvatarProps) {
    if (avatarUrl) {
        return (
            <Image
                src={avatarUrl}
                alt={username}
                width={80}
                height={80}
                className="rounded-full object-cover"
            />
        );
    }

    return (
        <span className="text-white text-xl">{username[0].toUpperCase()}</span>
    );
}
