'use client'
import useUtility from '@/app/_hooks/useUtility';
import { getCourseDetails } from '@/lib/helpers';
import { setCourseData } from '@/store/courseSlice';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import React, { useEffect } from 'react'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useDispatch, useSelector } from 'react-redux';
import useCourseHandler from './_hooks/useCourseHandler';
import { Button } from '@/app/_partials/Button';
import NotFound from '@/app/not-found';

export default function RootLayout({ children }) {
    const pathname = usePathname();
    const { trans } = useUtility();
    const dispatch = useDispatch();
    const params = useParams();
    const { slug } = params;



    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const data = await getCourseDetails(slug);
                dispatch(setCourseData(data));
            } catch (error) {
                return NotFound();
            }
        };
        fetchCourseDetails();
    }, [slug, dispatch]);



    const { submitCourse, loading } = useCourseHandler(slug);
    const { data: courseData } = useSelector((state) => state?.course);



    const instructorRouteArr = [
        "/instructor/course/create",
        "/instructor/course/list",
    ];

    if (instructorRouteArr.includes(pathname)) {
        return (
            <>
                <div className="dashboard-body">
                    <div className="dashboard-body-wrapper">
                        <div className="container">
                            {children}
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="dashboard-body">
            <div className="dashboard-body-wrapper">
                <div className="container">
                    <div className="flex-between mb-4">
                        <h4 className="mb-0">{trans('Create Course')}</h4>
                        <div className="flex-align gap-3">
                            <Link href={`/course-details/${slug}`} target='_blank' className="btn btn-outline--dark btn--sm">
                                <span className="icon">
                                    <i className="far fa-eye"></i>
                                </span>
                                {trans(`Preview`)}
                            </Link>
                            {
                                courseData?.status == 0 &&
                                <Button loading={loading} onClick={submitCourse} className="btn btn--base btn--sm" icon={<i className="far fa-save"></i>} label="Submit for Review" />
                            }

                        </div>
                    </div>
                    <div className="upload-course">
                        {menuVar(trans, pathname, slug)}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

const menuVar = (trans, pathname, slug) => {
    const basePath = pathname.substring(0, pathname.lastIndexOf('/'));

    return (
        <>
            <div className="upload-menu">
                <ul className="upload-menu-list">
                    <li className="upload-menu-item">
                        <Link href={`/instructor/course/intended-learners/${slug}`} className={`upload-menu-label ${basePath === '/instructor/course/intended-learners' && 'active'}`} >
                            <input type="radio" name="upload-menu" id="intended-course" />
                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round"
                                    className="lucide lucide-file-lines">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <path d="M14 2v6h6M16 13H8M10 17h4" />
                                </svg>
                            </span>
                            <span>{trans(`Intended learners`)}</span>
                        </Link>
                    </li>
                    <li className="upload-menu-item">
                        <Link href={`/instructor/course/curriculum/${slug}`} className={`upload-menu-label ${basePath === '/instructor/course/curriculum' && 'active'}`}>
                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round"
                                    className="lucide lucide-video">
                                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                </svg>
                            </span>
                            <span>{trans(`Course Curriculum`)}</span>
                        </Link>

                    </li>
                    <li className="upload-menu-item">
                        <Link href={`/instructor/course/content/${slug}`} className={`upload-menu-label ${basePath === '/instructor/course/content' && 'active'}`}>

                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round"
                                    className="lucide lucide-image">
                                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <path d="M21 15 16 21H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5.5" />
                                </svg>
                            </span>
                            <span>{trans(`Course Content`)}</span>
                        </Link>
                    </li>
                    <li className="upload-menu-item">
                        <Link href={`/instructor/course/price/${slug}`} className={`upload-menu-label ${basePath === '/instructor/course/price' && 'active'}`}>

                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round"
                                    className="lucide lucide-gem">
                                    <path d="M6 3h12l4 6-10 13L2 9Z" />
                                    <path d="M11 3 8 9l4 13 4-13-3-6" />
                                    <path d="M2 9h20" />
                                </svg>
                            </span>

                            <span>{trans(`Course Pricing`)}</span>
                        </Link>
                    </li>
                    <li className="upload-menu-item">
                        <Link href={`/instructor/course/message/${slug}`} className={`upload-menu-label ${basePath === '/instructor/course/message' && 'active'}`}>
                            <input type="radio" name="upload-menu" id="course-message" />
                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round"
                                    className="lucide lucide-messages-square">
                                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" />
                                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                                </svg>
                            </span>
                            <span>{trans(`Course Message`)}</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}
