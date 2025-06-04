import React from 'react'
import ReviewList from './_component/ReviewList'
import { getMetaTitle } from '@/lib/helpers';

export const metadata = getMetaTitle('Reviews');
export default function Reviews() {
    return (
        <>
            <div className="dashboard-body">
                <div className="dashboard-body-wrapper">
                    <div className="container">
                        <div className="row gy-4">
                            <div className="col-12">
                                <ReviewList />

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
