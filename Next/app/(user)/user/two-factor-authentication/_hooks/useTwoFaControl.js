import * as Yup from 'yup';
import toast from 'react-hot-toast';
import ENDPOINTS from "@/lib/endpoints";
import { setCookie } from "cookies-next";
import { getUser, request } from '@/lib/helpers';
import { useState } from 'react';

export default function useTwoFaControl(twoFaData) {
    var user = getUser();
    const [twoFaEnabled, setTwoFaEnabled] = useState(user.ts == 1 ? true : false);


    const initialValues = {
        code: ''
    };

    const validationSchema = Yup.object().shape({
        code: Yup.string().required('OTP is required'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        values.secret = twoFaData?.secret;
        try {
            const { data } = await request.post((user?.ts == 1 ? ENDPOINTS.TWO_FA_DISABLE : ENDPOINTS.TWO_FA_ENABLE), values);
            if (data.status === 'success') {
                toast.success('2FA settings updated successfully');
                if(user?.ts == 1){
                    user.ts = 0;
                    setTwoFaEnabled(false);
                }else{
                    user.ts = 1;
                    setTwoFaEnabled(true);
                }
                setCookie('user_data',user);
            } else {
                data.message.error.forEach(message => {
                    toast.error(message);
                });
            }
        } catch (error) {
            console.error('Error updating 2FA settings:', error);
            toast.error('An error occurred while updating 2FA settings');
        }
        resetForm();
    };

    return { initialValues, validationSchema, handleSubmit, twoFaEnabled  }
}
