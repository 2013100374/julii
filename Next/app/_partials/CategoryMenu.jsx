"use client";

import { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import useUtility from "../_hooks/useUtility";
import Link from "next/link";

export default function CategoryMenu({handleClose}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect screen width and update `isMobile`
    useEffect(() => {
        const checkScreenSize = () => {
            const mobileView = window.innerWidth < 1200;
            setIsMobile(mobileView);
            if (!mobileView) {
                setIsOpen(false); // Ensure menu is closed when switching to desktop
            }
        };

        checkScreenSize(); // Initial check
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // Toggle menu only when on mobile
    const toggleMenu = () => {
        if (isMobile) {
            setIsOpen((prev) => !prev);
        }
    };

    const { data: categories } = useSelector((state) => state?.categories);
    const { trans } = useUtility();

    return (
        <li className="nav-item dropdown">
            <a
                className={`nav-link ${isMobile && isOpen ? "show" : ""}`}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded={isMobile && isOpen ? "true" : "false"}
                onClick={toggleMenu}
            >
                {trans(`Explore`)}
                <span className="nav-item__icon">
                    <i className="las la-angle-down"></i>
                </span>
            </a>
            <div className={`dropdown-menu mega-menu ${isMobile && isOpen ? "show" : ""}`}>
                <div className="container">
                    <div className="mega-menu-content">
                        <div className="mega-menu-left">
                            <h6 className="mega-menu-title">{trans(`Categories`)}</h6>
                            <div className="mega-menu-wrapper">
                                {categories?.map((category, index) => (
                                    <Link href={`/courses/catalog/${category?.slug}`} onClick={handleClose} key={index} className="mega-menu-item">
                                        <div className="mega-menu-item-image">
                                            <Image src={category?.image_path + '/' + category?.image} alt={trans(category?.name)} />
                                        </div>
                                        <div className="mega-menu-item-content">
                                            <h6 className="title">{trans(category?.name)}</h6>
                                            <p className="desc">{trans(category?.sort_description)}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}
