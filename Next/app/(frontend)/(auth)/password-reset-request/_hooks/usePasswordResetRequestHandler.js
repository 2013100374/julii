"use client";

import { getCustomCaptcha, getGoogleCaptcha, request } from "@/lib/helpers";
import ENDPOINTS from "@/lib/endpoints";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function usePasswordResetRequestHandler() {
    const router = useRouter();

    const initialValues = {
        value: '',
        'g-recaptcha-response': '',
        captcha_secret: ''
    }


    const validationSchema = () => {
        const customCaptcha = getCustomCaptcha();
        const googleCaptcha = getGoogleCaptcha();

        return Yup.object().shape({
            value: Yup.string()
                .required('Username or email is required'),
            captcha: customCaptcha?.data?.extension ? Yup.string().required('Please complete the reCAPTCHA') : Yup.string().nullable(),
            'g-recaptcha-response': googleCaptcha?.data?.extension ? Yup.string().required('Google recaptcha is required') : Yup.string().nullable()
        });

    }


    const handleSubmit = async (values, { resetForm }) => {
        const { data } = await request.post(ENDPOINTS.RESET_EMAIL, values);
        if (data.status == 'error') {
            data.message.error.forEach(message => {
                toast.error(message);
            });
            return false;
        }
        resetForm();

        localStorage.setItem('verification_email', data.data.email);

        router.push('/reset-request-verify');
    }

    return {initialValues,validationSchema,handleSubmit}
}
