import useUtility from '@/app/_hooks/useUtility';
import React, { useEffect, useState } from 'react';
import Quizzes from './Quizzes';
import Lectures from './Lectures';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProgress } from '@/store/userSlice';
import { Button } from 'react-bootstrap';
import SubmitBtn from '@/app/_partials/SubmitBtn';
import { notifyToast, request } from '@/lib/helpers';
import ENDPOINTS from '@/lib/endpoints';
import SideBarSkeleton from './SideBarSkeleton';

export default function CourseSideBar({ course, setPlayLecture, playLecture, percentComplete, toggleSidenav, showSidebar, load }) {

    const { trans } = useUtility();
    const [openSection, setOpenSection] = useState(null);
    const dispatch = useDispatch();

    const toggleSection = (index) => {
        setOpenSection(openSection === index ? null : index);
    };

    const userProgress = useSelector((state) => state?.user?.progress);
    const [isComplete, setIsComplete] = useState(false);

    const [loading, setLoading] = useState(false);
    
    

    
    const [completedLectures, setCompletedLectures] = useState([]);
    
    useEffect(() => {
        if (!userProgress) {
            dispatch(setUserProgress(course?.progress));
        }
    }, [course?.progress, userProgress, dispatch]);


    useEffect(() => {
        setIsComplete(course?.is_complete);
    }, [course?.is_complete, setIsComplete]);
    
    
    const courseComplete = async (slug) => {
        if (!course) return;
        setLoading(true);
        try {
            const response = await request.get(`${ENDPOINTS.COURSE_COMPLETE}/${slug}`);
            
            if (response.status === 'error') {
                notifyToast(response?.data);
            }
            setIsComplete(true)
            setLoading(false);
            notifyToast(response.data);
        } catch (error) {
            setLoading(false);
            
            console.error("Error delete:", error);
        }
    };
    
    
    const getCertificate = async (slug) => {
        if (!course) return;
        setLoading(true);
        try {
            const response = await request.get(`${ENDPOINTS.GET_CERTIFICATE}/${slug}`, {
                responseType: 'blob'
            });
            
            if (response.status === 'error') {
                notifyToast(response?.data);
            }

            const contentType = response.headers['content-type'] || 'application/octet-stream';

            const extension = contentType.split('/')[1] || 'file';
            const name = `${slug}-certificate.${extension}`;

            const fileBlob = new Blob([response.data], { type: contentType });

            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(fileBlob);
            link.download = name;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);


            setLoading(false);

            notifyToast(response.data);
        } catch (error) {
            setLoading(false);

            console.error("Error delete:", error);
        }
    };

    return (
        <>
            {
                load ? <SideBarSkeleton /> :
                    <div className={`playlist-sidebar ${showSidebar ? 'show-playlist' : ''} `}>
                        <div className="playlist-header">
                            <span onClick={toggleSidenav} className="close-playcontent d-xl-none"><i className="las la-times"></i></span>
                            <div className="flex-end mt-2 gap-2">

                                {
                                    Math.round(userProgress) == 100 && !isComplete &&
                                    <SubmitBtn isSubmitting={loading} onClick={() => courseComplete(course?.slug)} className="btn btn--sm btn--success" title="Mark as Complete" />
                                }

                                {
                                    isComplete &&
                                    <SubmitBtn isSubmitting={loading} onClick={() => getCertificate(course?.slug)} className="btn btn--sm btn--secondary" title="Get Certificate" />
                                }
                            </div>

                            <p className="playlist-header__title">{Math.round(userProgress)}% {trans(`completed`)}</p>
                            <div className="progress">
                                <div className="progress-bar bg--success" role="progressbar"
                                    style={{ width: `${Math.round(userProgress)}%` }}
                                    aria-valuenow={Math.round(userProgress)}
                                    aria-valuemin="0"
                                    aria-valuemax="100">
                                </div>
                            </div>

                        </div>
                        <div className="accordion playlist--accordion" id="playlist">
                            {course?.sections?.map((section, index) => {

                                return (<div key={index} className="accordion-item">
                                    <h5 className="accordion-header">
                                        <button className="accordion-button" type="button" onClick={() => toggleSection(index)} aria-expanded={openSection === index}>
                                            <span className="collapse-icon">
                                                <i className="fas fa-caret-up"></i>
                                            </span>
                                            <span className="accordion-header__content">
                                                <small className="accordion-header__title">{trans(section?.title)}</small>
                                                <small className="accordion-header__timeline">
                                                    {section?.section_item?.lectures} {trans('lectures')} • {section?.total_duration} • {section?.section_item?.quizzes ?? 0} {trans('quiz')} •
                                                    {trans('finish')} ({section?.curriculum_complate + (completedLectures.filter(l => section.curriculums.some(cur => cur.id === l)).length)}/{
                                                        (section?.section_item?.lectures || 0) +
                                                        (section?.section_item?.quizzes || 0)
                                                    })
                                                </small>
                                            </span>
                                        </button>
                                    </h5>
                                    <div
                                        id={`section-${index}`}
                                        className={`accordion-collapse collapse ${openSection === index ? 'show' : ''}`}
                                        data-bs-parent="#playlist"
                                    >
                                        <div className="accordion-body">
                                            <div className="course-video">
                                                <ul className="course-video__list">
                                                    {section?.curriculums?.map((curriculum, curIndex) => (
                                                        <div key={curIndex}>
                                                            {curriculum?.lectures && curriculum.lectures.length > 0 && <Lectures curriculum={curriculum} curIndex={curIndex + 1} setPlayLecture={setPlayLecture} playLecture={playLecture} setCompletedLectures={setCompletedLectures} percentComplete={percentComplete} />}
                                                            {curriculum?.quizzes && curriculum.quizzes.length > 0 && <Quizzes curriculum={curriculum} curIndex={curIndex + 1} setCompletedLectures={setCompletedLectures} />}
                                                        </div>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            }
                            )}
                        </div>
                    </div>
            }
        </>

    );
}
