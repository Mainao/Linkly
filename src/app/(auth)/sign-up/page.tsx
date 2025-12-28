import { redirect } from "next/navigation";
import { SignupForm } from "@/features/auth";
import { createClient } from "@/lib/supabase/server";

export default async function SignInPage() {
    const supabase = await createClient();
    const session = await supabase.auth.getUser();

    if (session.data.user) {
        return redirect("/account/home");
    }

    return <SignupForm />;
}
