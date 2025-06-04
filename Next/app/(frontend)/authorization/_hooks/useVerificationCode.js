import { useCallback, useEffect, useState } from 'react';
import { setCookie } from 'cookies-next';
import ENDPOINTS from '@/lib/endpoints';
import toast from 'react-hot-toast';
import { request } from '@/lib/helpers';
import { useRouter } from 'next/navigation';

export default function useVerificationCode(verCode, setVerCode, type) {
    const [isResending, setIsResending] = useState(false);
    const router = useRouter();

    const sendCode = useCallback(async (type) => {
        try {
            const response = await request.get(ENDPOINTS.SEND_CODE);
            if (response.data.status == 'error') {
                if (response.data.remark == 'already_verified') {
                    router.push('/user/dashboard');
                    return false;
                }
                response.data.message.error.forEach(message => {
                    toast.error(message);
                });
            }
        } catch (error) {
            console.error('Error resending verification code:', error);
            toast.error('An error occurred while resending the verification code');
        }
    }, [router]);


    useEffect(() => {
        sendCode();
    }, [sendCode]);


    const initialValues = {
        code: ''
    };

    const tryAgain = async (type) => {
        setIsResending(true);
        try {
            const response = await request.get(ENDPOINTS.RESEND_CODE + '/' + type);

            if (response.data.status == 'error') {
                response.data.message.error.forEach(message => {
                    toast.error(message);
                });
            } else {
                toast.success('Verification code resent successfully');
            }
        } catch (error) {
            console.error('Error resending verification code:', error);
            toast.error('An error occurred while resending the verification code');
        } finally {
            setIsResending(false);
        }
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await request.post(`${ENDPOINTS.VERIFY_CODE}-${type}`, { code: verCode });

            if (response.data.status == 'error') {
                response.data.message.error.forEach(message => {
                    toast.error(message);
                });
                resetForm();
                setVerCode('');
            } else {
                const { data: _userData } = await request.get(ENDPOINTS.USER_INFO);
                const user = _userData.data.user;

                if (type == 'email') {
                    user.ev = 1;
                }
                if (type == 'mobile') {
                    user.sv = 1;
                }
                if (type == 'g2fa') {
                    user.tv = 1;
                }

                toast.success('Verification successful');
                setCookie('user_data', JSON.stringify(user));
                // router.push('/user/dashboard');
                window.location.href = '/user/dashboard';
            }

        } catch (error) {
            toast.error('An error occurred while verifying the code');
            resetForm();
            setVerCode('');
        }
    };

    return { tryAgain, isResending, handleSubmit, initialValues };
}
