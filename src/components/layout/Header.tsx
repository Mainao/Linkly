import { LogoutForm } from "../logout-form";

export default function Header() {
    return (
        <header className="h-16 flex justify-end p-6 bg-white">
            <LogoutForm />
        </header>
    );
}
