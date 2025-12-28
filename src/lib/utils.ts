import { type ClassValue,clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function normalizeUrl(input: string) {
    if (!input) return "";

    // Already has protocol
    if (/^https?:\/\//i.test(input)) {
        return input;
    }

    // Add https by default
    return `https://${input}`;
}
