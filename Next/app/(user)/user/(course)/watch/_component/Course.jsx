'use client';
import React, { useState } from 'react'

import CourseBody from './CourseBody'
import CourseSideBar from './CourseSideBar'


import CourseHeader from './CourseHeader';
import useWatchHandler from '../_hooks/useWatchHandler';

import { useSelector } from 'react-redux';
import { notFound } from 'next/navigation';

export default function Course({ slug }) {
    const { course, loading, enrollUsers } = useWatchHandler(slug);
    const [playLecture, setPlayLecture] = useState();
    const [percentComplete, setPercentComplete] = useState(0);

    const [showSidebar,setShowSiteBar] = useState(false);

    // toggleSidenav
    const toggleSidenav = () => setShowSiteBar(!showSidebar);
    
    const { data: courseData } = useSelector((state) => state?.course);
    
    if (course?.status == 'error') {
     return notFound();
    }

    return (
        <>
            <CourseHeader course={courseData} loading={loading} />
            <section className="courses py-50">
                <div className="container">
                    <div className="courses-main-wrapper">
                        <CourseBody course={courseData} playLecture={playLecture}  enrollUsers={enrollUsers} setPercentComplete={setPercentComplete} toggleSidenav={toggleSidenav} loading={loading}  />
                        <CourseSideBar course={course} setPlayLecture={setPlayLecture} playLecture={playLecture} percentComplete={percentComplete} toggleSidenav={toggleSidenav} showSidebar={showSidebar} load={loading} />
                    </div>
                </div>
            </section>
        </>
    )
}
