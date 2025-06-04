"use client";
import { setCookie } from "cookies-next";
import { useState, useEffect, useCallback } from "react";
import ENDPOINTS from "@/lib/endpoints";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getFormData, getInstructor,request } from "@/lib/helpers";

export default function useKYC() {
    const [kycForm, setKycForm] = useState(null);
    const router = useRouter();
    const user = getInstructor();

    const getKycForm = useCallback(async () => {
        const { data } = await request.get(ENDPOINTS.INSTRUCTOR_KYC_FORM);

        if (data.status == 'error') {
            toast.error(data.message.error);
            router.push('/instructor/dashboard');
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
            const { data } = await request.post(ENDPOINTS.INSTRUCTOR_KYC_SUBMIT, formData);

            if (data.status === 'success') {
                toast.success(data.message.success);
                const updatedUserData = { ...user, kyc_rejection_reason: null, kv: 2 };
                setCookie('instructor_data', JSON.stringify(updatedUserData));
                resetForm();
                router.push('/instructor/dashboard');
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
