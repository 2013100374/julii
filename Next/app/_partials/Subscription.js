import ENDPOINTS from "@/lib/endpoints";
import { notifyToast, request } from "@/lib/helpers";
import * as Yup from 'yup';

export default function Subscription() {

    const initialValues = {
        email:'',
    }

    const validationSchema = () => {
        return Yup.object().shape({ 
            email: Yup.string().email('Invalid email address').required('Email is required'),
         
        });
    }

    const handleSubmit = async (values, { resetForm }) => {
        
        
        const { data } = await request.post(ENDPOINTS.SUBSCRIPTION, values);
        
        
        if (data.status == 'error') {
            notifyToast(data);
            return false;
        }
        resetForm();
        notifyToast(data);
        return true;
     
    }

    return { initialValues, validationSchema,handleSubmit}
}
