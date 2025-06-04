'use client'
import React, { useEffect, useState } from 'react'
import OverviewWidget from './OverviewWidget'
import useUtility from '@/app/_hooks/useUtility';
import ENDPOINTS from '@/lib/endpoints';
import { request, showDateTime } from '@/lib/helpers';
import Skeleton from 'react-loading-skeleton';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { EmptyResource } from '@/app/_partials/_table/EmptyResource';
import Pagination from '@/app/_partials/Pagination';

export default function OverviewTable() {

    const [overviewData, setOverviewData] = useState([]);
    const { trans, showAmount } = useUtility();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function fetchStudentOverview() {
            setLoading(true)
            try {
                const data = await request.get(`${ENDPOINTS.STUDENT_OVERVIEW}?page=${page}`);
                if (data.status === 'error') {
                    return;
                }
                setOverviewData(data?.data?.data);
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.error("Error fetching categories:", error)
            }
        }
        fetchStudentOverview()
    }, [page])



    const renderTooltip = (props, progress) => (
        <Tooltip id="button-tooltip" {...props}>
            {`${Math.round(progress)}%`}
        </Tooltip>
    );






    return (
        <div className="dashboard-body">
            <div className="dashboard-body-wrapper">
                <div className="container">
                    <h4 >{trans(`Students Overview`)}</h4>

                    {

                        <>
                            <OverviewWidget data={overviewData} loading={loading} />

                            <div className="dashboard-table mt-4">
                                <div className="custom--card card">

                                    <div className="card-body p-0">
                                        <table className="table table--responsive--lg">
                                            <thead>
                                                <tr>
                                                    <th>{trans(`Student`)}</th>
                                                    <th>{trans(`Enrolled Date`)}</th>
                                                    <th>{trans(`Course`)}</th>
                                                    <th>{trans(`Progress`)}</th>

                                                </tr>
                                            </thead>

                                            <tbody>

                                                {
                                                    loading ?
                                                        <tr >
                                                            <td colSpan={4}>
                                                                <Skeleton height={50} count={15} />


                                                            </td>
                                                        </tr> :
                                                        overviewData?.student_progress?.length > 0 ?
                                                            overviewData?.student_progress?.map((student, index) => (
                                                                <tr key={index}>
                                                                    <td data-label="Student">
                                                                        <span>{student?.name}</span>
                                                                        <small className="d-block">{student?.email}
                                                                        </small>
                                                                    </td>
                                                                    <td data-label="Enrolled Date">
                                                                        <div className="transaction-date">
                                                                            <span>{showDateTime(student?.purchase_date, 'DD MMM YYYY')}</span>
                                                                            <small className="fs-12 fw-bold d-block mt-1">{showDateTime(student?.purchase_date, 'hh:mm A')}</small>
                                                                        </div>
                                                                    </td>
                                                                    <td data-label="Course">{student?.course_title}</td>
                                                                    <td data-label="Progress">
                                                                        <OverlayTrigger
                                                                            placement="top"
                                                                            delay={{ show: 250, hide: 400 }}
                                                                            overlay={(props) => renderTooltip(props, student?.progress)}
                                                                        >
                                                                            <div className="progress" style={{ height: "8px" }}>
                                                                                <div className="progress-bar" role="progressbar" style={{ width: `${student?.progress}%` }}
                                                                                    aria-valuenow={student?.progress} aria-valuemin="0" aria-valuemax="100">
                                                                                </div>
                                                                            </div>
                                                                        </OverlayTrigger>

                                                                    </td>

                                                                </tr>

                                                            )) :

                                                            <tr>
                                                                <td colSpan={4} className="text-center py-5">
                                                                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <rect width="120" height="120" rx="8" fill="#F5F5F5" />
                                                                        <path d="M30 30H90M30 50H90M30 70H60" stroke="var(--bs-primary)" strokeWidth="4" strokeLinecap="round" />
                                                                        <circle cx="85" cy="85" r="20" stroke="var(--bs-primary)" strokeWidth="4" />
                                                                        <path d="M95 85L85 85L85 75" stroke="var(--bs-primary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                                    </svg>
                                                                    <h4 className="mt-4 text-muted">{trans('No data available in table')}</h4>
                                                                    <p className="text-primary">{trans('Try adjusting your search or filter to find what you are looking for.')}</p>
                                                                </td>
                                                            </tr>
                                                }
                                            </tbody>


                                            {
                                                overviewData?.students?.length == 0 &&
                                                <EmptyResource columns={5} />
                                            }



                                        </table>
                                    </div>

                                    <Pagination loading={loading} pagination={overviewData?.students} />

                                </div>
                            </div>
                        </>


                    }

                </div>
            </div>
        </div>
    )
}
