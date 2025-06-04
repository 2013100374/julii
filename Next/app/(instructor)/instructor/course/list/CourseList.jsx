'use client';
import usePaginationParams from '@/app/_hooks/usePaginationParams';
import useUtility from '@/app/_hooks/useUtility'
import Pagination from '@/app/_partials/Pagination';
import ENDPOINTS from '@/lib/endpoints';
import { getCourseImage, notifyToast, request, showDateTime } from '@/lib/helpers';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useState } from "react";
import { Image, Modal } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-responsive-pagination/themes/classic.css';
import CourseListSkeleton from './CourseListSkeleton';
import NodataImage from '@/public/images/no-data.png';

export default function CourseList() {


    const [courses, setCourses] = useState();
    const { pageNumber } = usePaginationParams();
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);
    const [reason, setReason] = useState('');

    useEffect(() => {
        async function fetchCourses() {
            setLoading(true);
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_URL;
                const { data } = await request.get(`${baseUrl + ENDPOINTS.COURSE_LIST}?page=${pageNumber}`);
                setCourses(data?.data?.courses);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error("Failed to fetch courses", error);
            }
        }

        fetchCourses();
    }, [pageNumber, setLoading]);

    const { trans, showAmount } = useUtility();

    

    const handleDeleteCourse = (slug) => {
        setTimeout(() => {
            confirmAlert({
                title: 'Are you sure you want to delete this course?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => courseDelete(slug)
                    },
                    {
                        label: 'No'
                    }
                ]
            });
        }, 0);
    };

    const courseDelete = async (slug) => {
        if (!courses) return;
        try {
            const response = await request.get(`${ENDPOINTS.COURSE_DELETE}/${slug}`);
            const updatedCourses = {
                ...courses,
                data: courses.data.filter((course) => course.slug !== slug),
            };
            setCourses(updatedCourses);
            notifyToast(response.data);
        } catch (error) {
            console.error("Error delete:", error);
        }
    };

    return (
        <>
            <div className="dashboard-body">
                <div className="dashboard-body-wrapper">
                    <div className="container">
                        <div className="flex-between mb-4">
                            <h4 className="mb-0">{trans(`My Courses`)}</h4>
                            <Link href="/instructor/course/create" className="btn btn--base btn--sm">
                                <span className="icon">
                                    <i className='las la-plus-circle'></i>
                                </span>
                                {trans(`New Course`)}
                            </Link>
                        </div>
                        <div className="row gy-4">
                            {
                                (loading ? <CourseListSkeleton countCourse={10}/> :
                                    courses?.data?.length > 0 ?
                                        (
                                            courses?.data?.map((course, index) => {
                                                return (
                                                    <div className="col-12" key={index}>
                                                        <div className="created-course">
                                                            <div className="created-course-header">
                                                                <div className="flex-align gap-3 left">
                                                                    <Image src={getCourseImage(course?.image_path, course?.image)} alt="Course" className="created-course-img" />
                                                                    <div className="created-course-details">
                                                                        <h6 className="created-course-title mb-2">{trans(course?.title)}</h6>
                                                                        <p className="created-course-desc">
                                                                            {trans(course?.subtitle)}
                                                                        </p>
                                                                        <span className="created-course-type">
                                                                            {
                                                                                course?.level === 1 ? (
                                                                                    <span>{trans(`Beginner Friendly`)}</span>
                                                                                ) : course?.level === 2 ? (
                                                                                    <span >{trans(`Intermediate`)}</span>
                                                                                ) : course?.level === 3 ? (
                                                                                    <span>{trans(`Advanced`)}</span>
                                                                                ) :
                                                                                    (
                                                                                        <span>{trans(`N/A`)}</span>
                                                                                    )
                                                                            }
                                                                        </span>

                                                                        <div className="created-course-type mt-2">

                                                                            {
                                                                                course?.status === 1 ? (
                                                                                    <span className='badge badge--success'>{trans(`Approved`)}</span>
                                                                                ) : course?.status === 2 ? (
                                                                                    <span className='badge badge--info' >{trans(`Review`)}</span>
                                                                                ) : course?.status === 4 ? (
                                                                                    <span className='badge badge--danger'>{trans(`Rejected`)}</span>
                                                                                ) :
                                                                                    (
                                                                                        <span className='badge badge--dark'>{trans(`Initiated`)}</span>
                                                                                    )
                                                                            }
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                                <div className="created-course-actions">
                                                                    <Link href={`/instructor/course/intended-learners/${course?.slug}`} className="edit-btn">
                                                                        <i className="fas fa-pencil-alt"></i>
                                                                    </Link>
                                                                    <Link href="#" onClick={() => handleDeleteCourse(course?.slug)} className="edit-btn">
                                                                        <i className="fas fa-trash-alt"></i>
                                                                    </Link>
                                                                    {
                                                                        (course?.status == 4 && course?.reject_reason) &&
                                                                        <Link href="javascript:void(0)" onClick={() => {
                                                                            openModal()
                                                                            setReason(course?.reject_reason)
                                                                        }} className="edit-btn">
                                                                            <i className="fas fa-eye"></i>
                                                                        </Link>
                                                                    }

                                                                </div>
                                                            </div>
                                                            <div className="created-course-content">
                                                                <div className="created-course-info">
                                                                    <div className="icon">
                                                                        <i className="fas fa-users"></i>
                                                                    </div>
                                                                    <div className="content">
                                                                        <h6>{trans(`Total Students`)}</h6>
                                                                        <p>{course?.purchases?.length ?? 0}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="created-course-info">
                                                                    <div className="icon">
                                                                        <i className="fas fa-star"></i>
                                                                    </div>
                                                                    <div className="content">
                                                                        <h6>{trans(`Average Rating`)}</h6>
                                                                        <p>{course?.ratings?.avg_rating}/5.0</p>
                                                                    </div>
                                                                </div>
                                                                <div className="created-course-info">
                                                                    <div className="icon">
                                                                        <i className="fas fa-dollar-sign"></i>
                                                                    </div>
                                                                    <div className="content">
                                                                        <h6>{trans(`Total Earnings`)}</h6>
                                                                        <p>{showAmount(course?.purchases_sum_amount ?? 0)}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="created-course-info">
                                                                    <div className="icon">
                                                                        <i className="fas fa-calendar"></i>
                                                                    </div>
                                                                    <div className="content">
                                                                        <h6>{trans(`Published Date`)}</h6>
                                                                        <p>{showDateTime(course?.created_at, 'DD MMM YYYY')}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>)

                                            })
                                        ) : (

                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="nodata-found">
                                                        <Image
                                                            src={NodataImage.src}
                                                            alt="payment-thumb"
                                                            width={100}
                                                            height={100}
                                                        />
                                                        <p className="text-muted fw-semibold">
                                                            {trans(`No available courses`)}
                                                        </p>

                                                        <Link href='/instructor/course/create' className='btn btn-outline--base mt-4' ><i className='las la-plus'></i>Add New</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                )
                            }

                            <Pagination loading={loading} pagination={courses} />
                        </div>
                    </div>
                </div>
            </div>

            {/* artical modal */}
            <Modal show={isModalOpen} size="lg" onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{(trans`Course Rejection Reason`)}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div >
                        <p>{reason}</p>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
