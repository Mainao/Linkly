import Image from "next/image";

import type { LinkPreviewData } from "../types";

export function LinkPreview({ favicon, title }: LinkPreviewData) {
    return (
        <div className="flex items-center gap-2">
            {favicon && (
                <div className="relative h-5 w-5">
                    <Image
                        src={favicon}
                        alt=""
                        fill
                        sizes="20px"
                        className="object-contain"
                    />
                </div>
            )}

            <h3 className="text-sm font-medium">{title}</h3>
        </div>
    );
}
