'use client'
import useUtility from '@/app/_hooks/useUtility';

import React from 'react'


export default function CourseAbout({ course }) {



    const { trans } = useUtility();


    return (

        <section className="about-courses pb-50">
            <div className="container">
                <div className="course-require__wrapper d-block">
                    <div className="row gy-4 align-items-center">
                        {
                            course?.requirements?.length > 0 &&
                            <div className="col-md-12">
                                <div className="about-courses-content">
                                    <h5 className="about-courses__title">{trans(`Requirements`)}</h5>
                                    <ul>
                                        {course?.requirements?.map((req, index) => (
                                            <li key={index} className='pb-2' > {req?.requirement}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        }


                        <div className="col-md-12">
                            <div className="about-courses-content">
                                <h5 className="about-courses__title">{trans(`Description`)}</h5>
                                <p className="about-courses__desc " dangerouslySetInnerHTML={{ __html: course?.description }}></p>
                            </div>
                        </div>

                        {
                            course?.contents?.length > 0 &&
                            <div className="col-md-12">
                                <div className="about-courses-content">
                                    <h5 className="about-courses__title">{trans(`Who this course is for:`)}</h5>
                                    <ul>
                                        {course?.contents?.map((item, index) => (
                                            <li key={index} className='pb-2' > {item?.content}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </section>
    )
}
