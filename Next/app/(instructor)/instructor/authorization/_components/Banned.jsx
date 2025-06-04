export default function Banned({ user }) {
    return (
        
        <div>You are banned because : {user?.ban_reason}</div>
    );
}