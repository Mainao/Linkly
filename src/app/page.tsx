import { ArrowRight } from "lucide-react";

export default function Home() {
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
                <button className="text-sm font-medium hover:text-indigo-600 transition-colors">
                    Sign in
                </button>
            </nav>

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
                    <button className="px-8 py-4 bg-black text-white rounded-full font-medium flex items-center gap-2 hover:bg-neutral-800 transition-all transform hover:scale-105">
                        Get Started <ArrowRight size={18} />
                    </button>
                    <button className="px-8 py-4 bg-white/50 backdrop-blur-md border border-black/5 rounded-full font-medium flex items-center gap-2 hover:bg-white/80 transition-all">
                        View Demo
                    </button>
                </div>
            </div>

            <footer className="fixed bottom-6 text-neutral-400 text-xs font-light">
                © 2026 Linkly.
            </footer>
        </div>
    );
}
