
import Dashboard from "./_components/Dashboard";
import { getMetaTitle } from "@/lib/helpers";

export const metadata = getMetaTitle('Dashboard');

export default function DashboardPage() {
    return (
        <>
            <Dashboard />
        </>
    )
}
