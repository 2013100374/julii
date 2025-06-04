"use client";

import { useState, useEffect } from 'react';
import { object, string } from 'yup';
import { useRouter } from 'next/navigation';
import { getCountries, notifyToast, request, sitePrefix } from '@/lib/helpers';
import toast from 'react-hot-toast';
import { setCookie } from 'cookies-next';
import ENDPOINTS from '@/lib/endpoints';
import { setUserData } from "@/store/userSlice";
import { useDispatch } from 'react-redux';

const useProfileHandler = () => {
    const dispatch = useDispatch();
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [initialValues, setInitialValues] = useState({
        username: '',
        country: '',
        mobile: '',
        mobile_code: '',
        country_code: '',
        address: '',
        state: '',
        zip: '',
        city: '',
    });

    useEffect(() => {
        const fetchCountries = async () => {
            const countriesData = await getCountries();
            setCountries(countriesData.data.countries);

            if (countriesData.data.countries.length > 0) {
                const firstCountry = countriesData.data.countries[0]; 
                setInitialValues((prevValues) => ({
                    ...prevValues,
                    country: firstCountry.country,
                    country_code: firstCountry.country_code,
                    mobile_code: firstCountry.dial_code,
                })); 
            }
        };

        fetchCountries();
    }, []);

    const validationSchema = object().shape({
        username: string().required('Username is required'),
        country: string().required('Country is required'),
        mobile: string().required('Mobile number is required')
    });

    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true);
        try {
            const { data } = await request.post(ENDPOINTS.UPDATE_USER_DATA, values);

            if (data.status === 'error') return notifyToast(data); 

            if(data.remark == "already_completed") {
                router.refresh();
                setCookie('is_logged_in', false);
                setCookie('access-token', null); 
                setCookie('user_data', null); 
                router.push('/login');
            }

            const updatedUserData = data.data.user;
            dispatch(setUserData(updatedUserData));
            setCookie('user_data', JSON.stringify(updatedUserData));

            toast.success('Profile updated successfully');
            window.location.reload();
            resetForm();
        } finally {
            setLoading(false);
        }
    };

    return {
        initialValues,
        validationSchema,
        handleSubmit,
        countries,
        loading
    };
};

export default useProfileHandler;
