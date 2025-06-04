"use client";

import Search from "./Search";
import Table from "@/app/_partials/_table";
import { diffForHumans, showDateTime } from "@/lib/helpers";
import useUtility from "@/app/_hooks/useUtility";
import useResource from "@/app/_hooks/useResource";
import ENDPOINTS from "@/lib/endpoints";

export default function Transactions() {
    const { data: transactions, searchData: remarks, setPageNumber, loading, showPagination, setSearchUrl, refetch } = useResource(ENDPOINTS.INSTRUCTOR_TRANSACTIONS, 'transactions', 'remarks');


    const { showAmount } = useUtility();


    const columns = [
        {
            label: 'Trx',
            key: 'trx'
        },
        {
            label: 'Transacted',
            render: (item) => (
                <>

                   <span> {showDateTime(item.created_at, 'DD MMM YYYY')} <br /> <span className="text-muted">{diffForHumans(item.created_at)}</span></span>
                </>
            )
        },
        {
            label: 'Amount',
            render: (item) => (
                <>
                    <span className={`fw-bold ${item.trx_type == '+' ? 'text-success' : 'text-danger'}`}>
                        {item.trx_type} {showAmount(item.amount)}
                    </span>
                </>
            )
        },

        {
            label: 'Post Balance',
            key: 'post_balance',
            format: 'amount'
        },
        {
            label: 'Details',
            key: 'details'
        }
    ];

    return (
        <>
            <div className="dashboard-table mt-4">
                <div className="custom--card card">
                    <div className="card-header">
                        <Search
                            onSearch={url => setSearchUrl(url)}
                            setPageNumber={setPageNumber}
                            remarks={remarks}
                        />
                    </div>
                    <div className="card-body p-0">
                        <Table
                            columns={columns}
                            data={transactions}
                            loading={loading}
                            showPagination={showPagination}
                        />

                    </div>
                </div>
            </div>
        </>

    )
}
