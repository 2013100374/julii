'use client';

import Header from "@/app/(user)/user/support-ticket/[ticket]/_components/Header";
import { ReplyForm } from "@/app/(user)/user/support-ticket/[ticket]/_components/ReplyForm";
import { ReplyList } from "@/app/(user)/user/support-ticket/[ticket]/_components/ReplyList";
import useTickets from "@/app/(user)/user/support-ticket/_hooks/useTickets";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const ViewTicket = () => {
    const { ticket: ticketNo } = useParams();
    const {
        getTicket,
        submitting,
        loading,
        replyTicket,
        downloadFile,
        replies,
        ticket,
        setTicket,
        setReplies,
    } = useTickets(true);
    const [attachments, setAttachments] = useState([]);

    useEffect(() => {
        getTicket(ticketNo).then(ticket => {
            setReplies(ticket?.messages);
            setTicket(ticket?.my_ticket);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ticketNo]);


    const handleReplySubmit = (values, { resetForm }) => {
        replyTicket(ticket?.id, values).then((data) => {
            const message = data?.data?.message;
            if (!message?.attachments) {
                message.attachments = [];
            }
            message.ticket = ticket;
            setTicket({ ...ticket, status: 2 });
            setReplies([message, ...replies]);
            resetForm();
            setAttachments([]);
        });
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card custom--card">
                        <Header
                            ticket={ticket}
                            loading={loading}
                            noAuth={true}
                        />

                        <div className="card-body">
                            <ReplyForm
                                submitting={submitting}
                                attachments={attachments}
                                setAttachments={setAttachments}
                                handleReplySubmit={handleReplySubmit}
                            />
                        </div>
                    </div>

                    <div className="card custom--card mt-4">
                        <div className="card-body">
                            <ReplyList
                                loading={loading}
                                replies={replies}
                                downloadFile={downloadFile}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}
