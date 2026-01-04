type ProfilePreviewProps = {
    username?: string;
};

export function ProfilePreview({ username }: ProfilePreviewProps) {
    if (!username) {
        return (
            <div className="rounded-xl border bg-gray-50 p-4 text-sm text-gray-500">
                Your profile preview will appear here once you set a username
            </div>
        );
    }

    return (
        <div className="overflow-hidden bg-black">
            <iframe
                src={`/${username}`}
                title="Public profile preview"
                className="h-[640px] w-[360px] border-0"
            />
        </div>
    );
}
