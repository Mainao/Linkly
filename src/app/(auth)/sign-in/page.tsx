import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "@/features/auth";

export default async function SignInPage() {
    const supabase = await createClient();

    const session = await supabase.auth.getUser();

    if (session.data.user) {
        return redirect("/account/home");
    }

    return <LoginForm />;
}
