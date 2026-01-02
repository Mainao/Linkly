import { Avatar } from "./avatar";

interface PublicProfileHeaderProps {
    username: string;
    avatarUrl?: string | null;
}

export function PublicProfileHeader({
    username,
    avatarUrl,
}: PublicProfileHeaderProps) {
    return (
        <div className="mt-10 flex flex-col items-center text-center">
            <div className="mb-4 h-20 w-20 rounded-full bg-[#2b2b2b] flex items-center justify-center overflow-hidden">
                <Avatar username={username} avatarUrl={avatarUrl} />
            </div>

            <h1 className="text-lg font-semibold text-[#3a2c2c]">{username}</h1>
        </div>
    );
}
