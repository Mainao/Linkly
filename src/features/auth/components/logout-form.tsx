import { signOut } from "@/lib/actions";

type Props = {
    className?: string;
};

export function LogoutForm({ className }: Props) {
    return (
        <form action={signOut}>
            <button className={className ?? "btn cursor-pointer"} type="submit">
                Sign Out
            </button>
        </form>
    );
}
