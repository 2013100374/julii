import Skeleton from '@/app/_partials/_skeletons/Skeleton';
import React from 'react'

export default function TrendingSkeleton({ count }) {
    const skeletonItems = Array.from({ length: count });
    return (

        <>
            {
                skeletonItems.map((_, index) => (
                    <div key={index} className='trending-courses-item bg-img'>

                        <Skeleton width="100%" height={100} />



                    </div>
                ))
            }
        </>



    )
}
