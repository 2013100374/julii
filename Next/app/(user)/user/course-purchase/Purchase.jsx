'use client'


import React from 'react';

import Skeleton from 'react-loading-skeleton';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Deposit } from '@/app/(user)/user/(deposit)/_components/Deposit';
import useCourseDetailHandler from '@/app/(frontend)/course-details/_hooks/useCourseDetailHandler';

export default function Purchase({ slug }) {


    const { course, loading, isEnroll } = useCourseDetailHandler(slug);

 
    
    const router = useRouter();

    const { data: instructorData } = useSelector((state) => state?.instructor);
    
    if (isEnroll) {
        router.push('/course-details/'+ course?.slug);
        toast.success('You have already enrolled in this course.');
    }


    
    return (
        <div className="container py-100">
            <div className="course-require__wrapper d-block">
                <div className="row justify-content-center m-0">
                    <div className="col-lg-12">
                        <div className="gateway-card">
                            <Deposit course={course} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
