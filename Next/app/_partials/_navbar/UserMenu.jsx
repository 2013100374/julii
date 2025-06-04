import { Dropdown, Image } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getProfileImage } from "@/lib/helpers";

export function UserMenu({ fullName, trans, logout, isInstructor ,handleClose }) {

    const { data: userData } = useSelector((state) => state?.user);
    const { data: instructorData } = useSelector((state) => state?.instructor);

    const [isOpen, setIsOpen] = useState(false);
    const menuItems = instructorData
        ? [
            { href: "/instructor/dashboard", icon: "las la-home", label: trans("Dashboard") },
            { href: "/instructor/settings", icon: "las la-user", label: trans("My Profile") },
            { href: "/instructor/two-factor-authentication", icon: "las la-shield-alt", label: trans("2FA") },
            { href: "#", icon: "las la-sign-out-alt", label: trans("Logout"), action: logout },
        ]
        : [
            { href: "/user/dashboard", icon: "las la-home", label: trans("Dashboard") },
            { href: "/user/profile", icon: "las la-user", label: trans("My Profile") },
            { href: "/user/deposit/history", icon: "las la-dollar-sign", label: trans("Deposit History") },
            { href: "/user/transactions", icon: "las la-exchange-alt", label: trans("Transaction") },
            { href: "/user/goal", icon: "las la-cog", label: trans("Setting ") },
            { href: "/user/support-ticket", icon: "las la-headset", label: trans("Support") },
            { href: "#", icon: "las la-sign-out-alt", label: trans("Logout"), action: logout },
        ];




    return (
        <Dropdown
            className="user-profile"
            onToggle={(isOpen) => setIsOpen(isOpen)}
        >
            <Dropdown.Toggle
                className="user-profile-info"
                as="div"
                id="dropdown-custom-components"
            >
                <span className="user-profile-info__image flex-center">
                    {
                        instructorData ?

                            <Image src={getProfileImage(instructorData?.profile_path, instructorData?.image)} alt="profile-image" />

                            :
                            <Image src={getProfileImage(userData?.profile_path, userData?.profile_image)} alt="profile-image" />
                    }
                </span>

                <div className="user-profile-info__content">
                    <h6 className="user-profile-info__name">{fullName}</h6>
                    <div className="flex-align gap-2">
                        <p className="user-profile-info__desc">{trans("Details")}</p>
                        <button className="user-profile-dots" type="button">
                            <i className={`fas ${isOpen ? "fa-angle-up" : "fa-angle-down"}`}></i>
                        </button>
                    </div>
                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="user-profile-menu">
                {menuItems.map((item, index) => (
                    <Dropdown.Item as="div" key={index}>
                        <Link
                            href={item.href}
                            className="user-info-link"
                            onClick={(e) => {
                                if (handleClose) handleClose(); // Close the side nav
                                if (item.action) item.action(); // Execute the logout function if applicable
                            }}
                        >
                            <span className="icon">
                                <i className={item.icon}></i>
                            </span>
                            {item.label}
                        </Link>
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>

        </Dropdown>
    );
}
