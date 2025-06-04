"use client";
import { getInstructor } from "@/lib/helpers";
import useUtility from "@/app/_hooks/useUtility";
import Widget from "./Widget";
import ChartWidget from "./ChartWidget";
import Link from "next/link";
import useDashboardHandler from "../_hooks/useDashboardHandler";


export default function Dashboard() {
    const user = getInstructor();
    const { dashboardData } = useDashboardHandler()
    const { trans } = useUtility();
    return (
        <>
            <div className="dashboard-body">
                <div className="dashboard-body-wrapper">
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
                                                <button className="alert__link" onClick={handleShow}>{trans(`Show Reason`)}</button>
                                                {trans(`Your KYC documents have been rejected. Please`)} <Link className="alert__link" href={'/instructor/kyc-verification'}>{trans(`re-submit kyc documents`)}</Link>.
                                                <Link className="alert__link" href={'/instructor/kyc-verification/data'}>{trans(`See KYC Data`)}</Link>
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {user?.kv == 0 && !user?.kyc_rejection_reason && (
                                    <div className="alert alert--info" role="alert">
                                        <div className="alert__icon">
                                            <i className="fas fa-exclamation-circle"></i>
                                        </div>
                                        <div className="alert__content">
                                            <h5 className="alert__title">{trans(`KYC Verification required`)}</h5>
                                            <p className="alert__desc">{trans(`KYC verification is required. Please`)} <Link className="alert__link" href={'/instructor/kyc-verification'}>{trans(`Submit documents`)}</Link>.</p>
                                        </div>
                                    </div>
                                )}
                                {user?.kv === 2 && (
                                    <div className="alert alert--warning" role="alert">
                                        <div className="alert__icon"><i className="las la-hourglass-half"></i>
                                        </div>
                                        <div className="alert__content">
                                            <h5 className="alert__title">{trans(`KYC Verification pending`)}</h5>
                                            <p className="alert__desc">{trans(`KYC verification is pending. Please`)} <Link className="alert__link" href={'/instructor/kyc-verification/data'}>{trans(`see KYC data`)}</Link>.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Widget dashboardData={dashboardData} user={user} />

                        <ChartWidget data={dashboardData} />
                    </div>
                </div>
            </div>
        </>


    );
}
