import ENDPOINTS from "@/lib/endpoints";
import React, { useState } from 'react'
import { getCustomCaptcha, getFormData, getGoogleCaptcha, getInstructor, getUser, notifyToast, request } from "@/lib/helpers";
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";

export default function useContact() {
    const user = getUser();
    const instructor = getInstructor();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const initialValues = {
        name: user ? user?.firstname + ' ' + user?.lastname : instructor ? instructor?.firstname + ' ' + instructor?.lastname : '',
        email: user ? user?.email : instructor ? instructor?.email : '',
        subject: '',
        message: '',
        'g-recaptcha-response': '',
        captcha_secret: ''
    }

    const validationSchema = () => {
        const customCaptcha = getCustomCaptcha();
        const googleCaptcha = getGoogleCaptcha();

        return Yup.object().shape({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            subject: Yup.string().nullable(),
            message: Yup.string().required('Message is required'),
            captcha: customCaptcha?.data?.extension ? Yup.string().required('Please complete the reCAPTCHA') : Yup.string().nullable(),
            'g-recaptcha-response': googleCaptcha?.data?.extension ? Yup.string().required('Google recaptcha is required') : Yup.string().nullable()
        });
    }

    const handleSubmit = async (values, { resetForm }) => {
        values.priority = 2;
        if(user){
            authorizedTicket(values, resetForm);
        }else if(instructor)
            instructorAuthorizedTicket(values, resetForm);
        
        else {
            unauthorizedTicket(values, resetForm);
        }
    }


    const instructorAuthorizedTicket = async (values, resetForm) => {
        const formData = getFormData(values);
        setLoading(true);
        try {
            const { data } = await request.post(ENDPOINTS.INSTRUCTOR_CREATE_TICKET, formData);
            if (data.status === 'success') {
                notifyToast(data);
                resetForm();
                router.push('/instructor/support-ticket/' + data.data.ticket.ticket);
                setLoading(false);
            } else if (data.status === 'error') {
                setLoading(false);
                notifyToast(data); 
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    const authorizedTicket = async (values, resetForm) => {
        const formData = getFormData(values);
        setLoading(true);
        try {
            const { data } = await request.post(ENDPOINTS.CREATE_TICKET, formData);
            if (data.status === 'success') {
                notifyToast(data);
                resetForm();
                router.push('/user/support-ticket/' + data.data.ticket.ticket);
                setLoading(false);
            } else if (data.status === 'error') {
                setLoading(false);
                notifyToast(data); 
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const unauthorizedTicket = async (values, resetForm) => {
        const formData = getFormData(values);
        setLoading(true);
        try {
            const { data } = await request.post(ENDPOINTS.CONTACT_US, formData);

            if (data.status === 'success') {
                notifyToast(data);
                resetForm();
                setLoading(false);
                router.push('/ticket/' + data.data.ticket.ticket);

            } else if (data.status === 'error') {

                setLoading(false);
                notifyToast(data);
            }
        } catch (error) {
            console.error('Error submitting ticket:', error);
            toast.error(error.message);
        }
    }

    return {
        initialValues,
        validationSchema,
        handleSubmit,
        user,
        instructor,
        loading
    }
}
