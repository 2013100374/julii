
import React from 'react'
import useUtility from '../_hooks/useUtility';

export default function StatusBadge({ status }) {
    const { trans } = useUtility();
    return (
        <>
            {
               status === 0 ?
                    <span className="badge badge--warning">
                        <span className="icon"><i className="las la-times"></i></span>
                       {trans(` Draft`)}
                    </span> :
                   status === 2 ?
                        <span className="badge badge--warning">
                            <span className="icon"><i className="las la-clock"></i></span>
                            {trans(` Pending`)}
                        </span> :
                        <span className="badge badge--success">
                            <span
                                className="icon"><i className="las la-check-circle"></i></span>
                            {trans(` Published`)}
                        </span>

            }
        </>
    )
}
