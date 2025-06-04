import Skeleton from '@/app/_partials/_skeletons/Skeleton';
import React from 'react'


export default function CourseSkeleton({ countCourse }) {
    const skeletonItems = Array.from({ length: countCourse });

    return (
        <>
            {
                skeletonItems.map((_, index) => (
                    <div key={index} className="col-xl-4 col-sm-6">
                        <div className="card courses-card course-card-skeleton-bg">
                            <div className="card-img">
                                <Skeleton width="100%" height={200} />
                            </div>
                            <div className="card-body course-card-skeleton-bg">
                                <Skeleton width="100%" height={30} />
                               
                             
                                    <Skeleton width="100%" height={30}  />
                                   
                                    <Skeleton width="100%" height={30} />
                              
                            </div>
                            <div className="card-footer">
                                <Skeleton width="100%" height={20} />
                            </div>
                        </div>
                    </div>
                ))}
        </>
    )
}
