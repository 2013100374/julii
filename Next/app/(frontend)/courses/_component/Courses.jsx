'use client'
import React, { useState } from 'react'
import Filter from './Filter'

import useUtility from '@/app/_hooks/useUtility';
import useCourseFilter from '../_hooks/useCourseFilter';
import { useSelector } from 'react-redux';

import CourseCard from '@/app/_partials/CourseCard';
import Trending from './Trending';
import CourseSkeleton from './CourseSkeleton';
import Pagination from '@/app/_partials/Pagination';
import Image from 'next/image';
import NodataImage from '@/public/images/no-data.png';

export default function Courses({ slug }) {

    const { trans } = useUtility();

    const { loading, setLoading, catLoding } = useCourseFilter(slug);

    const { data: courses } = useSelector((state) => state?.course);
    const [showSidebar, setShowSiteBar] = useState(false);


    const toggleSidenav = () => setShowSiteBar(!showSidebar);

    return (
        <>
            <Filter slug={slug} courses={courses} showSidebar={showSidebar} toggleSidenav={toggleSidenav} setLoading={setLoading} />
            <div className="courses-list-body pb-5">
                <div className="course-filter-header">
                    <span onClick={toggleSidenav} className="courses-sidebar-show d-lg-none"><i className="las la-sliders-h"></i></span>
                    <h3 className="courses-list-body-title">{trans(`Explore The Catalog`)}</h3>
                </div>
                <Trending loading={catLoding} />

                <div className="all-courses">
                    <h5 className="all-courses__title">{trans(`Available Courses`)}</h5>
                    <div className="row gy-4">
                        {
                            loading ? (
                                <CourseSkeleton countCourse={21} />
                            ) :
                                (courses?.data?.length > 0 ? (courses?.data?.map((course, index) => (
                                    <div key={index} className="col-xl-4 col-sm-6">
                                        <CourseCard course={course} />
                                    </div>
                                ))) : (
                                    <div className="col-12">
                                        <div className="nodata-found">
                                            <Image
                                                src={NodataImage}
                                                alt="payment-thumb"
                                                width={100}
                                                height={100}
                                            />
                                            <p className="text-muted fw-semibold">{trans(`No available courses`)} </p>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>

                    <div className="mt-3">
                        <Pagination loading={loading} pagination={courses} />
                    </div>


                </div>
            </div>
        </>
    )
}
