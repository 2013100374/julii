import ENDPOINTS from "@/lib/endpoints";
import { getFormData, getInstructor, getUser, request } from "@/lib/helpers"
import { setInstructorData } from "@/store/instructorSlice";
import { setUserData } from "@/store/userSlice";
import { setCookie } from "cookies-next";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as Yup from 'yup';

export default function useInstructorProfile() {
    const user = getInstructor();

      const [loading, setLoading] = useState(false);

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
        designation  : user.designation || '',
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
        designation  : Yup.string().required(),
    });

    const handleSubmit = async (values) => {
        try {
            const { email, mobile, country, ...updatedValues } = values;
 
           const formData = getFormData(updatedValues);
            
            const { data } = await request.post(ENDPOINTS.INSTRUCTOR_PROFILE_UPDATE, formData);
      

            if (data.status === 'success') {
                toast.success(data.message.success);
                const updatedUserData = { ...getInstructor(), ...data?.data?.user }; 
                
                setCookie('instructor_data', JSON.stringify(updatedUserData));
                dispatch(setInstructorData(updatedUserData));
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


    const validationAccountSchema = Yup.object().shape({
        website_url: Yup.string().optional(),
        facebook_url : Yup.string().optional(),
        instagram_url    : Yup.string().optional(),
        linkedin_url   : Yup.string().optional(),
    });

    const handleAccountSubmit = async (values) => {

        setLoading(true);
        try {
 
           const formData = getFormData(values);
            const { data } = await request.post(ENDPOINTS.INSTRUCTOR_ACCOUNT, formData);
            
            if (data.status === 'success') {
                toast.success(data.message.success);
                const updatedUserData = { ...getInstructor(), ...data?.data?.user}; 
                setCookie('instructor_data', JSON.stringify(updatedUserData));
                dispatch(setInstructorData(updatedUserData));
                setLoading(false);

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


    const initialPasswordValues = {
        current_password: '',
        password: '',
        password_confirmation: ''
    }

    const validationPasswordSchema = () => {
        return Yup.object().shape({
            current_password: Yup.string().required('Current password is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password field is required'),
            password_confirmation: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Password confirmation field is required'),
        });
    }

    const handlePasswordSubmit = async (values, { resetForm }, setPasswordVal) => {
        try {
            const { data } = await request.post(ENDPOINTS.INSTRUCTOR_CHANGE_PASSWORD, values);
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

    return { initialValues, validationSchema, handleSubmit, user, handleAccountSubmit,validationAccountSchema, loading, initialPasswordValues,validationPasswordSchema , handlePasswordSubmit}
}
