"use client";

import Navbar from "@/app/_partials/_navbar/Navbar";
import Footer from "@/app/_partials/Footer";
import { useParams, usePathname } from "next/navigation";
import UserSidenav from "./_partials/UserSidenav";
import { useState } from "react";




export default function RootLayout({ children }) {

    let showNavBar = true;
    const pathname = usePathname();

    const params = useParams();
    const { slug } = params;


    

    const [showSidebar, setShowSiteBar] = useState(false);
    // toggleSidenav
    const toggleSidenav = () => setShowSiteBar(!showSidebar);

    const userRouteArr = [
        '/user/account-setting',
        '/user/account-delete',
        '/user/purchase-history',
        '/user/goal',
        '/user/support-ticket',
        '/user/profile',
        '/user/change-password',
        '/user/support-ticket/create',
        '/user/two-factor-authentication',
        '/user/transactions',
        '/user/deposit-amount',
        '/user/deposit/confirmation',
        '/user/deposit/history'
    ];

    if (!userRouteArr.includes(pathname) && pathname.startsWith("/user")) {
        showNavBar = false;
    }

    return (
        <>
            {showNavBar ? (
                <>
                    <Navbar />
                    <div className="account-settting py-50">
                        <div className="container">
                            <div className="dashboard-wrapper">

                                <UserSidenav showSidebar={showSidebar} toggleSidenav={toggleSidenav} />
                                <div className="dashboard-main">
                                    <button onClick={toggleSidenav} className="account-sidebar-show d-xl-none"><i className="las la-bars"></i></button>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </>
            ) : (

                <>
                    <Navbar />
                    {children}
                    <Footer />
                </>
            )}
        </>
    );


}
