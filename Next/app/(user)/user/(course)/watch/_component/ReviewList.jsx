'use client'
import useUtility from '@/app/_hooks/useUtility';
import Rating from '@/app/_partials/Rating';
import { diffForHumans, getProfileImage } from '@/lib/helpers';
import React from 'react'
import { Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function ReviewList() {
    const { data: reviews } = useSelector((state) => state?.reviews);
     const { trans } = useUtility();

     
  return (
    <>
    <h5 className="course-comment__title">{trans(`Review`)}{`(${reviews?.length ?? 0})`} </h5>

    {
        reviews?.map((review, index) => (

            <div key={index} className="comment-item-block">
                <div className="comment-item">
                    <div className="comment-item__thumb">
                        <Image className="fit-image" src={getProfileImage(review?.user?.profile_path, review?.user?.profile_image)} alt="comment" />
                    </div>
                    <div className="comment-item__content">
                        <div className="comment-item__top">
                            <p className="comment-item__name">{trans(review?.user?.username)}</p>
                            <div className="stars rating__icon">
                                   <Rating rating={review?.rating }/>
                                </div>
                            <span>•</span>
                            <span className="comment-item__date">{diffForHumans(review?.created_at)}</span>
                        </div>
                        <p className="comment-item__text">{trans(review?.comment)} </p>
                      
                    </div>
                </div>

                {
                review?.instructor_answer &&                                        
                <div className="comment-reply-block">
                    <div className="comment-item reply">
                        <div className="comment-item__thumb">
                            <Image className="fit-image" src={getProfileImage(review?.instructor?.profile_path, review?.instructor?.image)} alt="comment"/>
                        </div>
                        <div className="comment-item__content">
                            <div className="comment-item__top">
                                <p className="comment-item__name">{review?.instructor?.firstname +' '+review?.instructor?.lastname}<span
                                    className="comment-item__badge">{trans(`instructor`)}</span></p>
                                <span>•</span>
                                <span className="comment-item__date">{diffForHumans(review?.instructor_reply_date)}</span>
                            </div>
                            <p className="comment-item__text">{trans(review?.instructor_answer)}</p>
                        </div>
                    </div>
                </div>
                }
            </div>

        ))
    }
    </>
  )
}
