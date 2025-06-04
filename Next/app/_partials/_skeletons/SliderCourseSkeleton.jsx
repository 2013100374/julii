import React from 'react'
import Skeleton from './Skeleton';


export default function SliderCourseSkeleton({countCourse}) {
    const skeletonItems = Array.from({ length: countCourse });

    return (
        <>
            {
                skeletonItems.map((_, index) => (
                    <div key={index} className="col-xl-3 col-sm-6 ">
                        <div className="card courses-card">
                            <div className="card-img">
                                <Skeleton width="100%" height={200} />
                            </div>
                            <div className="card-body">
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