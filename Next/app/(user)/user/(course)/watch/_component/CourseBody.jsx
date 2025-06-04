
import useUtility from '@/app/_hooks/useUtility';
import VideoPlayer from '@/app/_partials/VideoPlayer';
import { showDateTime } from '@/lib/helpers';

import React, { useEffect, useState } from 'react'
import LectureTab from './LectureTab';
import Rating from '@/app/_partials/Rating';
import CourseUsers from '@/app/_partials/CourseUsers';

import CourseBodySkeleton from './CourseBodySkeleton';
import { Button } from 'react-bootstrap';

export default function CourseBody({ course, playLecture, enrollUsers, setPercentComplete, toggleSidenav, loading }) {

    const { trans } = useUtility();
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const percentageWatched = duration > 0 ? (currentTime / duration) * 100 : 0;


    useEffect(() => {
        setPercentComplete(percentageWatched);
    }, [percentageWatched, setPercentComplete])



    


    return (

        <>

            {loading ? <CourseBodySkeleton /> :
                <div className="courses-body">
                    <div className="video-info">
                        <VideoPlayer className="watch-video-preview w-100" onTimeUpdate={setCurrentTime}
                            onLoadedMetadata={setDuration} videoSrc={playLecture ? playLecture?.video_path + '/' + playLecture?.file : course?.intro_path + '/' + course?.intro} />
                    </div>

                    <div  className="lecture-content">
                        <Button onClick={toggleSidenav} className="play-content d-xl-none">
                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round" className="lucide lucide-list-end">
                                    <path d="M16 12H3" />
                                    <path d="M16 6H3" />
                                    <path d="M10 18H3" />
                                    <path d="M21 6v10a2 2 0 0 1-2 2h-5" />
                                    <path d="m16 16-2 2 2 2" />
                                </svg>
                            </span>
                            {trans(`Play List`)}
                        </Button>
                        <div className="lecture-info">
                            <h5 className="lecture-info__title">{trans(`Welcome to the course`)}</h5>
                            <div className="lecture-info__wrapper">
                                <div className="course-learners flex-shrink-0">
                                    <ul className="course-learners__group">
                                        {enrollUsers?.length > 0 && <CourseUsers users={enrollUsers} />}
                                    </ul>
                                    <div className="course-learners__content">
                                        <span className="count">{course?.purchases?.length} {trans(`learners enrolled`)}</span>
                                    </div>
                                </div>
                                <ul className="lecture-info__list">
                                    <li className="lecture-info__item">
                                        <span className="text">{trans(`Last updated`)}:</span>
                                        <span className="value">{showDateTime(course?.updated_at, 'DD MMM YYYY')}</span>
                                    </li>
                                    <li className="lecture-info__item">
                                        <span className="text">{trans(`Rating`)}:</span>
                                        <span className="value">
                                            <Rating rating={course?.ratings?.avg_rating} />
                                        </span>

                                    </li>
                                </ul>
                            </div>
                        </div>
                        <LectureTab course={course} />
                    </div>
                </div>}
        </>

    )
}