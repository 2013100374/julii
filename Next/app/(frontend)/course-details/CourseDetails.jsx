'use client';
import useUtility from '@/app/_hooks/useUtility'

import CourseRequire from './_component/CourseRequire';
import CourseAbout from './_component/CourseAbout';
import { useSection } from '@/app/_partials/_sections/_hooks/useSection';
import { frontendImage, getCourseImage, getInstructor, getProfileImage } from '@/lib/helpers';
import Syllabus from './_component/Syllabus';
import Link from 'next/link';
import useCourseDetailHandler from './_hooks/useCourseDetailHandler';

import Rating from '@/app/_partials/Rating';
import { Image } from 'react-bootstrap';
import CourseDetailSkeleton from './_component/CourseDetailSkeleton';
import notFound from '@/app/not-found';




export default function CourseDetails({ slug }) {

    const { trans, showAmount } = useUtility();
    const { content } = useSection('course_detail');

    const instructor = getInstructor();

    const { course, loading, isEnroll } = useCourseDetailHandler(slug);

    if (course?.status == 'error') {
        return notFound();
    }
    if (course && course?.status != 1 && !instructor) {
        return notFound();
    }

    return (
        <>
            {
                loading ? <CourseDetailSkeleton /> :
                    <section className="course-banner py-50 bg-img" data-background-image={frontendImage(content?.data_values?.shape, 'course_detail')}>
                        <div className="container">
                            <div className="course-wrapper">
                                <div className="row gy-4 align-items-center justify-content-between flex-lg-row-reverse">
                                    <div className="col-xl-4 col-lg-5">
                                        <div className="course-thumb">
                                            <Image className="fit-image" src={getCourseImage(course?.image_path, course?.image)} alt="course-image" />

                                        </div>
                                    </div>
                                    <div className="col-lg-7">
                                        <span className="course-category">{trans(course?.category?.name)}</span>
                                        <div className="course-content">
                                            <h2 className="course-content__title">{trans(course?.title)}</h2>
                                            <p className="course-content__desc">{trans(course?.subtitle)}</p>
                                        </div>

                                        <div className="course-info-wrapper">
                                            <div className="rating">
                                                <div className="rating__wrapper">
                                                    <Rating rating={course?.ratings?.avg_rating} />
                                                    <div className="rating__count">
                                                        <span className="rating__average text-white">{course?.ratings?.avg_rating} /</span>
                                                        <span className="rating__total">{`(${course?.ratings?.total_reviews})`}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="courses-details-price">
                                                {
                                                    course?.discount_price > 0 ? (
                                                        <>
                                                            <span className="details-old-price">{showAmount(course?.price - course?.discount_price)}</span>

                                                            <span className="details-offer-price ms-1"><del>{showAmount(course?.price)}</del></span>
                                                        </>
                                                    ) : (
                                                        <span className="details-old-price">{showAmount(course?.price)}</span>
                                                    )
                                                }
                                            </div>
                                        </div>

                                        <div className="course-content-footer">

                                            {!isEnroll && <Link href={`/user/course-purchase/${course?.slug}`} className="flex-shrink-0 btn btn--warning btn--white-shadow">{trans(`Enroll now`)}</Link>}


                                            <Link href={`/profile/${course?.instructor?.username}`} className="course-learners">
                                                <ul className="course-learners__group">
                                                    <li className="course-learners__item ">
                                                        <Image className="fit-image" src={getProfileImage(course?.instructor?.profile_path, course?.instructor?.image)} alt="student" />
                                                    </li>
                                                </ul>

                                                <div className="course-learners__count">
                                                    {trans(course?.instructor?.firstname + ' ' + course?.instructor?.lastname)}
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
            }

            <CourseRequire course={course} content={content} loading={loading} />
            <Syllabus course={course} enrolled={isEnroll} loading={loading} />
            <CourseAbout course={course} loading={loading} />

        </>
    )
}
