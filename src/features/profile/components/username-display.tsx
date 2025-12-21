type UsernameDisplayProps = {
    username: string;
};

export default function UsernameDisplay({ username }: UsernameDisplayProps) {
    return (
        <span className="text-lg font-medium text-gray-900">{username}</span>
    );
}
