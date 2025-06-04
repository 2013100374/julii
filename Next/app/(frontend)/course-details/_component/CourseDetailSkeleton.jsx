import Skeleton from '@/app/_partials/_skeletons/Skeleton'
import React from 'react'

export default function CourseDetailSkeleton() {
    return (
        <section className="course-banner py-50 bg-img">
            <div className="container">
                <div className="course-wrapper">
                    <div className="row gy-4 align-items-center justify-content-between flex-lg-row-reverse">
                        <div className="col-xl-4 col-lg-5">
                            <Skeleton classes='dark' height={300} />
                        </div>
                        <div className="col-lg-7">
                         
                            <Skeleton classes='dark' width={200} height={30} />
                           
                            <div className="course-content">
                                <Skeleton classes='dark' height={200} />
                                <Skeleton classes='dark' height={30} />
                            </div>

                            <div className="course-info-wrapper">
                                <Skeleton classes='dark' height={20} />
                             
                            </div>

                            <div className="course-content-footer">
                                <Skeleton classes='dark' height={30} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
