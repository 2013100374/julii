"use client"
import useUtility from '@/app/_hooks/useUtility'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import useInstructorLoginHandler from '../instructor/(auth)/login/_hooks/useInstructorLoginHandler';

export default function InstructorSidenav({handleToggle,show}) {
    const {trans} =useUtility();

    const [activeDropdown, setActiveDropdown] = useState(null);
    
    const toggleDropdown = (menu) => {
        setActiveDropdown(activeDropdown === menu ? null : menu);
    };
    const pathname = usePathname();
    const { logout } =useInstructorLoginHandler();
    
    return (
        <div className={`sidebar-menu  ${show ? 'show-sidebar' : ''}`}>
            <span className="sidebar-menu__close d-lg-none d-flex" onClick={handleToggle} ><i className="fas fa-times"></i></span>
            <ul className="sidebar-menu-list">
                <li className="sidebar-menu-list__item">
                    <Link href="/instructor/dashboard" className={`sidebar-menu-list__link ${pathname == '/instructor/dashboard' ?  'active' : ''}`}>
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="lucide lucide-layout-grid">
                                <rect width="7" height="7" x="3" y="3" rx="1" />
                                <rect width="7" height="7" x="14" y="3" rx="1" />
                                <rect width="7" height="7" x="14" y="14" rx="1" />
                                <rect width="7" height="7" x="3" y="14" rx="1" /></svg>
                        </span>
                        <span className="text">{trans(`Dashboard`)}</span>
                    </Link>
                </li>

                <li className={`sidebar-menu-list__item has-dropdown  ${activeDropdown === "course" || ['/instructor/course/list'].includes(pathname) ? "active" : ""}`}  onClick={() => toggleDropdown("course")}>
                    <Link href="#" className="sidebar-menu-list__link">
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="lucide lucide-file-video-2">
                                <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
                                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                                <rect width="8" height="6" x="2" y="12" rx="1" />
                                <path d="m10 15.5 4 2.5v-6l-4 2.5" /></svg>
                        </span>

                        <span className="text">{trans(`Course`)}</span>
                    </Link>
                    <div className={`sidebar-submenu ${activeDropdown == "course" || ['/instructor/course/list','/instructor/course/create'].includes(pathname) ? "d-block" : "d-none"}`}>
                        <ul className="sidebar-submenu-list">
                            <li className="sidebar-submenu-list__item ">
                                <Link onClick={handleToggle} href="/instructor/course/list" className={`sidebar-submenu-list__link submenu ${['/instructor/course/list'].includes(pathname) ? "active" : ""}`}>
                                    <span className="text">{trans('All Courses')}</span>
                                </Link>
                            </li>
                            <li className="sidebar-submenu-list__item">
                                <Link onClick={handleToggle} href="/instructor/course/create"  className={`sidebar-submenu-list__link submenu ${['/instructor/course/create'].includes(pathname) ? "active" : ""}`}>
                                    <span className="text">{trans(`Create Course`)}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>

                <li className="sidebar-menu-list__item">
                    <Link onClick={handleToggle} href="/instructor/enrollments" className={`sidebar-menu-list__link ${pathname == '/instructor/enrollments' ?  'active' : ''}`}>
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="lucide lucide-credit-card">
                                <rect width="20" height="14" x="2" y="5" rx="2" />
                                <line x1="2" x2="22" y1="10" y2="10" /></svg>
                        </span>
                        <span className="text">{trans('Enrollments')}</span>
                    </Link>
                </li>

                <li className="sidebar-menu-list__item">
                    <Link onClick={handleToggle} href="/instructor/student-overview" className={`sidebar-menu-list__link ${pathname == '/instructor/student-overview' ?  'active' : ''}`}>
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="lucide lucide-users">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /></svg>
                        </span>
                        <span className="text">{trans(`Students Overview`)}</span>
                    </Link>
                </li>

                <li className="sidebar-menu-list__item">
                    <Link onClick={handleToggle} href="/instructor/withdraw" className={`sidebar-menu-list__link ${pathname == '/instructor/withdraw' ?  'active' : ''}`}>
                        <span className="icon">
                        <i className="las la-wallet"></i>
                        </span>
                        <span className="text">{trans(`Withdraw`)}</span>
                    </Link>
                </li>
                <li className="sidebar-menu-list__item">
                    <Link onClick={handleToggle} href="/instructor/withdraw/history" className={`sidebar-menu-list__link ${pathname == '/instructor/withdraw/history' ?  'active' : ''}`}>
                        <span className="icon">
                        <i className="las la-list"></i>
                        </span>
                        <span className="text">{trans(`Withdraw History`)}</span>
                    </Link>
                </li>
                <li className="sidebar-menu-list__item">
                    <Link onClick={handleToggle} href="/instructor/review-list" className={`sidebar-menu-list__link ${pathname == '/instructor/review-list' ?  'active' : ''}`}>
                        <span className="icon">
                        <i className="lar la-star"></i>
                        </span>
                        <span className="text">{trans(`Reviews`)}</span>
                    </Link>
                </li>
                <li className="sidebar-menu-list__item">
                    <Link onClick={handleToggle} href="/instructor/support-ticket" className={`sidebar-menu-list__link ${pathname == '/instructor/support-ticket' ?  'active' : ''}`}>
                        <span className="icon">
                        <i className="la la-ticket"></i>
                        </span>
                        <span className="text">{trans(`Support Ticket`)}</span>
                    </Link>
                </li>
                <li className="sidebar-menu-list__item">
                    <Link onClick={handleToggle} href="/instructor/transactions" className={`sidebar-menu-list__link ${pathname == '/instructor/transactions' ?  'active' : ''}`}>
                        <span className="icon">
                        <i className="las la-exchange-alt"></i>
                        </span>
                        <span className="text">{trans(`Transactions`)}</span>
                    </Link>
                </li>


                <li>
                    <hr className="divider" />
                </li>

                <li className="sidebar-menu-list__item">
                    <Link onClick={handleToggle} href="/instructor/settings" className={`sidebar-menu-list__link ${pathname == '/instructor/settings' ?  'active' : ''}`}>
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="lucide lucide-settings">
                                <path
                                    d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                                <circle cx="12" cy="12" r="3" /></svg>
                        </span>
                        <span className="text">{trans(`Settings`)}</span>
                    </Link>
                </li>

                <li className="sidebar-menu-list__item">
                    <Link onClick={handleToggle} href="/instructor/two-factor-authentication" className={`sidebar-menu-list__link ${pathname == '/instructor/two-factor-authentication' ?  'active' : ''}`}>
                        <span className="icon">
                        <i className="las la-shield-alt"></i>
                        </span>
                        <span className="text">{trans(`2FA`)}</span>
                    </Link>
                </li>

                <li className="sidebar-menu-list__item">
                    <a href="#" onClick={logout} className="sidebar-menu-list__link">
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="lucide lucide-log-out">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" x2="9" y1="12" y2="12" />
                            </svg>
                        </span>
                        <span className="text">{trans(`Logout`)}</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}
