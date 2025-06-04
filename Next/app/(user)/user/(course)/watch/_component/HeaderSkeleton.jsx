import useUtility from '@/app/_hooks/useUtility';
import Skeleton from '@/app/_partials/_skeletons/Skeleton';
import Link from 'next/link';
import React from 'react'

export default function HeaderSkeleton() {
    const { trans } = useUtility();
    return (
        <section className="course-watch-banner bg-img py-50">
            <div className="container" >
                <div className="course-watch-banner__wrapper">
                    <div className="course-watch-banner__content">
                        <Link href="/user/dashboard" className="d-none d-sm-flex back-to-home">
                            <span><i className="las la-arrow-left"></i></span>{trans(`Back To Home`)}
                        </Link>
                        <Skeleton classes={'dark'} width={1344} height={30}  />

                        <Skeleton classes={'dark'} width={500} height={30} />

                    </div>

                </div>
            </div>
        </section >

    )
}
