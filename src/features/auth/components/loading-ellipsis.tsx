import { Circle } from "lucide-react";

export function LoadingEllipsis() {
    return (
        <div
            className="loading-ellipsis flex items-center justify-center space-x-2"
            role="status"
            aria-label="Loading"
            aria-live="polite"
        >
            <Circle className="dot dot-1" />
            <Circle className="dot dot-2" />
            <Circle className="dot dot-3" />
        </div>
    );
}
