import React, { useState } from 'react'
import LectureHeader from './LectureHeader'
import LectureContent from './LectureContent';
import useCourseHandler from '../../_hooks/useCourseHandler';
import useUtility from '@/app/_hooks/useUtility';
import ArticleSubmitForm from './ArticleSubmitForm';
import VideoUploadForm from './VideoUploadForm';
import ResourceUploadForm from './ResourceUploadForm';

export default function Lecture({ curriculum,slug  }) {
    
    const [showLectureContent, setLectureContent] = useState(false);
    const [showVideoWrape, setVideoWrape] = useState([{ index: 0, type: '' }]);

    const [replaceVideo, setReplaceVideo] = useState(null);
    const [showContent, setContent] = useState(false);
    
    const {loading} = useCourseHandler(slug);
    const {trans} =useUtility();

    const toggleContentBtn = (index) => {
        if (showLectureContent === index) {
            setLectureContent(null);
            setVideoWrape([{ index: 0, type: '' }]);
        } else {
            setLectureContent(index);
            setVideoWrape([{ index: 0, type: '' }]);
        }
        setReplaceVideo(null);
    };

    const toggleReplaceVideo = (lectureId) => {
        setReplaceVideo(replaceVideo === lectureId ? null : lectureId);
    };

    const toggleVideoBtn = (index, type) => {
        if (showVideoWrape[0]?.index === index) {
            setVideoWrape([{ index: 0, type: '' }]);
        } else {
            setVideoWrape([{ index: index, type: type }]);
        }
    };

    const toggleContent = (index) => {
        if (showContent === index) {
            setContent(null);
        } else {
            setContent(index);
        }
    };

    

    
    return (
        <>
            {curriculum?.lectures?.length > 0 && curriculum?.lectures?.map((lecture, lectureIndex) => {
                return (
                    <div key={lectureIndex} className="course-lecture mb-4">

                        <LectureHeader lecture={lecture} lectureIndex={lectureIndex} showLectureContent={showLectureContent} toggleContentBtn={() => toggleContentBtn(lectureIndex + 1)} toggleContent={() => toggleContent(lectureIndex + 1)} showContent={showContent} slug={slug} />
                      
                        <div className="course-lecture-body">
                            {lecture?.content_type === 0 && showLectureContent === lectureIndex + 1 &&
                                <div className="course-lecture-file">
                                    <div className="course-lecture-file-title">
                                        <span className="text">{trans('Upload Content File')}</span>
                                        <button
                                            type="button"
                                            onClick={() => toggleContentBtn(lectureIndex + 1)}
                                            className="cross-icon"
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>

                                    {showVideoWrape[0]?.index !== lectureIndex + 1 && !showVideoWrape[0]?.type ? (
                                        <div className="course-lecture-file-menu">
                                            <button
                                                type="button"
                                                onClick={() => toggleVideoBtn(lectureIndex + 1, 'video')}
                                            >
                                                <span className="icon">
                                                    <i className="fas fa-play-circle"></i>
                                                </span>
                                                <span className="text">{trans('Video')}</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => toggleVideoBtn(lectureIndex + 1, 'article')}
                                            >
                                                <span className="icon">
                                                    <i className="far fa-file"></i>
                                                </span>
                                                <span className="text">{trans('Article')}</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => toggleVideoBtn(lectureIndex + 1, 'resources')}
                                            >
                                                <span className="icon">
                                                    <i className="far fa-file-alt"></i>
                                                </span>
                                                <span className="text">{trans('Resources')}</span>
                                            </button>
                                        </div>
                                    ) : (
                                        showVideoWrape[0]?.type === 'video' && lecture?.content_type === 0 ?
                                            (<VideoUploadForm  lecture={lecture} slug={slug} onCancel={() => toggleContentBtn(lectureIndex + 1)} />) 
                                            :
                                             showVideoWrape[0]?.type === 'resources' ?  (<ResourceUploadForm  lecture={lecture} slug={slug}
                                                onCancel={() => toggleContentBtn(lectureIndex + 1)}
                                            />)  :

                                            (<ArticleSubmitForm  lecture={lecture} onCancel={() => toggleContentBtn(lectureIndex + 1)} slug={slug} />)
                                    )}
                                </div>
                            }
                            {
                                showContent === lectureIndex + 1 &&
                                <LectureContent  lecture={lecture} loading={loading}
                                    replaceVideo={replaceVideo}
                                    slug={slug}
                                    onCancel={() => toggleContentBtn(lectureIndex + 1)}
                                    onReplace={() => toggleReplaceVideo(lecture?.id)}
                                />
                            }
                        </div>
                    </div>
                );
            })}
        </>
    )
}
