'use client';
import useUtility from '@/app/_hooks/useUtility';

import { frontendImage, showDateTime, sitePrefix } from '@/lib/helpers';
import React from 'react'
import { Image } from 'react-bootstrap';
import RequireSkeleton from './RequireSkeleton';
import Skeleton from '@/app/_partials/_skeletons/Skeleton';
import skillImage from '@/public/images/icon/skill.png';
import watchImage from '@/public/images/icon/watch.png';
import certificateImage from '@/public/images/icon/certificate.png';
import badgeImage from '@/public/images/icon/badge.png';


export default function CourseRequire({ course, content, loading }) {

    const { trans } = useUtility();



    const getImage = (type) => {
        return String(sitePrefix() + "/images/icon/" + type + ".png").replace('//', '/');
    };


    return (

        <>
            {
                loading ? <RequireSkeleton /> :
                    <section className="course-require">
                        <div className="course-require__shape">
                            <Image className="fit-image" src={frontendImage(content?.data_values?.shape, 'course_detail')} alt="img" />
                        </div>
                        <div className="container">
                            <div className="course-require__wrapper">
                                <div className="course-require-item">
                                    <div className="course-require-item__icon">
                                    <Image src={skillImage?.src} alt="sill" />
                                    </div>
                                    <div className="course-require-item__content">
                                        <p className="course-require-item__heading">{trans('Skill level')}</p>
                                        {
                                            course?.level === 1 ? (
                                                <h5 className='course-require-item__title'>{trans(`Beginner Friendly`)}</h5>
                                            ) : course?.level === 2 ? (
                                                <h5 className='course-require-item__title'>{trans(`Intermediate`)}</h5>
                                            ) : (
                                                <h5 className='course-require-item__title'>{trans(`Advanced`)}</h5>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="course-require-item">
                                    <div className="course-require-item__icon">
                                    <Image src={watchImage?.src} alt="watch" />
                                    </div>
                                    <div className="course-require-item__content">
                                        <p className="course-require-item__heading">{trans(`Total complete`)}</p>
                                        <h5 className="course-require-item__title">{course?.total_complete}{trans(` Students`)}</h5>
                                    </div>
                                </div>
                                <div className="course-require-item">
                                    <div className="course-require-item__icon">
                                    <Image src={certificateImage?.src} alt="certificate" />
                                    </div>
                                    <div className="course-require-item__content">
                                        <p className="course-require-item__heading">{trans(`Certificate of completion`)}</p>
                                        <h5 className="course-require-item__title">yes</h5>
                                    </div>
                                </div>
                                <div className="course-require-item">
                                    <div className="course-require-item__icon">
                                    <Image src={badgeImage?.src} alt="badge" />
                                    </div>
                                    <div className="course-require-item__content">
                                        <p className="course-require-item__heading">{trans(`Last updated`)}</p>
                                        <h5 className="course-require-item__title">{showDateTime(course?.updated_at, 'DD MMM YYYY')}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
            }

            {
                loading ?
                    <div className="container pt-50">
                        <div className="course-require__wrapper d-block">
                            <div className="row">
                                <div className="col-md-12">
                                    <Skeleton height={200} />
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    course?.objects?.length > 0 &&
                    <div className="container pt-50">
                        <div className="course-require__wrapper d-block">
                            <h5>{trans(`What you'll learn`)}</h5>
                            <div className="row gy-3">
                                {course?.objects?.map((objective, index) => (
                                    <div className="col-md-6" key={index}>
                                        <p className='courser-requier-item'>
                                            <i className='las la-check'></i>
                                            {objective?.object}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
            }
        </>

    )
}
