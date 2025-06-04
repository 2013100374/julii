"use client";

import useResource from '@/app/_hooks/useResource';
import StatusBadge from './StatusBadge';
import useUtility from '@/app/_hooks/useUtility';

import { diffForHumans, showDateTime } from '@/lib/helpers';
import ENDPOINTS from '@/lib/endpoints';
import Search from './Search';
import Table from '@/app/_partials/_table';


export default function History() {
    const { trans } = useUtility();
    const { data: depositHistory, loading, showPagination, setSearchUrl, setPageNumber } = useResource(ENDPOINTS.DEPOSIT_HISTORY, 'deposits');
    const { showAmount } = useUtility();

    const columns = [
        {
            label: 'Gateway | Transaction',
            key: 'gateway_transaction',
            render: (item) => (
                <>
                    <span>
                        <span className="fw-bold"><span className="text-primary">{item?.method_code == -1000 ? 'Main Balance' : item?.gateway?.name}</span></span>
                        <br />
                        <small>{item.trx}</small>
                    </span>
                </>
            )
        },

        {
            label: 'Initiated',
            key: 'created_at',
            render: (item) => (
                <>
                    <span>
                        {showDateTime(item.created_at, 'DD MMM YYYY')}
                        <br />
                        <span className="text-muted">
                            {diffForHumans(item.created_at)}
                        </span>
                    </span>
                </>
            )
        },

        {
            label: 'Amount',
            key: 'amount',
            render: (item) => (
                <>
                    <span>
                        {showAmount(item.amount)} - <span className="text--danger">{showAmount(item.charge)}</span>
                        <br />
                        <strong>
                            {showAmount(item.amount - item.charge)}
                        </strong>
                    </span>
                </>
            )
        },

        {
            label: 'Conversion',
            key: 'rate',
            render: (item) => (
                <>
                    <span>
                        {showAmount(1)} = {showAmount(item.rate, false)} {item.currency}
                        <br />
                        <strong>
                            {showAmount(item.final_amount, false)} {item.currency}
                        </strong>
                    </span>
                </>
            )
        },

        {
            label: 'Status',
            key: 'status',
            render: (item) => (
                <>
                    <StatusBadge status={item.status} methodCode={item?.gateway?.code} />
                    <small>{diffForHumans(item.updated_at)}</small>
                </>
            )
        }
    ];

    return (
        <>
            <div className="col-lg-12">
                <h5 className="mb-3">{trans('Deposit History')}</h5>
                <div className="card custom--card">
                    <div className="card-header">
                        <Search
                            onSearch={url => setSearchUrl(url)}
                            setPageNumber={setPageNumber}
                        />
                    </div>
                    <div className="card-body p-0">
                        <Table
                            loading={loading}
                            columns={columns}
                            data={depositHistory}
                            showPagination={showPagination}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
