type ProfilePreviewProps = {
    username?: string;
};

export function ProfilePreview({ username }: ProfilePreviewProps) {
    return (
        <section
            className={`hidden xl:flex w-[480px] border-l border-black/5 flex-col items-center justify-center relative p-12 shrink-0`}
        >
            <div className="absolute top-6 left-6 flex items-center gap-2 text-neutral-400">
                <span className="text-[10px] uppercase tracking-widest font-semibold">
                    Live Preview
                </span>
            </div>

            <div className="w-full max-w-[320px] aspect-[9/19] bg-white dark:bg-black rounded-[3rem] shadow-2xl overflow-hidden border-[8px] border-neutral-800 dark:border-neutral-800 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-neutral-800 rounded-b-2xl z-20"></div>
                <div className="w-full h-full overflow-y-auto scrollbar-hide scale-[0.85] origin-top pt-4">
                    <p>{username}</p>
                </div>
            </div>
        </section>
    );
}
