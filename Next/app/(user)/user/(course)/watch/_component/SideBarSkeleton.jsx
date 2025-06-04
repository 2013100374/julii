import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function SideBarSkeleton() {


    return (
        <div className='playlist-sidebar'>
            <Skeleton width={440} height={80} />
            <div className="accordion playlist--accordion" id="playlist">
                < div className="accordion-item">

                    <Skeleton width={440} height={80} />
                    <Skeleton width={440} height={80} />
                    <Skeleton width={440} height={80} />
                    <Skeleton width={440} height={80} />


                </div>
            </div>
        </div>
    )
}
