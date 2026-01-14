import Link from "next/link";

import { ArrowRight } from "lucide-react";

export default function IndexPage() {
    return (
        <div className="max-w-4xl w-full text-center space-y-12 z-10">
            <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-extralight tracking-tight leading-tight">
                    All your links <br />
                    <span className="font-normal italic">In one place</span>
                </h1>
                <p className="text-neutral-500 text-lg md:text-xl font-light max-w-xl mx-auto">
                    Create a single link to share anywhere
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                    className="px-8 py-4 bg-black text-white rounded-full font-medium flex items-center gap-2 hover:bg-neutral-800 transition-all transform hover:scale-105"
                    href="/sign-up"
                >
                    Get Started <ArrowRight size={18} />
                </Link>
                <button className="px-8 py-4 bg-white/50 backdrop-blur-md border border-black/5 rounded-full font-medium flex items-center gap-2 hover:bg-white/80 transition-all">
                    View Demo
                </button>
            </div>
        </div>
    );
}
