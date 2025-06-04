"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";

import useUtility from "@/app/_hooks/useUtility";
import { getInstructor, getUser } from "@/lib/helpers";
import { setUserData } from "@/store/userSlice";

import { Logo } from "./Logo";

import LangControl from "../LangControl";
import { UserMenu } from "./UserMenu";
import CategoryMenu from "../CategoryMenu";
import useLoginHandler from "@/app/(frontend)/(auth)/login/_hooks/useLoginHandler";
import { setInstructorData } from "@/store/instructorSlice";
import useInstructorLoginHandler from "@/app/(instructor)/instructor/(auth)/login/_hooks/useInstructorLoginHandler";
import Search from "./Search";

export default function Navbar() {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { trans } = useUtility();
    const { data: userData } = useSelector((state) => state?.user);
    const { data: instructorData } = useSelector((state) => state?.instructor);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isInstructorLoggedIn, setIsInstructorLoggedIn] = useState(false);
    const userLogin = useLoginHandler();
    const instructorLogin = useInstructorLoginHandler();
    const { logout } = isLoggedIn ? userLogin : instructorLogin;
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(setUserData(getUser()));
        dispatch(setInstructorData(getInstructor()));
    }, [dispatch]);


    useEffect(() => {
        setIsLoggedIn(!!userData);
    }, [userData]);


    useEffect(() => {
        setIsInstructorLoggedIn(!!instructorData);
    }, [instructorData]);



    const fullName = useMemo(() => {

        if (instructorData) {
            return `${instructorData.firstname || ""} ${instructorData.lastname || ""}`;
        }
        if (userData) {
            return `${userData.firstname || ""} ${userData.lastname || ""}`;
        }
        return "";
    }, [instructorData, userData]);





    const authLinks = useMemo(
        () => [
            { title: "Login", url: "/login", active: pathname === "/login", className: "btn--transparent" },
            { title: "Register", url: "/register", active: pathname === "/register", className: "btn--base" },
        ],
        [pathname]
    );

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <header className="header" id="header">
            <div className="container">
                <nav className="navbar navbar-expand-xl navbar-light">
                    <Logo mode="dark" />
                    <button className="navbar-toggler header-button" type="button" onClick={handleShow}>
                        <span id="hiddenNav">
                            <i className="las la-bars"></i>
                        </span>
                    </button>


                    <div className={`offcanvas offcanvas-start border-0 ${show ? "show" : ""}`} tabIndex="-1">
                        <div className="offcanvas-header" >
                            <Logo />
                            <button type="button" className="btn-close btn-light" onClick={handleClose}>
                                <i className="las la-times"></i>
                            </button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav nav-menu align-items-xl-center justify-content-center w-100">
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" href="/courses" onClick={handleClose}>
                                        {trans(`Courses`)}
                                    </Link>
                                </li>

                                <CategoryMenu handleClose={handleClose} />

                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" href="/about" onClick={handleClose}>
                                        {trans(`About`)}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" href="/blogs" onClick={handleClose}>
                                        {trans(`Blogs`)}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/contact" onClick={handleClose}>
                                        {trans(`Contact Us`)}
                                    </Link>
                                </li>

                                <li className="nav-item d-xl-none">
                                    {!isLoggedIn && !isInstructorLoggedIn && <NavLinks links={authLinks} trans={trans} onClick={handleClose} />}
                                </li>

                                <li className="nav-item d-xl-none">
                                    {(isLoggedIn || isInstructorLoggedIn) && <UserMenu fullName={fullName} trans={trans} logout={logout} handleClose={handleClose} />}
                                </li>
                            </ul>
                        </div>

                    </div>


                    <div className="header-right">
                        <Search />
                        <div className="header-right__button d-none d-xl-flex">
                           
                            {(isLoggedIn || isInstructorLoggedIn) ? (
                                <UserMenu fullName={fullName} trans={trans} logout={logout} isInstructor={isInstructorLoggedIn} />
                            ) : (
                                <NavLinks links={authLinks} trans={trans} />
                            )}
                        </div>

                        <LangControl />
                    </div>
                </nav>
            </div>
        </header>
    );
}

function NavLinks({ links, trans }) {
    return (
        <>
            {links.map((link, index) => (
                <Link key={index} href={link.url} className={`btn ${link.className}`}>
                    {trans(link.title)}
                </Link>
            ))}
        </>
    );
}

function CustomPageLinks({ pages, pathname, trans }) {
    return (
        <>
            {pages?.map((page, index) => (
                page?.is_default == 0 && <li key={index} className="nav-item">
                    <Link href={`/${page.slug}`} className={`nav-link ${pathname === "/" + page.slug ? "active" : ""}`}>
                        {trans(page.name)}
                    </Link>
                </li>
            ))}
        </>
    );
}
