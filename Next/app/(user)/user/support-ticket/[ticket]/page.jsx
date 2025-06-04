import { getMetaTitle } from "@/lib/helpers";
import { ViewTicket } from "./_components/ViewTicket";

export const metadata = getMetaTitle("View Ticket");

export default function Page() {
    return <ViewTicket />;
}