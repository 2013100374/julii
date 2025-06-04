'use client';
import useUtility from '@/app/_hooks/useUtility';
import { useSection } from '@/app/_partials/_sections/_hooks/useSection';
import { frontendImage } from '@/lib/helpers';
import Link from 'next/link';
import React from 'react'
import { useSelector } from 'react-redux';
import TrendingSkeleton from './TrendingSkeleton';

export default function Trending({ loading }) {

    const { content } = useSection('courses');
    const { trans } = useUtility();

    const { data: filterData } = useSelector((state) => state?.filter);


    return (
        <div className="trending-courses pb-50">
            <h5 className="trending-courses__title"> <span className="icon"><i className="fas fa-chart-line"></i></span>{trans(`Trending Categories`)}</h5>
            <div className="trending-courses__wrapper">

                {
                    loading ?
                        <TrendingSkeleton count={3} /> :

                        filterData?.trending_categories?.length > 0 ?
                            filterData?.trending_categories?.map((trendingCategory, index) => (

                                <Link href={`/courses/catalog/${trendingCategory?.slug}`} key={index} className="trending-courses-item bg-img"

                                    style={{
                                        backgroundImage: index == 0 ?
                                            `url(${frontendImage(content?.data_values?.shape_one, 'courses')})` : index == 1 ?
                                                `url(${frontendImage(content?.data_values?.shape_two, 'courses')})` :
                                                `url(${frontendImage(content?.data_values?.shape_three, 'courses')})`
                                    }}

                                >
                                    <div className="trending-courses-item__content">
                                        <div className="trending-courses-item__category">{trans(`Explore All`)}</div>
                                        <h6 className="trending-courses-item__name">{trans(trendingCategory?.name)}</h6>
                                    </div>
                                </Link>

                            )) :
                         
                            <div className="text-center py-5">
                                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="120" height="120" rx="8" fill="#F5F5F5" />
                                    <path d="M30 30H90M30 50H90M30 70H60" stroke="var(--bs-primary)" strokeWidth="4" strokeLinecap="round" />
                                    <circle cx="85" cy="85" r="20" stroke="var(--bs-primary)" strokeWidth="4" />
                                    <path d="M95 85L85 85L85 75" stroke="var(--bs-primary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className="mt-4 mb-4 text-muted">
                                    {trans(`No trending categories found.`)}
                                </p>
                            </div>
                             
                       
                }


            </div>
        </div>
    )
}
