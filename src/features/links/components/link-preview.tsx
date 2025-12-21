import Image from "next/image";

type LinkPreview = {
    favicon?: string;
    title?: string | undefined;
};

export default function LinkPreview(preview: LinkPreview) {
    return (
        <div className="flex items-center gap-2">
            {preview.favicon && (
                <div className="relative w-5 h-5">
                    <Image
                        src={preview.favicon}
                        alt=""
                        fill
                        sizes="20px"
                        className="object-contain"
                    />
                </div>
            )}

            <h3 className="font-medium text-sm">{preview.title}</h3>
        </div>
    );
}
