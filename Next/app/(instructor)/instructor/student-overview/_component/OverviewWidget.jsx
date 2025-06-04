import useUtility from '@/app/_hooks/useUtility'

import React from 'react'
import WidgetSkeleton from './WidgetSkeleton';


export default function OverviewWidget({ data, loading }) {
    const { trans } = useUtility();
    return (

        
        <>
            {loading ? <WidgetSkeleton count="3"  /> :
            <div className="row g-3 g-lg-4 dashboard-card-wrapper">
                <div className="col-sm-6 col-xl-4">
                    <div className="dashboard-card">
                        <span className="dashboard-card__icon">
                            <i className="las la-graduation-cap"></i>
                        </span>
                        <div className="dashboard-card__content">
                            <p className="dashboard-card__title">{trans(`Total Courses`)}</p>
                            <h3 className="dashboard-card__count">{data?.total_courses}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-xl-4">
                    <div className="dashboard-card">
                        <span className="dashboard-card__icon">
                            <i className="las la-users"></i>
                        </span>
                        <div className="dashboard-card__content">
                            <p className="dashboard-card__title">{trans(`Total Students`)}</p>
                            <h3 className="dashboard-card__count">{data?.total_students_enrolled}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-xl-4">
                    <div className="dashboard-card">
                        <span className="dashboard-card__icon">
                            <i className="las la-book-reader"></i>
                        </span>
                        <div className="dashboard-card__content">
                            <p className="dashboard-card__title">{trans(`Completed Courses`)}</p>
                            <h3 className="dashboard-card__count">{data?.complete_course}</h3>
                        </div>
                    </div>
                </div>
            </div>}
        </>

       
    )
}
