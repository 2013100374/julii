'use client';
import useUtility from '@/app/_hooks/useUtility';
import React, { useState } from 'react'
import { Form, Formik } from 'formik';
import Input from '@/app/_forms/Input';
import SubmitBtn from '@/app/_partials/SubmitBtn';
import useWatchHandler from '../_hooks/useWatchHandler';
import { useSelector } from 'react-redux';
import { diffForHumans } from '@/lib/helpers';
import ReviewList from './ReviewList';
import successImage from '@/public/images/success.png';
import Image from 'next/image';

export default function LectureTab({ course }) {
    const { trans } = useUtility();

    const { loading, initialReviewValues, reviewValidationSchema, handleReviewSubmit, submitReview } = useWatchHandler(course?.slug);

    const [shoeDescription, setDescription] = useState('description');
    const toggleDescription = (type) => {
        setDescription(type);
    }

    const [rating, setRating] = useState('');

    const [userComment, setUserComment] = useState('');


    const [hoverRating, setHoverRating] = useState(0);

    const handleRating = (value, type) => {

        setRating(value);

    };

    const handleCommentChange = (e) => {
        setUserComment(e.target.value);
    };





    return (
        <div className="lecture--tab">
            <ul className="nav nav-tabs">
                <li className="nav-item" role="presentation">
                    <button className={`nav-link ${shoeDescription == 'description' ? 'active' : ''}`}
                        onClick={() => toggleDescription('description')}
                        data-bs-toggle="tab" data-bs-target="#note" type="button"
                        role="tab" aria-controls="note" aria-selected="true">
                        {trans(`Description & notes`)}
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className={`nav-link  ${shoeDescription == 'review' ? 'active' : ''}`}
                        onClick={() => toggleDescription('review')}
                        data-bs-toggle="tab" data-bs-target="#reviews"
                        type="button" role="tab" aria-controls="comments" aria-selected="true">
                        {trans(`Review`)}
                        <span className="nav-link__badge">{course?.ratings?.total_reviews}</span>
                    </button>
                </li>
            </ul>
            <div className="tab-content">
                <div className={`tab-pane ${shoeDescription == 'description' ? 'show active' : ''} `} id="note" role="tabpanel">
                    <div className="lecture-descreption">
                        <div className="lecture-descreption-block">
                            <h5 className="lecture-descreption-block__title">{trans(`Lectures Description`)}</h5>
                            <p className="lecture-descreption-block__text" dangerouslySetInnerHTML={{ __html: course?.description }}></p>
                        </div>
                    </div>
                </div>
                <div className={`tab-pane ${shoeDescription == 'review' ? 'show active' : ''} `} id="reviews" role="tabpanel">
                    <div className="course-comment">

                        {!course?.is_submit_review && !submitReview &&
                            <Formik
                                initialValues={initialReviewValues}
                                validationSchema={reviewValidationSchema}
                                onSubmit={handleReviewSubmit}
                            >
                                {({ setFieldValue }) => (
                                    <Form>
                                        <div className="review-section">
                                            <div className="card custom--card">
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <label className='form--label fw-semibold'>{trans('Course Review')}</label>
                                                        <div className="rating-component">
                                                            <div className="stars-box">
                                                                {[1, 2, 3, 4, 5].map((value) => (
                                                                    <i
                                                                        key={value}
                                                                        className={`star fa fa-star ${hoverRating >= value || rating >= value ? 'selected' : ''}`}
                                                                        title={`${value} star${value > 1 ? 's' : ''}`}
                                                                        data-value={value}
                                                                        onClick={() => handleRating(value)}
                                                                        onMouseEnter={() => setHoverRating(value)}
                                                                        onMouseLeave={() => setHoverRating(0)}
                                                                    />
                                                                ))}
                                                            </div>

                                                            <Input type="hidden" name="rate_value" value={rating} />

                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className='form--label fw-semibold'>{trans('Leave a Comment')}</label>
                                                        <textarea
                                                            name="user_comment"
                                                            rows="4"
                                                            placeholder="Write your comment here..."
                                                            className="form-control form--control"
                                                            value={userComment}
                                                            onChange={handleCommentChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <SubmitBtn type="submit" isSubmitting={loading} onClick={() => {
                                                            setFieldValue('rate_value', rating);
                                                            setFieldValue('user_comment', userComment);
                                                        }} title="Submit" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        }

                        {
                            submitReview &&
                            <div className="submit-review-success mb-3">
                                <Image
                                    src={successImage}
                                    alt="payment-thumb"
                                    width={100}
                                    height={100}
                                />
                                {trans('Your review has been submitted successfully.')}
                            </div>
                        }
                        <ReviewList />
                    </div>
                </div>
            </div>
        </div>
    )
}
