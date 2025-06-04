import useUtility from '@/app/_hooks/useUtility';
import Link from 'next/link';
import React from 'react'
import HeaderSkeleton from './HeaderSkeleton';


export default function CourseHeader({ course, loading }) {
    const { trans } = useUtility();
    return (
        <>

            {
                loading ? <HeaderSkeleton />
                    :
                    <section className="course-watch-banner bg-img py-50">
                        <div className="container">
                            <Link href="/user/dashboard" className="d-sm-none back-to-home"><span><i className="fas fa-arrow-left"></i></span> {trans(`Back To Home`)}</Link>
                            <div className="course-watch-banner__wrapper">
                                <div className="course-watch-banner__content">
                                    <Link href="/user/dashboard" className="d-none d-sm-flex back-to-home">
                                        <span><i className="las la-arrow-left"></i></span>{trans(`Back To Home`)}
                                    </Link>
                                    <h5 className="course-watch-banner__title">{course?.title}</h5>
                                    <ul className="course-watch-banner__modulelist">
                                        <li className="course-watch-banner__moduleitem">
                                            <span className="icon"><i className="far fa-folder"></i></span>
                                            <span className="text">{course?.sections?.length ?? 0} {trans(`sections`)}</span>
                                        </li>
                                        <li className="course-watch-banner__moduleitem">
                                            <span className="icon"><i className="far fa-file-alt"></i></span>
                                            <span className="text">{course?.lectures?.length ?? 0} {trans(`lectures`)}</span>
                                        </li>
                                        <li className="course-watch-banner__moduleitem">
                                            <span className="icon"><i className="far fa-clock"></i></span>
                                            <span className="text">{course?.total_duration} {trans(`total length`)}</span>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </section>
            }
        </>





    )
}
