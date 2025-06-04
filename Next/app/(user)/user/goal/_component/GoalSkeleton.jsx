import Skeleton from '@/app/_partials/_skeletons/Skeleton';
import React from 'react'

export default function GoalSkeleton({ count }) {
    const skeletonItems = Array.from({ length: count });

    return (

        skeletonItems.map((_, index) => (
            <li key={index} className="set-goal-item">
                <Skeleton width="100%" height={20} />
            </li>
        ))

    )
}
