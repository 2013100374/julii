"use client";

import useUtility from "@/app/_hooks/useUtility";
import { useSection } from "@/app/_partials/_sections/_hooks/useSection";
import { Button } from "@/app/_partials/Button";

import ENDPOINTS from "@/lib/endpoints";
import { frontendImage, getCourseImage, getUser, request, strLimit } from "@/lib/helpers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Image, Modal } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import DashboardSkeleton from "./DashboardSkeleton";


export default function Dashboard() {
    const { content } = useSection('user_dashboard');

    const [dashboardData, setDashboardData] = useState([]);
    const [progress, setProgress] = useState(0);
    const { trans } = useUtility();
    const user = getUser();


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const { data } = await request.get(ENDPOINTS.DASHBOARD);

                setDashboardData(data?.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.error('Error fetching goals:', error);
            }
        };
        fetchDashboardData();
    }, [setLoading]);




    const endValue = dashboardData?.percentage;
    const speed = 20;

    useEffect(() => {
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
    }, [dashboardData, endValue]);

    if(!user) return null;


    return (
        <>
            <section className="student-dashboard py-50">
                <div className="container">
                    <div className="row mb-3">
                        <div className="col-md-12">
                            {user?.kv == 0 && user?.kyc_rejection_reason && (
                                <div className="alert alert--danger" role="alert">
                                    <div className="alert__icon">
                                        <i className="fas fa-times-circle"></i>
                                    </div>
                                    <div className="alert__content">
                                        <h6 className="alert__title">{trans(`KYC Documents Rejected`)}</h6>
                                        <p className="alert__desc">
                                            <button className="alert__link">{trans(`Show Reason`)}</button>
                                            {trans(`Your KYC documents have been rejected. Please`)} <Link className="alert__link" href={'/user/kyc-verification'}>{trans(`re-submit kyc documents`)}</Link>.
                                            <Link className="alert__link" href={'/user/kyc-verification/data'}>{trans(`See KYC Data`)}</Link>
                                        </p>
                                    </div>
                                </div>
                            )}
                            {user?.kv == 0 && !user.kyc_rejection_reason && (
                                <div className="alert alert--info" role="alert">
                                    <div className="alert__icon">
                                        <i className="fas fa-exclamation-circle"></i>
                                    </div>
                                    <div className="alert__content">
                                        <h5 className="alert__title">{trans(`KYC Verification required`)}</h5>
                                        <p className="alert__desc">{trans(`KYC verification is required. Please`)} <Link className="alert__link" href={'/user/kyc-verification'}>{trans(`Submit documents`)}</Link>.</p>
                                    </div>
                                </div>
                            )}
                            {user?.kv === 2 && (
                                <div className="alert alert--warning" role="alert">
                                    <div className="alert__icon"><i className="las la-hourglass-half"></i>
                                    </div>
                                    <div className="alert__content">
                                        <h5 className="alert__title">{trans(`KYC Verification pending`)}</h5>
                                        <p className="alert__desc">{trans(`KYC verification is pending. Please`)} <Link className="alert__link" href={'/user/kyc-verification/data'}>{trans(`see KYC data`)}</Link>.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="student-dashboard-top mb-50">
                        <div className="student-dashboard-top__shape">
                            <Image className="fit-image" src={frontendImage(content?.data_values?.shape, 'user_dashboard')} alt="shape" />
                        </div>
                        <div className="student-dashboard-top__thumb">
                            <Image src={frontendImage(content?.data_values?.image, 'user_dashboard')} alt="brain" />
                        </div>
                        <div className="student-dashboard-top__content">
                            <h4 className="student-dashboard-top__title">{trans(content?.data_values?.heading)}</h4>
                            <p className="student-dashboard-top__text">
                                {trans(content?.data_values?.description)}
                            </p>
                        </div>
                    </div>
                    {loading ?
                        <DashboardSkeleton />

                        :
                        <>
                            <div className="row mb-50 gy-4">
                                <div className="col-lg-7 col-xxl-8">
                                    <div className="statistics">
                                        <div className="statistics-wrapper">
                                            <div className="statistics-item">
                                                <p className="statistics-item__title">{trans(`Enrolled Courses`)}</p>
                                                <div className="statistics-item__content">
                                                    <h3 className="statistics-item__count">{dashboardData?.total_enroll ?? 0}</h3>
                                                    <div className="statistics-item__image">
                                                        <Image src={frontendImage(content?.data_values?.image_one, 'user_dashboard')} alt="image" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="statistics-item">
                                                <p className="statistics-item__title">{trans(`In progress`)}</p>
                                                <div className="statistics-item__content">
                                                    <h3 className="statistics-item__count">{dashboardData?.completed_curriculum ?? 0}</h3>
                                                    <div
                                                        className="progress-statistic"
                                                        style={{ background: `conic-gradient(hsl(var(--base)) ${progress * 3.6}deg, hsl(var(--warning)) 0deg)`, }}
                                                    >
                                                        <div className="progress-statistic__value">{progress}%</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="statistics-item">
                                                <p className="statistics-item__title">{trans(`Completed Courses`)}</p>
                                                <div className="statistics-item__content">
                                                    <h3 className="statistics-item__count">{dashboardData?.complete_course ?? 0}</h3>
                                                    <div className="statistics-item__image">
                                                        <Image src={frontendImage(content?.data_values?.image_two, 'user_dashboard')} alt="image" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="statistics-item">
                                                <p className="statistics-item__title">{trans(`Course instructor`)}</p>
                                                <div className="statistics-item__content">
                                                    <h3 className="statistics-item__count">{dashboardData?.total_instructor ?? 0}</h3>
                                                    <div className="statistics-item__image">
                                                        <Image src={frontendImage(content?.data_values?.image_three, 'user_dashboard')} alt="image" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-xxl-4">
                                    <div className="my-goal h-100">
                                        <div className="my-goal__wrapper">
                                            <h5 className="my-goal__header">
                                                {trans(`My goals`)}
                                            </h5>
                                            <div className="my-goal-block">
                                                <div className="flex-between gap-3 mb-3">
                                                    <p className="my-goal-block__title">{trans(`This week`)}</p>

                                                    <Link href="/user/goal" className="btn btn--sm btn-outline--dark">
                                                        <i className="fas fa-pen-alt"></i>
                                                        {trans(`set goal`)}
                                                    </Link>

                                                </div>
                                                <div className="my-goal-block__content">
                                                    <h2 className="my-goal-block__count">{dashboardData?.activity_count}</h2>
                                                    <p className="my-goal-block__text">{trans(`of`)} {dashboardData?.user_goal?.days} {trans(`days`)}</p>
                                                </div>

                                                <div className="weeks-calendar">
                                                    <ul className="weeks-calendar__list set-goal-calendar">
                                                        {['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'].map((day, index) => (
                                                            <li key={index}
                                                                className={`weeks-calendar__item ${(dashboardData?.activity_count - 1) >= index ? 'active' : ''}`}
                                                            >
                                                                <span className="text"></span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="my-goal-block">
                                                <div className="my-goal-block__content">
                                                    <h2 className="my-goal-block__count">{dashboardData?.active_weeks}</h2>
                                                    <p className="my-goal-block__text">{trans(`weeks in a row`)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>

                    }

                    <div className="purches-course mb-50">
                        <h5>{trans(`Enrolled Courses`)}</h5>
                        {
                            loading ? <Skeleton height={200} count={2} /> :
                                dashboardData?.purchase_courses?.length > 0 ?
                                    dashboardData?.purchase_courses?.map((purchase, index) => (
                                        <div key={index} className="created-course mb-4">
                                            <div className="created-course-header">
                                                <Link href={`/user/watch/${purchase?.course?.slug}`} className="flex-align gap-3 left">
                                                    <Image src={getCourseImage(purchase?.course?.image_path, purchase?.course?.image)} alt={trans(purchase?.course?.title)} className="created-course-img" />
                                                    <div className="created-course-details">

                                                        <h6 className="created-course-title mb-2">{trans(purchase?.course?.title)}</h6>
                                                        <p className="created-course-desc" dangerouslySetInnerHTML={{ __html: strLimit(purchase?.course?.description, 300) }}>
                                                        </p>
                                                        <span className="created-course-type">
                                                            {
                                                                purchase?.course?.level === 1 ? (
                                                                    <span>{trans(`Beginner Friendly`)}</span>
                                                                ) : purchase?.course?.level === 2 ? (
                                                                    <span >{trans(`Intermediate`)}</span>
                                                                ) : (
                                                                    <span>{trans(`Advanced`)}</span>
                                                                )
                                                            }

                                                        </span>
                                                    </div>
                                                </Link>

                                                <div className="created-course-actions">
                                                    <Link href={`/user/watch/${purchase?.course?.slug}`} className="edit-btn">
                                                        <i className="fas fa-eye"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="created-course-content">
                                                <div className="progress-wrapper">
                                                    <p className="progress-count">{purchase?.course?.progress}%</p>
                                                    <div className="progress">
                                                        <div className="progress-bar bg--success" style={{ width: purchase?.course?.progress + '%' }}>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    )) :
                                    <div className="text-center">
                                        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="120" height="120" rx="8" fill="#F5F5F5" />
                                            <path d="M30 30H90M30 50H90M30 70H60" stroke="var(--bs-primary)" strokeWidth="4" strokeLinecap="round" />
                                            <circle cx="85" cy="85" r="20" stroke="var(--bs-primary)" strokeWidth="4" />
                                            <path d="M95 85L85 85L85 75" stroke="var(--bs-primary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <h4 className="mt-4 text-muted">{trans(`No data available in table`)}</h4>
                                        <p className="text-primary">{trans(`Try adjusting your search or filter to find what you are looking for`)}.</p>
                                    </div>
                        }

                    </div>
                </div>
            </section>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{trans(`KYC Rejection Reason`)}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{user.kyc_rejection_reason}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {trans(`Close`)}
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}
