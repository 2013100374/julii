import ENDPOINTS from "@/lib/endpoints";
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { getInstructor, request } from '@/lib/helpers';

export default function useWithdrawal() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const user = getInstructor();

    const initialValues = {
        amount: '',
    };

    const router = useRouter();

    const handleSubmit = async (values, { resetForm }, amount,selectWithdrawMethod) => {
        setIsSubmitting(true);
        if(!amount || amount <= 0){
            toast.error('Please enter an amount');
            setIsSubmitting(false);
            return;
        }
        if(!selectWithdrawMethod){
            toast.error('Please select a withdrawal method');
            setIsSubmitting(false);
            return;
        }
        
        if(amount < parseFloat(selectWithdrawMethod.min_limit)){
            toast.error('Amount is less than minimum limit');
            setIsSubmitting(false);
            return;
        }
        if(amount > parseFloat(selectWithdrawMethod.max_limit)){
            toast.error('Amount is greater than maximum limit');
            setIsSubmitting(false);
            return;
        }

        if(amount > user?.balance){
            toast.error('Insufficient balance');
            setIsSubmitting(false);
            return;
        }

        let charge = parseFloat(selectWithdrawMethod.fixed_charge) + (amount * parseFloat(selectWithdrawMethod.percent_charge)) / 100;
        let afterCharge = amount - charge;
        if(afterCharge < 0){
            toast.error('Withdraw amount must be sufficient for charges');
            setIsSubmitting(false);
            return;
        }

        values = {
            amount: amount,
            method_code: selectWithdrawMethod.id,
        }

        const { data } = await request.post(ENDPOINTS.WITHDRAW_REQUEST, values);

        if(data.status == 'error'){
            data.message.error.forEach(message => {
                toast.error(message);
            });
            setIsSubmitting(false);
            return false;
        }

        resetForm();
        setIsSubmitting(false);
        
        localStorage.setItem('withdraw_trx',data.data.trx);
        localStorage.setItem('withdraw_data',JSON.stringify(data.data.withdraw_data));
        localStorage.setItem('form',JSON.stringify(data.data.form));
        localStorage.setItem('method',JSON.stringify(selectWithdrawMethod));

        router.push('/instructor/withdraw/confirmation');
    };

    return { initialValues, handleSubmit, isSubmitting };
}
