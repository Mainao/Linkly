import Sidebar from "@/components/layout/Sidebar";

export default async function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen transition-colors duration-500 text-neutral-900">
            <div className="h-screen flex flex-col md:flex-row overflow-hidden">
                <Sidebar />
                <div className="flex flex-1">{children}</div>
            </div>
        </div>
    );
}
