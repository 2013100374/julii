'use client';

import { TicketStatus } from "../../_components/TicketStatus";
import { HeaderSkeleton } from "./skeletons/HeaderSkeleton";

export default function Header({ handleCloseTicket, loading, ticket, noAuth = false }) {
    if (loading || !ticket) return <HeaderSkeleton hasCloseButton={!noAuth} />;

    return (
        <div className="card-header flex-between flex-nowrap">
            <div className="flex-align gap-2">
                <TicketStatus ticket={ticket} />
                <h5 className="text-dark mb-0">
                    [Ticket#{ticket.ticket}] {ticket?.subject}
                </h5>
            </div>

            {
                ticket.status !== 3 && !noAuth ?
                    <button className="btn btn-danger close-button btn-sm" onClick={handleCloseTicket} type="button">
                        Close
                    </button> : null
            }
        </div>
    );
}
