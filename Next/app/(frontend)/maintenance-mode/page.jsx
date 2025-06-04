import { MaintenanceMode } from "./_components/MaintenanceMode";
import { getMetaTitle } from "@/lib/helpers";

export const metadata = getMetaTitle('Maintenance Mode');

export default function Page() {
    return <MaintenanceMode />;
}