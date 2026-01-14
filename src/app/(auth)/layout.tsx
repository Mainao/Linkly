import Link from "next/link";

import { ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden bg-neutral-50 text-neutral-900">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full"></div>
            <Link
                href="/"
                role="button"
                className="fixed top-8 left-8 flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors z-50 group"
            >
                <ArrowLeft
                    size={16}
                    className="group-hover:-translate-x-1 transition-transform"
                />
                Back to home
            </Link>
            <div className="w-full max-w-md z-10">{children}</div>
        </div>
    );
}
