import ENDPOINTS from "@/lib/endpoints";
import { fromBase64, getFormData, notifyToast, request } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useManualConfirmation = (deposit) => {
    const router = useRouter();
    const form = deposit?.gateway?.form?.form_data;


    let tempForm = {};

    if (form) {
        Object.entries(form).forEach(([key, field]) => {
            tempForm[field.label] = '';
        });
    }
    const initialValues = tempForm;

    const handleSubmit = async (values, { resetForm }) => {
        
        try {
            values.track = deposit.trx;
            const formData = getFormData(values);
            const { data } = await request.post(ENDPOINTS.MANUAL_DEPOSIT_CONFIRM, formData);
      

            if (data.status === 'success') {
    
                notifyToast(data);
                resetForm();
                localStorage.removeItem('deposit');
               
                router.push(`/user/deposit/history`);
                
            }
        } catch (error) {
            const errors = error.response.data?.errors;
            Object.values(errors).map(e => e[0])?.map(m => toast.error(m));
        }
    };

    return { form, initialValues, handleSubmit };
};