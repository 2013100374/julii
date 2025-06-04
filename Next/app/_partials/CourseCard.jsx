import React from 'react'
import useUtility from '../_hooks/useUtility';
import Link from 'next/link';
import { Image } from 'react-bootstrap';
import { getCourseImage, strLimit } from '@/lib/helpers';
import Rating from './Rating';

export default function CourseCard({ course }) {
    const { trans ,showAmount} = useUtility();
    return (
      
            <div className="card courses-card">
                <div className="card-img">
                    <Image className="fit-image" src={getCourseImage(course?.image_path, course?.image)} alt={trans(course?.title)} />
                </div>
                <div className="card-body">
                    <h6 className="courses-card__title"><Link href={`/course-details/${course?.slug}`}>{trans(course?.title)}</Link></h6>
                    <div className="rating">
                        <div className="rating__wrapper">
                            <Rating rating={course?.ratings?.avg_rating }/>
                            <div className="rating__count">
                                <span className="rating__average">{course?.ratings?.avg_rating}/</span>
                                <span className="rating__total">{`(${course?.ratings?.total_reviews})`}</span>
                            </div>
                        </div>
                    </div>
                    <div className="courses-card__info">
                        <div className="courses-price">

                            {
                                course?.discount_price > 0 ? (
                                    <>
                                        <span className="offer-price">{showAmount(course?.price - course?.discount_price)}</span>
                                        <span className="old-price">{showAmount(course?.price)}</span>
                                    </>
                                ) : (
                                    <span className="offer-price">{showAmount(course?.price)}</span>
                                )
                            }


                        </div>
                        <p className="courses-duration">{course?.course_duration}{trans(` Hours`)}</p>
                    </div>
                  
                    <p className="courses-card__desc" dangerouslySetInnerHTML={{ __html: strLimit(course?.description ? course?.description : 'N/A' , 100) }}>

                    </p>
                </div>
                <div className="card-footer">
                    <div className="courses-type">
                        <span className="icon"><i className="lab la-battle-net"></i></span>
                        <p><span className="text">
                            {
                                course?.level === 1 ? (
                                    <span>{trans(`Beginner`)}</span>
                                ) : course?.level === 2 ? (
                                    <span >{trans(`Intermediate`)}</span>
                                ) : course?.level === 3 ? (
                                    <span>{trans(`Advanced`)}</span>
                                ) :
                                (
                                    <span>{trans(`N/A`)}</span>
                                )
                            }

                        </span>{trans(` Level`)}</p>
                    </div>
                    <p className="courses-lesson"><span className="text">{course?.sections?.length ?? 0}</span> {trans(`Section`)}</p>
                </div>
            </div>
      
    )
}
