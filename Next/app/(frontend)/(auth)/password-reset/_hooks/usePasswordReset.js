import * as Yup from "yup";
import ENDPOINTS from "@/lib/endpoints";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { request } from "@/lib/helpers";

export default function usePasswordReset() {
    const router = useRouter()
    const initialValues = {
        password: '',
        password_confirmation: ''
    }


    const validationSchema = () => {

        return Yup.object().shape({
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password field is required'),
            password_confirmation: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Password confirmation field is required'),
        });

    }


    const handleSubmit = async (values, { resetForm },setPasswordVal) => {
        values.token = localStorage.getItem('reset_token');
        values.email = localStorage.getItem('verification_email');
        
        const { data } = await request.post(ENDPOINTS.RESET_PASSWORD, values);
        resetForm();
        if (data.status == 'error') {
            data.message.error.forEach(message => {
                toast.error(message);
            });
            setPasswordVal('');
            return false;
        }

        localStorage.removeItem('verification_email');
        localStorage.removeItem('reset_token');

        router.push('/login');
        return true;
    }

    return {initialValues,validationSchema,handleSubmit}
}
