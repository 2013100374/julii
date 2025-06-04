import Skeleton from '@/app/_partials/_skeletons/Skeleton'
import React from 'react'

export default function BlogSkeleton({ count }) {


    const skeletonItems = Array.from({ length: count });

    return (
        <>
            {
                skeletonItems.map((_, index) => (
                    <div className="col-xl-3 col-lg-4 col-sm-6" key={index}>
                        <div className="blog-item" >
                            <div className="blog-item__thumb">
                                <Skeleton width="100%" height={200} />
                            </div>
                            <div className="blog-item__content">
                                <div className="blog-item__date">
                                    <Skeleton width="100%" height={10} />
                                </div>
                                <h6 className="blog-item__title">
                                    <Skeleton width="100%" height={50} />
                                </h6>
                                <p className="blog-item__desc">
                                    <Skeleton width="100%" height={50} />
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    )
}
