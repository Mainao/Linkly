import { signOut } from "@/lib/actions";

export function LogoutForm() {
    return (
        <form action={signOut}>
            <button className="btn cursor-pointer" type="submit">
                Sign Out
            </button>
        </form>
    );
}
