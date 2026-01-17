"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LogoutForm } from "@/features/auth";
import { cn } from "@/lib/utils";

export default function Sidebar() {
    const pathname = usePathname();

    const menuItems = [
        { name: "Home", href: "/account/home" },
        { name: "Dashboard", href: "/account/dashboard" },
    ];

    return (
        <aside className="w-60 md:w-64 p-6 border-b md:border-b-0 md:border-r border-black/5 flex flex-col shrink-0 z-20">
            <div className="flex items-center gap-3 mb-12">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">LB</span>
                </div>
                <span className="text-lg font-semibold tracking-tight">
                    Linkly
                </span>
            </div>
            <nav className="flex flex-col flex-1 space-y-1">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all",
                            pathname === item.href
                                ? "bg-black/5 text-black"
                                : "text-neutral-500 hover:text-black hover:bg-black/5"
                        )}
                    >
                        <div className="flex gap-2">{item.name}</div>
                    </Link>
                ))}
                <div className="mt-auto">
                    <LogoutForm
                        className={cn(
                            "w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all",
                            "text-neutral-500 hover:text-black hover:bg-black/5"
                        )}
                    />
                </div>
            </nav>
        </aside>
    );
}
