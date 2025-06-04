'use client'
import useUtility from '@/app/_hooks/useUtility';
import ENDPOINTS from '@/lib/endpoints';
import { request, showDateTime } from '@/lib/helpers';
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-responsive-pagination/themes/classic.css';
import { EmptyResource } from '@/app/_partials/_table/EmptyResource';
import Pagination from '@/app/_partials/Pagination';
import usePaginationParams from '@/app/_hooks/usePaginationParams';
import Search from './Search';

export default function PurchaseTable() {

    const [purchaseHistories, setPurchaseHistories] = useState([]);
    const { trans, showAmount } = useUtility();
    const [loading, setLoading] = useState(false);

    const { pageNumber, setPageNumber } = usePaginationParams();
    const [searchUrl, setSearchUrl] = useState('');

    useEffect(() => {
        async function fetchPurchaseHistory() {
            setLoading(true)
            try {
                const data = await request.get(`${ENDPOINTS.PURCHASE_HISTORY}?page=${pageNumber}&${searchUrl.slice(1)}`);
                if (data.status === 'error') {
                    return;
                }
                setPurchaseHistories(data?.data?.data);
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.error("Error fetching categories:", error)
            }
        }
        fetchPurchaseHistory()
    }, [pageNumber, searchUrl])


    return (
        <div className="dashboard-body">
            <div className="dashboard-body-wrapper">
                <div className="container">
                    <div className="d-flex justify-content-between">
                        <h4>{trans(`Enrollments`)}</h4>
                    </div>
                    {
                        <>
                            <div className="dashboard-table">
                                <div className="custom--card card">
                                    <div className="card-header">
                                        <Search
                                            onSearch={url => setSearchUrl(url)}
                                            setPageNumber={setPageNumber}
                                        />
                                    </div>
                                    <div className="card-body p-0">
                                        <table className="table table--responsive--lg">
                                            <thead>
                                                <tr>
                                                    <th>{trans('Date')}</th>
                                                    <th>{trans('Student')}</th>
                                                    <th>{trans(`Course Name`)}</th>
                                                    <th>{trans(`Transaction ID`)}</th>
                                                    <th>{trans('Amount')}</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    loading ? (
                                                        <tr>
                                                            <td colSpan={5}>
                                                                <Skeleton height={50} count={15} />

                                                            </td>
                                                        </tr>
                                                    ) : (

                                                        purchaseHistories?.purchases?.data.map((purchase, index) => (
                                                            <tr key={index}>
                                                                <td data-label="Payment Date">
                                                                    <span>
                                                                        {showDateTime(purchase?.created_at, 'DD MMM YYYY')}
                                                                    </span>
                                                                    <small className="fs-12 fw-bold d-block mt-1"> {showDateTime(purchase?.created_at, 'hh:mm A')}</small>
                                                                </td>
                                                                <td>
                                                                    {purchase?.user?.firstname + ' ' + purchase?.user?.lastname}
                                                                </td>
                                                                <td data-label="Course Information">
                                                                    {purchase?.course?.title}
                                                                </td>
                                                                <td>
                                                                    {purchase?.trx}
                                                                </td>
                                                                <td data-label="Amount">
                                                                    {showAmount(purchase?.amount)}
                                                                </td>

                                                            </tr>
                                                        ))
                                                    )
                                                }
                                            </tbody>
                                            <>
                                                {purchaseHistories?.purchases?.data?.length == 0 &&
                                                    <EmptyResource columns={5} />}
                                            </>
                                        </table>
                                    </div>

                                    <Pagination loading={loading} pagination={purchaseHistories?.purchases} />

                                </div>
                            </div>
                        </>

                    }
                </div>
            </div>
        </div>


    )
}
