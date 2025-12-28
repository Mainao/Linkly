import Header from "@/components/layout/Header";
import PageContainer from "@/components/layout/PageContainer";
import Sidebar from "@/components/layout/Sidebar";

export default async function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <PageContainer>{children}</PageContainer>
            </div>
        </div>
    );
}
