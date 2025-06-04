
import { getCourseDetails, notifyToast, request } from '@/lib/helpers';
import toast from 'react-hot-toast';
import ENDPOINTS from '@/lib/endpoints';
import { number, object, string, array  } from 'yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseData } from '@/store/courseSlice';



const useContentHandler = (slug = null) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { data: courseData } = useSelector((state) => state?.course);



    const initialValues = {
        title: courseData?.title ?? '',
        subtitle: courseData?.subtitle ?? '',
        description: courseData?.description ?? '',
        category_id: courseData?.category_id ?? '',
        sub_category_id: courseData?.sub_category_id ?? '',
        level: courseData?.level ?? '',
        image: '',
        intro: '',
        course_duration: ''
    };
    const contentValidationSchema = object().shape({
        title: string().required('Title is required'),
        subtitle: string().required('Subtitle is required'),
        description: string().required('Description is required'),
        category_id: string().required('Category is required'),
        sub_category_id: string().required('Subcategory is required'),
        level: string().required('Level is required'),
        course_duration:string().required('Course duration is required'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true);
       
        try {

            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("subtitle", values.subtitle);
            formData.append("image", values.image);
            formData.append("intro", values.intro);
            formData.append("category_id", values.category_id);
            formData.append("sub_category_id", values.sub_category_id);
            formData.append("level", values.level);
            formData.append("description", values.description);
            formData.append("course_duration", values.course_duration);


            const { data } = await request.post(`${ENDPOINTS.ADD_CONTENT}/${slug}`, formData);

            if (data.status === 'error') {
                notifyToast(data);
                return;
            }

            const course = await getCourseDetails(slug);
            
            dispatch(setCourseData(course));
            resetForm();
            toast.success('Course content save  successfully')


        } catch (error) {
            toast.error('Failed to save course content. Please try again.');
        } finally {
            setLoading(false);
        }
    };




    const initialPricingValues = {
        price: courseData?.price  ?? '',
        discount: courseData?.discount  ?? '',
        duration: courseData?.duration  ?? '',
        discount_type: courseData?.discount_type  ?? '' ,
    };



    const priceValidationSchema = object().shape({
        price: number()
            .required('Price is required')
            .min(0, 'Price must be at least 0'),
        discount: number()
            .nullable().min(0, 'Discount must be at least 0'),
        duration: string().nullable(),
        discount_type: string().nullable(),
    });



    const handlePricingSubmit = async (values, { resetForm }) => {
        setLoading(true);
        
        try {

            const { data } = await request.post(`${ENDPOINTS.ADD_PRICE}/${slug}`, values);


            if (data.status === 'error') {
                notifyToast(data);
                return;
            }

            const course = await getCourseDetails(slug);
            dispatch(setCourseData(course));
            resetForm();
            toast.success('Course Price save  successfully')

        } catch (error) {
            toast.error('Failed to save course message. Please try again.');
        } finally {
            setLoading(false);
        }
    };



    

    const initialMessageValues = {
        welcome_message: courseData?.welcome_message  ?? '',
        congrats_message: courseData?.congrats_message  ?? '',
    };



    const messageValidationSchema = object().shape({
        welcome_message: string().optional(true),
        congrats_message: string().required(true),
    });

    const handleMessageSubmit = async (values, { resetForm }) => {
        setLoading(true);
        try {
            const { data } = await request.post(`${ENDPOINTS.ADD_MESSAGE}/${slug}`, values);

            if (data.status === 'error') {
                notifyToast(data);
                return;
            }

            const course = await getCourseDetails(slug);
            dispatch(setCourseData(course));
            resetForm();
            toast.success('Course Message save  successfully')

        } catch (error) {
            toast.error('Failed to save course content. Please try again.');
        } finally {
            setLoading(false);
        }
    };





    const initialIntendedValues = {
        object: '',
        requirement: '',
        content: '',
    };

    const intendedValidationSchema = object().shape({
        object: array().of(string().optional()), 
        requirement: array().of(string().optional()), 
        content: array().of(string().optional()), 
      });

    const handleIntendedSubmit = async (values, { resetForm }) => {
    
        setLoading(true);
        try {

            const { data } = await request.post(`${ENDPOINTS.ADD_INTENDED_LEARNERS}/${slug}`, values);

            if (data.status === 'error') {
                notifyToast(data);
                return;
            }

            const course = await getCourseDetails(slug);

            dispatch(setCourseData(course));
            resetForm();
            toast.success('Course intended saved  successfully')

        } catch (error) {
            toast.error('Failed to save course content. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    

    const handleDeleteResource = async (resourceId) =>{
        setLoading(true);
        try {

            const { data } = await request.get(`${ENDPOINTS.DELETE_RESOURCE}/${resourceId}`);

            if (data.status === 'error') {
                notifyToast(data);
                return;
            }

            const course = await getCourseDetails(slug);
            dispatch(setCourseData(course));
            toast.success('Course Resource deleted successfully')

        } catch (error) {
      
            
            toast.error('Failed to delete resource. Please try again.');
        } finally {
            setLoading(false);
        }

    }

    const resourcesDownload = async (resourceId) => {
  
        const response = await request.get(ENDPOINTS.INSTRUCTOR_RESOURCES_DOWNLOAD + `/${resourceId}`, {
            responseType: 'blob'
        });

        const contentType = response.headers['content-type'] || 'application/octet-stream';
        
        const extension = contentType.split('/')[1] || 'file';
        const name = `resource-${Math.floor(Math.random() * 1000)}.${extension}`;

        const fileBlob = new Blob([response.data], { type: contentType });
        
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(fileBlob);
        link.download = name;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }




    


    return {
        initialValues,
        contentValidationSchema,
        handleSubmit,
        initialPricingValues,
        priceValidationSchema,
        handlePricingSubmit,
        initialMessageValues,
        messageValidationSchema,
        handleMessageSubmit,
        initialIntendedValues,
        intendedValidationSchema,
        handleIntendedSubmit,
        loading,
        handleDeleteResource,
        resourcesDownload
    };
}



export default useContentHandler;