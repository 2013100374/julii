import { getMetaTitle } from "@/lib/helpers";
import { ViewTicket } from "./_components/Viewticket";

export const metadata = getMetaTitle('Ticket Details');

export default function TicketDetails() {
    return <div>
        <ViewTicket />
    </div>;
}
