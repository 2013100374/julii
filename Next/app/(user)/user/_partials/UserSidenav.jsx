import useLoginHandler from '@/app/(frontend)/(auth)/login/_hooks/useLoginHandler';
import useUtility from '@/app/_hooks/useUtility';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function UserSidenav({ showSidebar, toggleSidenav }) {
    const { trans } = useUtility();
    const pathname = usePathname();
    const { logout } = useLoginHandler();
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleDropdown = () => {
        setActiveDropdown(!activeDropdown);
    };


    const settingsPaths = ['/user/account-setting', '/user/goal', '/user/two-factor-authentication'];


    const isSettingActive = settingsPaths.some((path) => pathname.includes(path));

    useEffect(() => {
        if (isSettingActive) {
            setActiveDropdown(true);
        }
    }, [pathname, isSettingActive]);

    return (
        <div className={`dashboard-sidebar ${showSidebar ? 'show-sidebar' : ''}`}>
            <button onClick={toggleSidenav} className="dashboard-sidebar__close d-xl-none">
                <i className="las la-times"></i>
            </button>
            <ul className="side-nav">
                <li className="side-nav__list">
                    <Link onClick={toggleSidenav}  href="/user/dashboard"  className="side-nav__link">
                        {trans(`My Home`)}
                    </Link>
                </li>
                <li className="side-nav__list">
                    <Link onClick={toggleSidenav}  href="/user/profile" className={`side-nav__link ${pathname === '/user/profile' ? 'active' : ''}`}>
                        {trans(`Profile Setting`)}
                    </Link>
                </li>
                <li className="side-nav__list">
                    <Link onClick={toggleSidenav}  href="/user/deposit-amount" className={`side-nav__link ${pathname === '/user/deposit-amount' ? 'active' : ''}`}>
                        {trans(`Deposit Now`)}
                    </Link>
                </li>
                <li className="side-nav__list">
                    <Link onClick={toggleSidenav}  href="/user/deposit/history" className={`side-nav__link ${pathname === '/user/deposit/history' ? 'active' : ''}`}>
                        {trans(`Deposit History`)}
                    </Link>
                </li>
                <li className="side-nav__list">
                    <Link onClick={toggleSidenav}  href="/user/purchase-history" className={`side-nav__link ${pathname === '/user/purchase-history' ? 'active' : ''}`}>
                        {trans(`Purchase History`)}
                    </Link>
                </li>
                <li className="side-nav__list">
                    <Link onClick={toggleSidenav}  href="/user/support-ticket" className={`side-nav__link ${pathname === '/user/support-ticket' ? 'active' : ''}`}>
                        {trans(`Support Ticket`)}
                    </Link>
                </li>
                <li className="side-nav__list">
                    <Link onClick={toggleSidenav}  href="/user/transactions" className={`side-nav__link ${pathname === '/user/transactions' ? 'active' : ''}`}>
                        {trans(`Transaction`)}
                    </Link>
                </li>
                <li className="side-nav__list">
                    <Link onClick={toggleSidenav}  href="/user/change-password" className={`side-nav__link ${pathname === '/user/change-password' ? 'active' : ''}`}>
                        {trans(`Change Password`)}
                    </Link>
                </li>
                <li className="side-nav__list">
                    <Link onClick={toggleSidenav}  href="/user/account-delete" className={`side-nav__link ${pathname === '/user/account-delete' ? 'active' : ''}`}>
                        {trans(`Delete Account`)}
                    </Link>
                </li>

                <li
                    className={`sidebar-menu-list__item side-nav__list has-dropdown ${activeDropdown ? 'active' : ''}`}

                >
                    <Link   href="javascript:void(0)" onClick={() => {
                        toggleDropdown();
                        toggleSidenav
                    }} className="sidebar-menu-list__link side-nav__link">
                        <span className="text">{trans(`Settings`)}</span>
                    </Link>
                    <div className={`sidebar-submenu ${activeDropdown ? 'd-block' : 'd-none'}`}>
                        <ul className="sidebar-submenu-list">
                            <li className="side-nav__list">
                                <Link onClick={toggleSidenav}  href="/user/goal" className={`side-nav__link ${pathname === '/user/goal' ? 'active' : ''}`}>
                                    {trans(`Goal Set`)}
                                </Link>
                            </li>
                            <li className="side-nav__list">
                                <Link onClick={toggleSidenav}  href="/user/two-factor-authentication" className={`side-nav__link ${pathname === '/user/two-factor-authentication' ? 'active' : ''}`}>
                                    {trans(`Two Factor Authentication`)}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>

                {/* Log out link */}
                <li className="side-nav__list">
                    <Link   href="#" onClick={logout} className="side-nav__link">
                        {trans(`Log Out`)}
                    </Link>
                </li>
            </ul>
        </div>
    );
}
