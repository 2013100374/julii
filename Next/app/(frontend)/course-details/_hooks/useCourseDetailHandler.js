import { getInstructor, request } from '@/lib/helpers';
import ENDPOINTS from '@/lib/endpoints';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useCourseDetailHandler = (slug = null) => {
    const [course, setCourse] = useState(null);
    const [isEnroll, setIsEnroll] = useState(false);
    const [enrollUsers, setEnrollUsers] = useState(false);



    const [loading, setLoading] = useState(false);

    const { data: userData } = useSelector((state) => state?.user);


    const courseDetails = useCallback(async () => {
        if (!slug) return;

        try {
            setLoading(true);
            const userId = userData?.id ? `?user_id=${userData.id}` : "";

            const { data } = await request.get(`${ENDPOINTS.DETAIL}/${slug}${userId}`);



            if (data.status === 'error') {
                return setCourse(data);
            }


            
            setCourse(data?.data?.course);
            setEnrollUsers(data?.data?.enrolled_users)


            if (userData?.id) {
                setIsEnroll(data.data.enroll_course);
            }


        } catch (error) {
            console.error("Failed to fetch courses", error);
        } finally {
            setLoading(false);
        }
    }, [slug, userData]);

    useEffect(() => {
        if (slug) {
            courseDetails();
        }
    }, [slug, userData, courseDetails]);


    return {
        courseDetails,
        course,
        loading,
        isEnroll,
        enrollUsers
    };
};

export default useCourseDetailHandler;
