import Link from "next/link";

interface MarketingLayoutProps {
    children: React.ReactNode;
}

export default async function MarketingLayout({
    children,
}: MarketingLayoutProps) {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full"></div>

            <nav className="fixed top-0 w-full max-w-5xl mx-auto flex items-center justify-between p-6 z-50">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold tracking-tight">
                        Linkly
                    </span>
                </div>
                <Link
                    className="text-sm font-medium hover:text-indigo-600 transition-colors"
                    role="button"
                    href="/sign-in"
                >
                    Sign in
                </Link>
            </nav>
            {children}
            <footer className="fixed bottom-6 text-neutral-400 text-xs font-light">
                © 2026 Linkly.
            </footer>
        </div>
    );
}
