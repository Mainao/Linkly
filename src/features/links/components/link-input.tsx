"use client";

interface LinkInputProps {
    value: string;
    onChange: (value: string) => void;
    onFocus?: () => void;
}

export function LinkInput({ value, onChange, onFocus }: LinkInputProps) {
    return (
        <input
            type="url"
            placeholder="Paste a link…"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={onFocus}
            className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none"
        />
    );
}
