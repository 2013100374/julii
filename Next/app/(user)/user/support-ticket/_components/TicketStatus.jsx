import Badge from "@/app/_badges/Badge"

export const TicketStatus = ({ ticket }) => {
    const ticketStatus = {
        0: 'Open',
        1: 'Answer',
        2: 'Replied',
        3: 'Closed'
    }

    const ticketClass = {
        0: 'success',
        1: 'primary',
        2: 'warning',
        3: 'dark'
    }

    return (
        <Badge
            text={ticketStatus[ticket?.status]}
            variant={ticketClass[ticket?.status]}
        />
    );
}