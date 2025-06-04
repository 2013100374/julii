import useUtility from '@/app/_hooks/useUtility'

import React from 'react'
import Skeleton from 'react-loading-skeleton';


export default function CourseBodySkeleton() {
    const {trans} = useUtility();
    return (
        <div className="courses-body">
            <div className="video-info">
                <Skeleton width={880} height={450} />
            </div>

            <div  className="lecture-content">
                <span className="play-content d-xl-none">
                    <span className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                            strokeLinejoin="round" className="lucide lucide-list-end">
                            <path d="M16 12H3" />
                            <path d="M16 6H3" />
                            <path d="M10 18H3" />
                            <path d="M21 6v10a2 2 0 0 1-2 2h-5" />
                            <path d="m16 16-2 2 2 2" />
                        </svg>
                    </span>
                    {trans(`Play List`)}
                </span>
                <div className="lecture-info">
                    <h5 className="lecture-info__title">{trans(`Welcome to the course`)}</h5>
                    <Skeleton  height={80} />
                </div>
                <Skeleton  height={200} />
            </div>
        </div>
    )
}
