
import { notifyToast, request } from '@/lib/helpers';
import ENDPOINTS from '@/lib/endpoints';
import { useEffect, useState,useCallback } from 'react';
import { setUserProgress } from '@/store/userSlice';
import { useRouter } from 'next/navigation';
import { array, number, object, string } from 'yup';
import { useDispatch } from 'react-redux';
import { setCourseData } from '@/store/courseSlice';
import { setReviewData } from '@/store/reviewSlice';



const useWatchHandler = (slug = null) => {

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [enrollUsers, setEnrollUsers] = useState(false);
    
    const dispatch = useDispatch();
    const [submitReview, setSubmitReview] = useState(false);


   
    const watchCourse =  useCallback(async () => {
        if (!slug) return;

        try {
            setLoading(true);
            const { data } = await request.get(`${ENDPOINTS.WATCH_COURSE}/${slug}`);

            if (data.status === 'error') {
                return setCourse(data);
            }
      
                setCourse(data?.data?.course);
                
                setEnrollUsers(data?.data?.enrolled_users);
                dispatch(setReviewData(data?.data?.course?.reviews));
               dispatch(setCourseData(data?.data?.course));
               dispatch(setUserProgress(data.data?.course?.progress));
            

        } catch (error) {
            console.error("Failed to fetch courses", error);
        } finally {
            setLoading(false);
        }
    }, [slug,dispatch,setCourse,setEnrollUsers ]);

    
    useEffect(() => {
        if (slug) {
            watchCourse();
        }
    }, [slug,watchCourse]);



    const completeCurriculum = async (id) => {
        const { data } = await request.post(`${ENDPOINTS.COMPLETE_CURRICULUM}/${id}`);

        if (data.status === 'error') {
            notifyToast(data);
        }

        if (data.status === 'success') {
            dispatch(setUserProgress(data.data?.percentage));
        }

    };


    const initialQuestionValues = {
        quiz_id: '',
        answers: ''
    }

    const quizValidationSchema = object().shape({
        quiz_id: string().required('Quiz Id is required'),
        answers: array().required('Answers is required')
    });

    
    const handleQuizSubmit = async (values, { resetForm }) => {
        setLoading(true);
        try {
            const response = await request.post(ENDPOINTS.QUIZ_SUBMIT, values);
            if (response.data.status === 'success') {
                submitActivity();
                setLoading(false);
                resetForm();
                notifyToast(response.data);
                router.push(`/user/quiz/${response?.data?.data?.quiz?.id}`);

            } else {
                setLoading(false);
                notifyToast(response.data);
            }
        } catch (error) {
            setLoading(false);
            console.error('Error submitting quiz:', error);
        }
    };


    const resourcesDownload = async (resourceId) => {
  
        const response = await request.get(ENDPOINTS.RESOURCES_DOWNLOAD + `/${resourceId}`, {
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



    const submitActivity = async () => {
        const { data } = await request.post(ENDPOINTS.USER_ACTIVITY);
        if (data.status ==='success') {
            return;
        } 
        return

    }


    const initialReviewValues = {
        rate_value: '',
        user_comment:''

    }

    const reviewValidationSchema = object().shape({
        rate_value: number().required('Rate value is required'),
    
    });

    
    const handleReviewSubmit = async (values, { resetForm }) => {
        
        setLoading(true);
        try {
            const response = await request.post(ENDPOINTS.SUBMIT_REVIEW+'/'+slug, values);
            if (response.data.status === 'success') {
         
                dispatch(setCourseData(response?.data?.data.course));
                dispatch(setReviewData(response?.data?.data?.course_review));
                setSubmitReview(true)
                setLoading(false);
                resetForm();
            } else {
                setLoading(false);
                notifyToast(response.data);
            }
        } catch (error) {
            setLoading(false);

            console.error('Error submitting review:', error);
        }
    };


    return { course, loading, completeCurriculum ,
        setCourse, handleQuizSubmit,initialQuestionValues,
        quizValidationSchema,loading,resourcesDownload,submitActivity,
        initialReviewValues, reviewValidationSchema, handleReviewSubmit,submitReview, enrollUsers,setSubmitReview

    };

}

export default useWatchHandler;