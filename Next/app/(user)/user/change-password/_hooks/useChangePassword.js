import * as Yup from "yup";
import ENDPOINTS from "@/lib/endpoints";
import toast from "react-hot-toast";
import { request } from "@/lib/helpers";

export default function useChangePassword() {
    const initialValues = {
        current_password: '',
        password: '',
        password_confirmation: ''
    }

    const validationSchema = () => {
        return Yup.object().shape({
            current_password: Yup.string().required('Current password is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password field is required'),
            password_confirmation: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Password confirmation field is required'),
        });
    }

    const handleSubmit = async (values, { resetForm }, setPasswordVal) => {
        try {
            const { data } = await request.post(ENDPOINTS.CHANGE_PASSWORD, values);
            resetForm();
            if (data.status === 'error') {
                data.message.error.forEach(message => {
                    toast.error(message);
                });
                setPasswordVal('');
                return false;
            }
            toast.success('Password changed successfully');
            return true;
        } catch (error) {
            console.error('Error changing password:', error);
            toast.error('An error occurred while changing the password');
            return false;
        }
    }

    return {initialValues, validationSchema, handleSubmit}
}
