import ENDPOINTS from "@/lib/endpoints";
import { getCustomCaptcha, getGoogleCaptcha, request } from "@/lib/helpers";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";
import useUtility from "@/app/_hooks/useUtility";

import { useDispatch } from "react-redux";
import { setInstructorData } from "@/store/instructorSlice";

export default function useInstructorRegister() {
    const { gs } = useUtility();
    const router = useRouter();
    const agreeEnabled = gs('agree');
    const dispatch = useDispatch();

    const initialValues = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password_confirmation: '',
        'g-recaptcha-response': '',
        captcha_secret: '',
        agree: ''
    }

    const validationSchema = () => {
        const customCaptcha = getCustomCaptcha();
        const googleCaptcha = getGoogleCaptcha();

        return Yup.object().shape({
            firstname: Yup.string()
                .required('First name is required'),
            lastname: Yup.string()
                .required('Last name is required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            password_confirmation: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required'),
            captcha: customCaptcha?.data?.extension ? Yup.string().required('Please complete the reCAPTCHA') : Yup.string().nullable(),
            'g-recaptcha-response': googleCaptcha?.data?.extension ? Yup.string().required('Google recaptcha is required') : Yup.string().nullable(),
            agree: agreeEnabled ? Yup.boolean()
                .oneOf([true], 'You must agree to the terms and conditions') : Yup.string().nullable(),
        });

    }

    const handleSubmit = async (values, { resetForm }, setPasswordVal) => {
        values.reference = sessionStorage.getItem('reference');
        values.is_web = 1;
        const { data } = await request.post(ENDPOINTS.INSTRUCTOR_REGISTER, values);
        resetForm();
        if (data.status == 'error') {
            data.message.error.forEach(message => {
                toast.error(message);
            });
            setPasswordVal('');
            return false;
        }

        sessionStorage.removeItem('reference');

        let accessToken = data.data.access_token;
        let userData = data.data.user;




        setCookie('access-token', accessToken);
        setCookie('is_logged_in_instructor', true);
        setCookie('instructor_data', JSON.stringify(userData));
        dispatch(setInstructorData(userData));
        router.push('/instructor/dashboard');
        return true;
    }

    return { initialValues, validationSchema, handleSubmit }
}
