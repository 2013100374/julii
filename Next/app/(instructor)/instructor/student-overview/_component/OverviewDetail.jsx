'use client'

import useUtility from '@/app/_hooks/useUtility';
import { useSection } from '@/app/_partials/_sections/_hooks/useSection';
import ENDPOINTS from '@/lib/endpoints';
import { frontendImage, request } from '@/lib/helpers';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton'; 

export default function OverviewDetail({ id }) {
    const [progress, setProgress] = useState(0);
    const [overviewData, setOverviewData] = useState(null);
    const { trans } = useUtility();
    const { content } = useSection('user_dashboard');
    const endValue = overviewData?.percentage || 0;
    const speed = 20;

    useEffect(() => {
        async function fetchOverviewData() {
            try {
                const response = await request.get(`${ENDPOINTS.OVERVIEW_DETAIL}/${id}`);
                setOverviewData(response.data.data);
            } catch (error) {
                console.error("Error fetching overview data:", error);
            }
        }
        fetchOverviewData();
    }, [id]);

    useEffect(() => {
        if (!overviewData) return; 

        setProgress(0);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev < endValue) {
                    return prev + 1;
                }
                clearInterval(interval);
                return prev;
            });
        }, speed);

        return () => clearInterval(interval);
    }, [endValue,overviewData]); 

    return (
        <>
            {!overviewData ? (
                <div className="px-3">
                    <Skeleton  height={100} count={3} />
                </div>
            ) : (
                <div className="dashboard-body">
                    <div className="dashboard-body-wrapper">
                        <div className="container">
                            <h4 className="mb-4">
                                {overviewData?.course?.title} {trans(`Overview`)}
                            </h4>

                            <div className="row mb-50 gy-4">
                                <div className="col-lg-12">
                                    <div className="statistics">
                                        <div className="statistics-wrapper">
                                            <div className="statistics-item">
                                                <p className="statistics-item__title">{trans(`Total Curriculum`)}</p>
                                                <div className="statistics-item__content">
                                                    <h3 className="statistics-item__count">{overviewData?.total_curriculum}</h3>
                                                    <div className="statistics-item__image">
                                                        <Image src={frontendImage(content?.data_values?.image_three, 'user_dashboard')} alt="image" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="statistics-item">
                                                <p className="statistics-item__title">{trans(`Complete Curriculum`)}</p>
                                                <div className="statistics-item__content">
                                                    <h3 className="statistics-item__count">{overviewData?.completed_curriculum}</h3>
                                                    <div className="statistics-item__image">
                                                        <Image src={frontendImage(content?.data_values?.image_two, 'user_dashboard')} alt="image" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="statistics-item">
                                                <p className="statistics-item__title">{trans(`Participation Quiz`)}</p>
                                                <div className="statistics-item__content">
                                                    <h3 className="statistics-item__count">{overviewData?.total_quiz_participation}</h3>
                                                    <div className="statistics-item__image">
                                                        <Image src={frontendImage(content?.data_values?.image, 'user_dashboard')} alt="image" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="statistics-item">
                                                <p className="statistics-item__title">{trans(`In progress`)}</p>
                                                <div className="statistics-item__content">
                                                    <div
                                                        className="progress-statistic"
                                                        style={{
                                                            background: `conic-gradient(hsl(var(--base)) ${progress * 3.6}deg, hsl(var(--warning)) 0deg)`,
                                                        }}
                                                    >
                                                        <div className="progress-statistic__value">{progress}%</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
