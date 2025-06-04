"use client";
import { setCookie } from "cookies-next";
import { useState, useEffect, useCallback } from "react";
import ENDPOINTS from "@/lib/endpoints";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getFormData, getUser, request } from "@/lib/helpers";

export default function useKYC() {
    const [kycForm, setKycForm] = useState(null);
    const router = useRouter();
    const user = getUser();

    const getKycForm = useCallback(async () => {
        const { data } = await request.get(ENDPOINTS.KYC_FORM);

        if (data.status == 'error') {
            toast.error(data.message.error);
            router.push('/user/dashboard');
            return;
        }
        setKycForm(data.data.form);
    }, [router]);

    useEffect(() => {
        getKycForm();
    }, [getKycForm]);

    let tempForm = {};

    if (kycForm) {
        Object.entries(kycForm).forEach(([key, field]) => {
            tempForm[field.label] = '';
        });
    }

    const initialValues = tempForm;

    const handleSubmit = async (values, { resetForm }) => {
        const formData = getFormData(values);

        try {
            const { data } = await request.post(ENDPOINTS.KYC_SUBMIT, formData);

            if (data.status === 'success') {
                toast.success(data.message.success);
                const updatedUserData = { ...user, kyc_rejection_reason: null, kv: 2 };
                setCookie('user_data', JSON.stringify(updatedUserData));
                resetForm();
                router.push('/user/dashboard');
            } else if (data.status === 'error') {
                data.message.error.forEach(message => {
                    toast.error(message);
                });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('An error occurred while updating your profile');
        }
    }

    return { kycForm, initialValues, handleSubmit }
}
