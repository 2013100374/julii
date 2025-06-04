import { useState } from 'react';
import toast from 'react-hot-toast';
import ENDPOINTS from "@/lib/endpoints";
import {
    getFormData,
    notifyToast,
    request,
    slug
} from '@/lib/helpers';
import { useRouter } from 'next/navigation';

export default function useTickets(noAuth = false) {
    const [loading, setLoading]         = useState(false);
    const [ticket, setTicket]           = useState(null);
    const [replies, setReplies]         = useState([]);
    const [submitting, setSubmitting]   = useState(false);
    const router                      = useRouter();

    const handleSubmit = async (values, resetForm) => {
        const formData = getFormData(values);
        try {
            setSubmitting(true);
            const {
                data
            } = await request.post(ENDPOINTS.INSTRUCTOR_CREATE_TICKET, formData);

            if (data.status === 'success') {
                notifyToast(data);
                resetForm();
                router.push('/instructor/support-ticket/' + data.data.ticket.ticket);
            } else if (data.status === 'error') {
                notifyToast(data);
            }
        } catch (error) {
            console.error('Error submitting ticket:', error);
            toast.error(error.message);
        } finally {
            setSubmitting(false);
        }
    }

    const getTicket = async (ticket_number) => {
        try {
            setLoading(true);
            const {
                data
            } = await request.get((noAuth ? ENDPOINTS.APP_VIEW_TICKET : ENDPOINTS.INSTRUCTOR_VIEW_TICKET) + '/' + ticket_number);
            return data.data;
        } catch (error) {
            console.error('Error fetching ticket:', error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const closeTicket = async (ticketId) => {
            try {
                setSubmitting(true);
                const { data } = await request.post(ENDPOINTS.INSTRUCTOR_CLOSE_TICKET + '/' + ticketId);
                notifyToast(data);
                return data;
            } catch (error) {
                console.error('Error closing ticket:', error);
                toast.error('An error occurred while closing your ticket');
            } finally {
                setSubmitting(false);
            }
    }

    const replyTicket = async (ticketId, values) => {
        try {
            setSubmitting(true);
            const { data } = await request.post((noAuth ? ENDPOINTS.APP_REPLY_TICKET : ENDPOINTS.INSTRUCTOR_REPLY_TICKET) + '/' + ticketId, getFormData(values));
            notifyToast(data);
            return data;
        } catch (error) {
            console.error('Error closing ticket:', error);
            toast.error('An error occurred while replying your ticket');
        } finally {
            setSubmitting(false);
        }
    }

    const downloadFile = async (attachmentId) => {
        try {
            const response = await request.get(ENDPOINTS.INSTRUCTOR_DOWNLOAD_TICKET_ATTACHMENT + `/${attachmentId}`, {
                responseType: 'blob'
            });
    
            const contentType = response.headers['content-type'] || 'application/octet-stream';
            
            const extension = contentType.split('/')[1] || 'file';
            const name = `${slug(ticket?.subject)}-attachments.${extension}`;
    
            const fileBlob = new Blob([response.data], { type: contentType });
            
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(fileBlob);
            link.download = name;
    
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    };
    

    return { 
        replyTicket,
        loading,
        handleSubmit,
        getTicket,
        closeTicket,
        downloadFile,
        replies,
        ticket,
        setTicket,
        setReplies,
        submitting
    };
}