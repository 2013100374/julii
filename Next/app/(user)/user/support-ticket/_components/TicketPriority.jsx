import Badge from "@/app/_badges/Badge"

export const TicketPriority = ({ ticket }) => {
    return (
        <Badge
            text={
                ticket.priority === 1 ? 'Low' :
                    ticket.priority === 2 ? 'Medium' :
                        ticket.priority === 3 ? 'High' : ''
            }
            variant={
                ticket.priority === 1 ? 'dark' :
                    ticket.priority === 2 ? 'warning' :
                        ticket.priority === 3 ? 'danger' : ''
            }
        />
    )
}