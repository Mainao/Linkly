import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import PageContainer from "@/components/layout/PageContainer";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const user = data?.user;

    if (!user) {
        redirect("/sign-in");
    }

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
