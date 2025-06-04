import ENDPOINTS from "@/lib/endpoints";
import {  request } from "@/lib/helpers"
import { setUserData } from "@/store/userSlice";

import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteCookie } from "cookies-next";

export default function useAccountDelete() {
 
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);


    const initialValues = {
        agree: false,
  
    };


    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            
            const { data } = await request.post(ENDPOINTS.ACCOUNT_DELETE, values);
            if (data.status === 'success') {
                deleteCookie("access-token");
                deleteCookie("is_logged_in");
                deleteCookie("user_data");
                dispatch(setUserData(null));
                setLoading(false);
                toast.success('Account deleted successfully');
                router.push('/login');

            } else if (data.status === 'error') {
                setLoading(false);
                data.message.error.forEach(message => {
                    toast.error(message);
                });
            }

        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('An error occurred while updating your account');
        } 
    };


    return { initialValues, handleSubmit,  loading }
}
