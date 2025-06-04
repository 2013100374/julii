"use client";
import { useSelector } from "react-redux";
import Navbar from "../_partials/_navbar/Navbar";
import Footer from "../_partials/Footer";
import Topnav from "./_partials/topnav";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import InstructorSidenav from "./_partials/InstructorSidenav";



export default function RootLayout({ children }) {
    const { data: instructorData } = useSelector((state) => state?.instructor);
    const [isInstructorLoggedIn, setIsInstructorLoggedIn] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsInstructorLoggedIn(!!instructorData);
    }, [instructorData]);

    const [show , setShow] = useState(false);
    const handleToggle = () => setShow(!show);

    let showNavBar = true;

    const instructorRouteArr = [
        "/instructor/login",
        "/instructor/profile-data",
        "/instructor/authorization"
    ];


    if (isInstructorLoggedIn && !instructorRouteArr.includes(pathname) && !pathname.startsWith("/user")) {
        showNavBar = false;
    }


    
    return (
        <>
            
            {!showNavBar ? (
                <>
                    <Topnav handleToggle={handleToggle} />
                    <div className="dashboard position-relative">
                        <div className="dashboard__inner">
                            <InstructorSidenav handleToggle={handleToggle} show={show} /> 
                            {children}
                        </div>
                    </div>
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
