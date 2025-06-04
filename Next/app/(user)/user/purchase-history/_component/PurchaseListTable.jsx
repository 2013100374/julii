'use client';
import usePaginationParams from '@/app/_hooks/usePaginationParams';
import useUtility from '@/app/_hooks/useUtility';
import Pagination from '@/app/_partials/Pagination';
import ENDPOINTS from '@/lib/endpoints';
import { request, showDateTime } from '@/lib/helpers';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import ResponsivePagination from 'react-responsive-pagination';

export default function PurchaseListTable() {


    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const [loading, setLoading] = useState(true);
    const { pageNumber, setPageNumber } = usePaginationParams();

    const { trans, showAmount } = useUtility();

    const fetchData = useCallback(async () => {
        try {

            setLoading(true);
            const baseUrl = process.env.NEXT_PUBLIC_API_URL;
            const { data } = await request.get(`${baseUrl + ENDPOINTS.ENROLLED_COURSE}?page=${pageNumber}`);

            setEnrolledCourses(data?.data.enrolled_courses)
            setLoading(false);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [pageNumber]);

    useEffect(() => {
        fetchData();
    }, [pageNumber, fetchData])



    return (
        <>
            <h5 className="dashboard-main__title">{trans(`Purchase History`)}</h5>

            <div className="custom--card card">
                <div className="card-body p-0">
                    <table className="table table--responsive--lg">
                        <thead>
                            <tr>
                                <th>{trans(`Course Information`)}</th>
                                <th>{trans(`Amount`)}</th>
                                <th>{trans(`Payment Date`)}</th>
                                <th>{trans(`Payment Status`)}</th>
                                <th>{trans(`Action`)}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                loading ?
                                    <tr>
                                        <td colSpan={5}>
                                            <Skeleton height={50} count={20} />
                                        </td>
                                    </tr>
                                    :
                                    enrolledCourses?.data?.length > 0 ?
                                        enrolledCourses?.data?.map((enrolled, index) => (
                                            <tr key={index} >
                                                <td data-label="Course Information">
                                                    {trans(enrolled?.course?.title)}
                                                </td>
                                                <td data-label="Amount">
                                                    {showAmount(enrolled?.amount)}
                                                </td>
                                                <td data-label="Payment Date">
                                                    <span>
                                                        {showDateTime(enrolled?.created_at, 'DD MMM YYYY')}

                                                    </span>
                                                </td>
                                                <td data-label="Payment Status">
                                                    <span>
                                                        <span className="badge badge--base">
                                                            {enrolled?.payment_status == 1 ? trans(`Paid`) : trans(`Unpaid`)}
                                                        </span>
                                                        <small className="text-muted d-block mb-2">{trans(`non-refundable`)}</small>
                                                    </span>
                                                </td>
                                                <td>
                                                     <Link className='edit-btn' href={`/user/watch/${enrolled?.course?.slug}`}><i className='las la-eye'></i></Link>

                                                </td>
                                            </tr>

                                        )) :

                                        (<tr>
                                            <td colSpan='5' className="text-center py-5">
                                                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="120" height="120" rx="8" fill="#F5F5F5" />
                                                    <path d="M30 30H90M30 50H90M30 70H60" stroke="var(--bs-primary)" strokeWidth="4" strokeLinecap="round" />
                                                    <circle cx="85" cy="85" r="20" stroke="var(--bs-primary)" strokeWidth="4" />
                                                    <path d="M95 85L85 85L85 75" stroke="var(--bs-primary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <h4 className="mt-4 text-muted">{trans('No data available in table')}</h4>
                                                <p className="text-primary">{trans('Try adjusting your search or filter to find what you are looking for.')}</p>
                                            </td>
                                        </tr>)
                            }
                        </tbody>
                    </table>
                </div>
                <Pagination loading={loading} pagination={enrolledCourses} />
            </div >




        </>
    )
}
