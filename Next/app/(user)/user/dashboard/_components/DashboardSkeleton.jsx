import useUtility from '@/app/_hooks/useUtility'
import Skeleton from '@/app/_partials/_skeletons/Skeleton';

import React from 'react'

export default function DashboardSkeleton() {
    const { trans } = useUtility();
    return (
        <>


            <div className="row mb-50 gy-4">
                <div className="col-lg-7 col-xl-8">
                    <div className="statistics h-100">
                        <div className="statistics-wrapper justify-content-center h-100 align-items-center">
                            <h4 className=' m-0 p-0'>
                                <i className="las la-circle-notch la-spin"></i>Loading....
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5 col-xl-4">
                    <div className="my-goal h-100">
                        <div className="my-goal__wrapper">
                            <h5 className="my-goal__header">
                                {trans(`My goals`)}
                            </h5>
                            <div className="my-goal-block flex-center  goal-height ">
                              
                                    <h5 className='m-0 p-0'>
                                        <i className="las la-circle-notch la-spin"></i>
                                    </h5>
                                
                            </div>
                            <div className="my-goal-block">
                                <div className="my-goal-block__content">
                                    <Skeleton height={80} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
