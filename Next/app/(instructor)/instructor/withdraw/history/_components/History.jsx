"use client";

import StatusBadge from './StatusBadge.jsx';
import { showDateTime, diffForHumans } from '@/lib/helpers';
import Table from '@/app/_partials/_table/index.js';
import useUtility from '@/app/_hooks/useUtility.js';
import useResource from '@/app/_hooks/useResource.js';
import ENDPOINTS from '@/lib/endpoints.js';
import Search from './Search.jsx';

export default function History() {
    const { trans } = useUtility();
    const { data: withdrawHistory, showPagination, loading, setSearchUrl, setPageNumber } = useResource(ENDPOINTS.WITHDRAW_HISTORY, 'withdrawals');
    const { showAmount } = useUtility();

    const columns = [
        {
            label: 'Gateway | Transaction',
            render: (item) => (
                <>
                    <span className="fw-bold"><span className="text-primary">{item?.method?.name}</span></span>
                    <br />
                    <small>{item.trx}</small>
                </>
            )
        },

        {
            label: 'Initiated',
            render: (item) => (
                <>
                    {showDateTime(item.created_at, 'DD MMM YYYY')}
                    <br />
                    <span className="text-muted">
                        {diffForHumans(item.created_at)}
                    </span>
                </>
            )
        },

        {
            label: 'Amount',
            render: (item) => (
                <>
                    {showAmount(1)} = {showAmount(item.rate, false)} {item.currency}
                    <br />
                    <strong>
                        {showAmount(item.final_amount, false)} {item.currency}
                    </strong>
                </>
            )
        },

        {
            label: 'Conversion',
            key: 'rate',
            render: (item) => (
                <>
                    {showAmount(item.amount)} - <span className="text--danger">{showAmount(item.charge)}</span>
                    <br />
                    <strong>
                        {showAmount(item.amount - item.charge)}
                    </strong>
                </>
            )
        },

        {
            label: 'Status',
            key: 'status',
            render: (item) => (
                <>
                    <StatusBadge status={item.status} updatedAt={item.updated_at} />
                    <small>{diffForHumans(item.updated_at)}</small>
                </>
            )
        }
    ];

    return (
        <>
            <div className="col-lg-12">
                <div className="d-flex justify-content-between">
                    <h4>{trans('Withdrawal History')}</h4>

                </div>
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
                            data={withdrawHistory}
                            loading={loading}
                            showPagination={showPagination}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
