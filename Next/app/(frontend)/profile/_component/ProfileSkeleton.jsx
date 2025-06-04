import useUtility from '@/app/_hooks/useUtility'
import React from 'react'
import Skeleton from 'react-loading-skeleton';


export default function ProfileSkeleton() {
    const {trans} = useUtility();
    return (
        <section className="instructor py-50">
            <div className="container">
                <div className="row gy-4 align-items-center justify-content-between">
                    <div className="col-xl-6 col-lg-7 order-2 order-lg-1">
                        <div className="instructor-info">
                            <div className="instructor-top">
                              <Skeleton height={30}/>
                                <Skeleton height={30}/>
                                    <Skeleton height={30}/>
                                    <Skeleton height={80}/>
                            </div>
                            <div className="instructor-content">
                            <Skeleton height={30}/>
                                <div className="instructor-content__desc">
                                <Skeleton height={30}/>
                                </div>
                            </div>
                            <div className="social-share">
                                <h6 className="social-share__title">{trans(`Follow Address`)}</h6>
                                    <Skeleton width={200} height={50}/>
                               
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-5 order-1 order-lg-2">
                        <div className="instructor-info__thumb">
                        <Skeleton width={432} height={370}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
