import ENDPOINTS from "@/lib/endpoints";
import { request, showEmailAddress } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useResetVerification() {
    const [email, setEmail] = useState('');
    const router = useRouter();

    useEffect(() => {
        const storedEmail = localStorage.getItem('verification_email');
        if (storedEmail) {
            setEmail(showEmailAddress(storedEmail));
        }
    }, []);

    const initialValues = {
        code: ''
    }

    const handleSubmit = async (values, { resetForm }, verCode) => {
        values.email = localStorage.getItem('verification_email');
        values.code = verCode;
        const { data } = await request.post(ENDPOINTS.RESET_EMAIL_VERIFICATION, values);
        resetForm();

        if (data.status == 'error') {
            data.message.error.forEach(message => {
                toast.error(message);
            });
            return false;
        }
        localStorage.setItem('reset_token', values.code);
        router.push('/password-reset');
    }


    return { initialValues, handleSubmit, email }
}
