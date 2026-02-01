export default function PageContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex-1 overflow-y-auto bg-transparent relative flex flex-col">
            {children}
        </main>
    );
}
