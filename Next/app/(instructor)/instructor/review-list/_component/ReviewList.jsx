'use client';
import useResource from '@/app/_hooks/useResource';
import useUtility from '@/app/_hooks/useUtility';
import ENDPOINTS from '@/lib/endpoints';
import React, { useState } from 'react'
import Search from '../../withdraw/history/_components/Search';
import Table from "@/app/_partials/_table";
import Rating from '@/app/_partials/Rating';
import { Button, Modal } from 'react-bootstrap';
import { notifyToast, request } from '@/lib/helpers';
import SubmitBtn from '@/app/_partials/SubmitBtn';

export default function ReviewList() {


    const { trans } = useUtility();
    const { data: reviews, showPagination, loading, setSearchUrl, setPageNumber } = useResource(ENDPOINTS.REVIEW_LIST, 'reviews');

    const { showAmount } = useUtility();

    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selectedReview, setSelectedReview] = useState(null);

    const [reply, setReply] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitReply = async () => {
        if (!selectedReview) return;
        setIsSubmitting(true);
        try {
            const response = await request.post(`${ENDPOINTS.REVIEW_REPLY}/${selectedReview.id}`, { reply });

            notifyToast(response.data);
            setReply('');

            const updatedReviews = reviews?.data?.map((review) =>
                review.id === selectedReview.id
                    ? {
                        ...review,
                        instructor_reply_date: response.data.data.instructor_reply_date,
                        instructor_answer: response.data.data.instructor_answer,
                    }
                    : review
            );
            setSelectedReview(updatedReviews);
            handleClose();
        } catch (error) {
            console.error("Error submitting reply:", error);
        } finally {
            setIsSubmitting(false);
        }
    };


    const columns = [
        {
            label: 'Course Title',
            render: (item) => (
                <>
                    <span className="fw-bold"><span>{item?.course?.title}</span></span>

                </>
            )
        },

        {
            label: 'Student Name',
            render: (item) => (
                <>
                    <span className="fw-bold"><span>{item?.user?.firstname + ' ' + item?.user?.lastname}</span></span>
                </>
            )
        },
        {
            label: 'Rating',

            render: (item) => (
                <>
                    <span className="fw-bold"><span>{item?.rating}</span></span>
                </>
            )


        },

        {
            label: 'Action',
            key: 'Action',
            render: (item) => (
                <>
                    <button onClick={() => {
                        handleShow();
                        setSelectedReview(item)
                    }} className='edit-btn' ><i className='las la-undo'></i> </button>
                </>
            )
        }
    ];

    return (
        <>
            <h4 >Reviews</h4>
            <div className="card custom--card">
                <div className="card-header">
                    <Search
                        onSearch={url => setSearchUrl(url)}
                        setPageNumber={setPageNumber}
                    />
                </div>
                <div className="card-body p-0">
                    <Table
                        columns={columns}
                        data={reviews}
                        loading={loading}
                        showPagination={showPagination}
                    />
                </div>
            </div>


            <Modal className='custom--modal' show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton className="border-b">
                    <h5 className="mb-0 font-semibold text-lg">{trans("Details")}</h5>
                </Modal.Header>
                <Modal.Body>
                    <div className="review-modal">
                        <h6 className="review-modal-title">{selectedReview?.course?.title}</h6>
                        <ul className="review-modal-list">
                            <li className="review-modal-item">
                                <span className="title">{trans("Rating")}</span>
                                <span className='divide'>:</span> <Rating rating={selectedReview?.rating} />
                            </li>
                            <li className="review-modal-item">
                                <span className="title">{trans("Comment")}</span>
                                <span className='divide'>:</span> {selectedReview?.comment}
                            </li>
                            <li className="review-modal-item">
                                <span className="title">{trans("Student Name")}</span>   <span className='divide'>:</span> {selectedReview?.user?.firstname + ' ' + selectedReview?.user?.lastname}
                            </li>
                        </ul>

                        {
                            selectedReview?.instructor_reply_date ? (
                                <div className="space-y-2">
                                    <span className="font-medium">{trans("Your Reply")}:</span> {selectedReview?.instructor_answer}

                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <label className="form--label form-label">{trans("Reply")}</label>
                                    <div className="form-group">
                                        <textarea
                                            className="form--control "
                                            rows="3"
                                            value={reply}
                                            placeholder='Leave your reply...'
                                            onChange={(e) => setReply(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className="text-end">
                                        <SubmitBtn className="btn btn--base" isSubmitting={isSubmitting} onClick={submitReply} title="Submit" />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
