"use client";

import { useEffect, useRef, useState } from "react";
import { NavDropdown } from "react-bootstrap";

export default function Dropdown({children, title}) {
    const [showNav, setShowNav] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        setShowNav(false);
    }, []);

    const handleDropdownClick = () => {
        dropdownRef?.current?.querySelector('.dropdown-toggle')?.removeAttribute('href');
        setShowNav(!showNav);
    }

    return (
        <>
            <NavDropdown
                ref={dropdownRef}
                show={showNav}
                onToggle={handleDropdownClick}
                onClick={handleDropdownClick}
                title={title}
            >
                {children}
            </NavDropdown>
        </>
    )
}
