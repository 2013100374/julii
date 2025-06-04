'use client';

import Link from "next/link";
import Table from "@/app/_partials/_table";
import { TicketStatus } from "./TicketStatus";
import { TicketPriority } from "./TicketPriority";
import useUtility from "@/app/_hooks/useUtility";
import useResource from "@/app/_hooks/useResource";
import ENDPOINTS from "@/lib/endpoints";

export const Tickets = () => {
    const { data: tickets, loading, showPagination } = useResource(ENDPOINTS.TICKETS, 'tickets');
    const { trans } = useUtility();


    const columns = [
        {
            label: 'Ticket ID',
            key: 'ticket',
        },
        {
            label: 'Subject',
            key: 'subject',
        },
        {
            label: 'Status',
            render: (ticket) => <TicketStatus ticket={ticket} />
        },
        {
            label: 'Priority',
            render: (ticket) => <TicketPriority ticket={ticket} />
        },
        {
            label: 'Last Reply',
            key: 'last_reply',
            format: 'date',
        },
        {
            label: 'Action',
            key: 'action',
            render: (ticket) => <Link href={`/user/support-ticket/${ticket.ticket}`} className="edit-btn"><i className="las la-desktop"></i></Link>
        }
    ];
    
    return (


        <>

            <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="dashboard-main__title p-0 m-0">{trans(`Tickets`)}</h5>
                <Link className="btn btn--base" href="/user/support-ticket/create">{trans('New Ticket')}</Link>
            </div>
      
                <Table
                    columns={columns}
                    loading={loading}
                    showPagination={showPagination}
                    data={tickets}
                />
        




        </>
    )
}

