'use client'
import useUtility from '@/app/_hooks/useUtility'

import React from 'react'
import WidgetSkeleton from '../../student-overview/_component/WidgetSkeleton';


export default function Widget({ dashboardData, user }) {
    const { trans, showAmount } = useUtility();



    return (

    
    
            !dashboardData ? <WidgetSkeleton count="6" /> :
            <div className="dashboard-widget-wrapper">
                <div className="row g-3 g-md-4 justify-content-center">
                    <div className="col-lg-4 col-sm-6 col-xsm-6">
                        <div className="dashboard-widget flex-align">
                            <div className="dashboard-widget__content">
                                <span className="dashboard-widget__text">{trans(`Enroller Courses`)}</span>
                                <h3 className="dashboard-widget__number">{dashboardData?.enroll_courses ?? 0}</h3>
                            </div>
                            <div className="dashboard-widget__icon flex-center">
                                <i className="las la-file-video"></i>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6 col-xsm-6">
                        <div className="dashboard-widget flex-align">
                            <div className="dashboard-widget__content">
                                <span className="dashboard-widget__text">{trans(`Active Courses`)}</span>
                                <h3 className="dashboard-widget__number">{dashboardData?.active_course}</h3>
                            </div>
                            <div className="dashboard-widget__icon flex-center">
                                <i className="las la-chart-line"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 col-xsm-6">
                        <div className="dashboard-widget flex-align">
                            <div className="dashboard-widget__content">
                                <span className="dashboard-widget__text">{trans(`Total Students`)}</span>
                                <h3 className="dashboard-widget__number">{dashboardData?.total_student}</h3>
                            </div>
                            <div className="dashboard-widget__icon flex-center">
                                <i className="las la-graduation-cap"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 col-xsm-6">
                        <div className="dashboard-widget flex-align">
                            <div className="dashboard-widget__content">
                                <span className="dashboard-widget__text">{trans(`Total Earnings`)}</span>
                                <h3 className="dashboard-widget__number">{showAmount(dashboardData?.total_earning ?? 0)}
                                </h3>
                            </div>
                            <div className="dashboard-widget__icon flex-center">
                                <i className="las la-wallet"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 col-xsm-6">
                        <div className="dashboard-widget flex-align">
                            <div className="dashboard-widget__content">
                                <span className="dashboard-widget__text">{trans('Total Withdraw')}</span>
                                <h3 className="dashboard-widget__number">{showAmount(dashboardData?.total_withdraw ?? 0)}</h3>
                            </div>
                            <div className="dashboard-widget__icon flex-center">
                                <i className="las la-chart-pie"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 col-xsm-6">
                        <div className="dashboard-widget flex-align">
                            <div className="dashboard-widget__content">
                                <span className="dashboard-widget__text">{trans('Balance')}</span>
                                <h3 className="dashboard-widget__number">{showAmount(user?.balance ?? 0)}</h3>
                            </div>
                            <div className="dashboard-widget__icon flex-center">
                                <i className="las la-dollar-sign"></i>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        
    )
}
