import { getMetaTitle } from "@/lib/helpers";
import { NewTicketForm } from "./_components/NewTicketForm";

export const metadata = getMetaTitle('New Ticket');

export default function Create() {
    return <NewTicketForm />
}
