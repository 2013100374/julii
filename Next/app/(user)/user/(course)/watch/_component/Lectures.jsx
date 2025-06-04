import useUtility from '@/app/_hooks/useUtility';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useWatchHandler from '../_hooks/useWatchHandler';
import { Dropdown, DropdownButton, Modal } from 'react-bootstrap';

export default function Lectures({ curriculum, curIndex, setPlayLecture, playLecture, setCompletedLectures, percentComplete, toggleSidenav }) {
    const { trans } = useUtility();
    const dropButtonRef = useRef();

    const { completeCurriculum, resourcesDownload, submitActivity } = useWatchHandler();

    const [isCompleted, setIsCompleted] = useState(curriculum?.is_completed);

    const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
    const [previewArticle, setPreviewArticle] = useState([]);

    const [requestSent, setRequestSent] = useState(false);
    const [curriculumId, setCurriculumId] = useState(0);

    const closeArticleModal = () => setIsArticleModalOpen(false);
    const openArticleModal = () => setIsArticleModalOpen(true);

    
    const handleCheckboxChange = useCallback((curriculumId) => {
            setIsCompleted(!isCompleted);
            setCompletedLectures((prev) => [...prev, curriculumId]);
            completeCurriculum(curriculum?.id, true);
        
    }, [setIsCompleted, setCompletedLectures, completeCurriculum, curriculum?.id,isCompleted]);
    
    useEffect(() => {
        if (curriculumId && percentComplete >= 80 && !requestSent) {
            handleCheckboxChange(curriculumId);
            setRequestSent(true); 
        }
    }, [percentComplete, curriculumId, handleCheckboxChange, requestSent]);
    
    
    return (
        <>
            <ul>
                {curriculum?.lectures?.map((lecture, index) => (
                    <li
                        key={index}
                        className={`course-video-item ${playLecture?.id === lecture?.id ? 'active' : ''}`}
                        onClick={(e) => {
                            if (dropButtonRef.current && dropButtonRef.current.contains(e.target)) {
                                return;
                            }
                            submitActivity();
                            if (lecture?.content_type === 1) {
                                setCurriculumId(curriculum?.id)
                                setPlayLecture(lecture);
                            } else {
                                openArticleModal();
                                setPreviewArticle(lecture);
                            }
                        }}
                    >
                        <div className="course-video-item__left">
                            <div className="form--check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={isCompleted}
                                    onChange={() => handleCheckboxChange(curriculum?.id)}
                                />
                                <label className="form-check-label">
                                    
                                    {curIndex}. {trans(lecture?.title)}
                                </label>
                            </div>
                        </div>
                        <div className="course-video-item__right">
                            {lecture?.resources?.length > 0 ? (
                                <DropdownButton
                                    ref={dropButtonRef}
                                    id="dropdown-basic-button"
                                    className="dropdown--btn"
                                    drop="down"
                                    as="div"
                                    title="Resources"
                                >
                                    {lecture?.resources?.map((resource, index) => (
                                        <Dropdown.Item
                                            key={index}
                                            as="button"
                                            onClick={() => resourcesDownload(resource?.id)}
                                            className="mb-2"
                                        >
                                            <i className="las la-download"></i> {resource?.file}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            ) : lecture?.content_type === 1 ? (
                                <>
                                    <span className="icon">
                                        {playLecture?.id === lecture?.id ? <i className="fas fa-pause"></i> : <i className="las la-play"></i>}
                                    </span>
                                    <span className="inner-text">{lecture?.video_duration}</span>
                                </>
                            ) : (
                                <span
                                    className="inner-text"
                                    onClick={() => {
                                        openArticleModal();
                                        setPreviewArticle(lecture);
                                    }}
                                >
                                    {trans('Article')}
                                </span>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            {/* Article Modal */}
            <Modal show={isArticleModalOpen} size="lg" onHide={closeArticleModal} centered>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div>
                        <p dangerouslySetInnerHTML={{ __html: previewArticle?.article }}></p>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
