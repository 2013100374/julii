"use client";
import { setCookie } from "cookies-next";
import { useState, useEffect } from "react";
import ENDPOINTS from "@/lib/endpoints";
import { getInstructor, notifyToast, request } from "@/lib/helpers";
import { useRouter } from "next/navigation";

export default function useWithdrawalConfirmation() {
    const [withdrawInfo, setWithdrawInfo] = useState({});
    const user = getInstructor();
    const router = useRouter();

    useEffect(() => {
        getWithdrawInfo();
    }, []);

    const getWithdrawInfo = () => {
        const withdrawData = {
            trx: localStorage.getItem('withdraw_trx'),
            withdraw_data: JSON.parse(localStorage.getItem('withdraw_data')),
            form: JSON.parse(localStorage.getItem('form')),
            method: JSON.parse(localStorage.getItem('method')),
        }
        setWithdrawInfo(withdrawData);
    }

    let tempForm = {};
    if (withdrawInfo.form) {
        Object.entries(withdrawInfo.form).forEach(([key, field]) => {
            tempForm[field.label] = '';
        });
        if (user?.ts) {
            tempForm['authenticator_code'] = '';
        }
    }

    const initialValues = tempForm

    const handleSubmit = async (values) => {
        values.trx = withdrawInfo.trx;

        const { data } = await request.post(ENDPOINTS.WITHDRAW_CONFIRM, values);

        if (data.status == 'error') {
            setIsSubmitting(false);
            return false;
        }
        
        notifyToast(data);
        user.balance -= withdrawInfo.withdraw_data.amount;
        setCookie('instructor_data', user);
        router.push('/instructor/withdraw/history');
    }

    return { initialValues, getWithdrawInfo, handleSubmit, withdrawInfo };
}
