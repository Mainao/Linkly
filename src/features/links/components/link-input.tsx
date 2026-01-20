"use client";

interface LinkInputProps {
    value: string;
    onChange: (value: string) => void;
    onFocus?: () => void;
}

export function LinkInput({ value, onChange, onFocus }: LinkInputProps) {
    return (
        <div className="px-6 md:px-12 max-w-2xl">
            <input
                type="url"
                placeholder="Paste a link…"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={onFocus}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none"
            />
        </div>
    );
}
