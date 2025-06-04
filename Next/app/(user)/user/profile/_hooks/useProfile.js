import ENDPOINTS from "@/lib/endpoints";
import { getFormData, getUser, request } from "@/lib/helpers"
import { setUserData } from "@/store/userSlice";
import { setCookie } from "cookies-next";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as Yup from 'yup';

export default function useProfile() {
    const user = getUser();
    const dispatch = useDispatch();
    const initialValues = {
        firstname: user.firstname,
        lastname : user.lastname,
        email    : user.email,
        mobile   : user.mobile,
        address  : user.address,
        city     : user.city,
        state    : user.state,
        zip      : user.zip,
        country  : user.country_name,
        biography  : user.biography,
        profile_image : ''
    }

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required(),
        lastname : Yup.string().required(),
        email    : Yup.string().email().required(),
        mobile   : Yup.string().required(),
        country  : Yup.string().required(),
        profile_image  : Yup.string().optional(),
        biography  : Yup.string().optional(),
    });

    const handleSubmit = async (values) => {
        try {
            const { email, mobile, country, ...updatedValues } = values;
 
           const formData = getFormData(updatedValues);
            
            const { data } = await request.post(ENDPOINTS.UPDATE_PROFILE, formData);
      

            if (data.status === 'success') {
                toast.success(data.message.success);
                const updatedUserData = { ...getUser(), ...data?.data?.user }; 
                
                setCookie('user_data', JSON.stringify(updatedUserData));
                dispatch(setUserData(updatedUserData));
            } else if (data.status === 'error') {
                data.message.error.forEach(message => {
                    toast.error(message);
                });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('An error occurred while updating your profile');
        } 
    };

    

    return { initialValues, validationSchema, handleSubmit, user }
}
