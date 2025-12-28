export type LinkTableRow = {
    id: string;
    user_id: string;
    title: string | null;
    url: string;
    position: number;
    created_at: string;
};

export type LinkRow = {
    id: string;
    title: string | null;
    url: string;
    position: number;
};

export type Link = {
    id: string;
    title: string | null;
    url: string;
};

export type LinkPreviewData = {
    title?: string;
    favicon?: string;
};
