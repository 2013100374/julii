"use client";
import { fromBase64, notifyToast, request } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useCardPayment(endPoint) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (values, { resetForm }) => {


        try {
            setLoading(true);
            const { data } = await request.post(endPoint, values);


            if (data?.status == 'success') {
                notifyToast(data);

                let deposit = JSON.parse(fromBase64(localStorage.getItem('deposit')));

                localStorage.removeItem('gatewayData');
                localStorage.removeItem('deposit');
                localStorage.removeItem('course');
                resetForm();

                if (deposit?.course_id) {
                    router.push(deposit?.success_url)
                } else {
                    router.push(`/user/deposit/history`);
                }
            } else if (data?.status == 'error') {
                notifyToast(data);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { handleSubmit, loading };
}