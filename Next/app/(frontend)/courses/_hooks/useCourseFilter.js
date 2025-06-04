import usePaginationParams from '@/app/_hooks/usePaginationParams';
import ENDPOINTS from '@/lib/endpoints';
import { request } from '@/lib/helpers';
import { setCourseData } from '@/store/courseSlice';
import { setFilterData } from '@/store/filterSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useCourseFilter = (slug = null) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [catLoding, setCatLoading] = useState(false);
    const router = useRouter();
    const { pageNumber, setPageNumber }       = usePaginationParams();

    

    // route has query params
    const searchParams = useSearchParams();
    const filter = searchParams.get('search'); // Get query param
  


    const fetchCourses = useCallback(async (values, isGlobal) => {
        setLoading(true);
        setCatLoading(true);
        try {
    
            let queryString = '';
            if (values) {
                queryString = new URLSearchParams(
                    Object.fromEntries(
                        Object.entries(values)
                            .filter(([_, v]) => v?.length)
                            .map(([k, v]) => [k, v.join(',')])
                    )
                ).toString();
            }


            const url = slug
                ? `${ENDPOINTS.ALL_COURSES}/${slug}?page=${pageNumber}&${queryString}`
                : `${ENDPOINTS.ALL_COURSES}?page=${pageNumber}&${queryString}`;

            const { data } = await request.get(url);

            dispatch(setCourseData(data?.data?.courses));
            dispatch(setFilterData(data?.data));
            setCatLoading(false);

            if (isGlobal) {
                saveKeyword(values)
                router.push(`/courses?${queryString}`);
            }

        } catch (error) {
            console.error('Failed to fetch courses', error);
        } finally {
            setLoading(false);
        }
    }, [dispatch,pageNumber,router,slug]);


    const saveKeyword = async (values) => {

    const formData = new FormData();
    Object.keys(values).forEach((key) => {
        formData.append('keyword', values[key]);
    });
        
        try {
            const { data } = await request.post(ENDPOINTS.SAVE_KEYWORD, formData);
            return;

        } catch (error) {
            console.error('Failed to fetch courses', error);
        } 
    };


    useEffect(() => {
        if (!filter) {
           
            
            setLoading(true);
            fetchCourses();
        }
    }, [filter,fetchCourses]); 

    return { fetchCourses, loading, pageNumber, setPageNumber ,setLoading,catLoding };
};

export default useCourseFilter;
