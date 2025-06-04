import { useState } from 'react';
import toast from 'react-hot-toast';
import ENDPOINTS from '@/lib/endpoints';
import { useRouter } from 'next/navigation';
import { notifyToast, request, toBase64 } from '@/lib/helpers';


export default function useDeposit() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();


    const initialValues = {
        amount: 0,
        course_id: 0,
        course_slug: '',
    }

    const handleSubmit = async (values, { resetForm }, amount, course, selectDepositMethod, couponCode = null) => {
        
        
        setIsSubmitting(true);
        if (!amount || amount < 0) {
            toast.error('Please enter an amount');
            setIsSubmitting(false);
            return;
        }
        if (!selectDepositMethod) {
            toast.error('Please select a deposit method');
            setIsSubmitting(false);
            return;
        }

        if (amount < parseFloat(selectDepositMethod.min_amount)) {
            toast.error('Amount is less than minimum limit');
            setIsSubmitting(false);
            return;
        }
        if (amount > parseFloat(selectDepositMethod.max_amount)) {
            toast.error('Amount is greater than maximum limit');
            setIsSubmitting(false);
            return;
        }

        let base = process?.env?.NEXT_PUBLIC_AUTH_PREFIX || "/";

        if (base !== "/") {
            base += "/";
        }

        values = {
            amount: amount,
            course_id: course?.id,
            method_code: selectDepositMethod.method_code,
            currency: selectDepositMethod.currency,
            coupon_code: couponCode,
            success_url: `${window.location.origin}${base}user/watch/${course?.slug}`,
            failed_url: `${window.location.origin}${base}user/course-details/${course?.slug}`,
            is_web: 1

        }


        const { data } = await request.post(ENDPOINTS.PAYMENT_REQUEST, values);

        if (data.status == 'error') {
            notifyToast(data);
            setIsSubmitting(false);
            return false;
        }

        if (data.data?.gateway_data?.error) {
            toast.error(data.data?.gateway_data?.message);
            setIsSubmitting(false);
            return;
        }

        if (data.data?.gateway_data?.redirect) {
            return router.push(data.data?.gateway_data?.redirect_url);
        }

        localStorage.setItem('gatewayData', toBase64(JSON.stringify(data.data.gateway_data)));
        localStorage.setItem('deposit', toBase64(JSON.stringify(data.data.deposit)));
        localStorage.setItem('course', toBase64(JSON.stringify(course)));
        setIsSubmitting(false);
        resetForm();
        if (data.remark == 'payment_inserted') {
            const successUrl = data.data?.deposit?.success_url;
            return router.push(successUrl);
        }


        if(data.data?.deposit?.course_id){
            router.push(`/user/payment/confirmation`)
        }else{
            router.push(`/user/deposit/confirmation`);
        }
    }
    return { initialValues, handleSubmit, isSubmitting }
}
