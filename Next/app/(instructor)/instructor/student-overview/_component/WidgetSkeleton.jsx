import Skeleton from '@/app/_partials/_skeletons/Skeleton';
import React from 'react'

export default function WidgetSkeleton({ count }) {
    const skeletonItems = Array.from({ length: count });

    return (
       
                <div className="row g-3 g-lg-4 dashboard-card-wrapper">
            {
                skeletonItems.map((_, index) => (
                    <div key={index} className="col-sm-6 col-xl-4">
                        <div className="dashboard-card">
                            <Skeleton width="100%" height={110} />
                        </div>
                    </div>

                ))}
                </div>
       
    )
}
