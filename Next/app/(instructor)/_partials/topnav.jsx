import useLoginHandler from "@/app/(frontend)/(auth)/login/_hooks/useLoginHandler";
import useUtility from "@/app/_hooks/useUtility";
import { Logo } from "@/app/_partials/_navbar/Logo";

import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import useInstructorLoginHandler from "../instructor/(auth)/login/_hooks/useInstructorLoginHandler";

import { UserMenu } from "@/app/_partials/_navbar/UserMenu";
import LangControl from "@/app/_partials/LangControl";

export default function Topnav({handleToggle}) {


    const { trans } = useUtility();
    const { data: instructorData } = useSelector((state) => state?.instructor);
    const { data: userData } = useSelector((state) => state?.user);
    const [isInstructorLoggedIn, setIsInstructorLoggedIn] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const instructorLoginHandler = useInstructorLoginHandler();
    const userLoginHandler = useLoginHandler();

    const { logout } = isInstructorLoggedIn ? instructorLoginHandler : userLoginHandler;


    useEffect(() => {
        setIsInstructorLoggedIn(!!instructorData);
    }, [instructorData]);


    useEffect(() => {
        setIsLoggedIn(!!userData);
    }, [userData]);


    const fullName = useMemo(() => {
        if (instructorData) {
            return `${instructorData.firstname || ""} ${instructorData.lastname || ""}`;
        }
        if (userData) {
            return `${userData.firstname || ""} ${userData.lastname || ""}`;
        }
        return "";
    }, [instructorData, userData]);



    return (
        <header className="header auth-header position-sticky top-0" id="header">
            <div className="container-fluid">
                <nav className="navbar">
                    <Logo mode="dark" />
                    <div className="header-right">

                        <button onClick={handleToggle} className="dashboard-body__bar-icon d-xl-none">
                            <i className="las la-bars"></i>
                        </button>

                        <div className="user-profile dropdown d-none d-md-block">

                        {<UserMenu fullName={fullName} trans={trans} logout={logout} isInstructor={isInstructorLoggedIn} />}
                        </div>

                        <LangControl />
                    </div>
                </nav>
            </div>
        </header>
    );


}