import useUtility from '@/app/_hooks/useUtility';
import VideoPlayer from '@/app/_partials/VideoPlayer';
import Link from 'next/link';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';

export default function LectureList({ curriculum, course, enrolled }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);



    const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);

    const closeArticleModal = () => setIsArticleModalOpen(false);
    const openArticleModal = () => setIsArticleModalOpen(true);

    const [previewVideos, setPreviewVideos] = useState([]);
    const [previewArticle, setPreviewArticle] = useState([]);




    const [selectedVideo, setSelectedVideo] = useState(null);
    const { trans } = useUtility();


    return (
        <>
            {curriculum?.lectures?.map((lecture, lectureIndex) => (
                <div className="module-overview" key={`${lectureIndex}`}>
                    <ul className="module-overview__list">
                        <li className="module-overview__item">
                            <div className="left">
                                <span className="icon">
                                    {
                                        lecture?.content_type == 1 ? <i className="lab la-youtube"></i> : <i className="las la-file"></i>
                                    }
                                </span>
                                {
                                    (enrolled || lecture?.is_preview === 1) ?
                                        lecture?.content_type === 1 ?
                                            <Link href="javascript:void(0)" onClick={() => {
                                                openModal(true);
                                                setPreviewVideos(
                                                    course?.lectures?.filter(lecture => enrolled ? lecture?.content_type === 1 : lecture.is_preview === 1)
                                                );
                                                setSelectedVideo(lecture);
                                            }}  >{lecture?.title}</Link> :

                                            <Link href="javascript:void(0)" onClick={() => {
                                                openArticleModal(true);
                                                setPreviewArticle(lecture)
                                            }}  >{lecture?.title}</Link>
                                        :
                                        <p className="module-overview__title">{lecture?.title}</p>




                                }
                            </div>
                            <div className="right">
                                {(enrolled || lecture?.is_preview === 1) ?
                                    lecture?.content_type === 1 ? (
                                        <>
                                            <button
                                                onClick={() => {
                                                    openModal(true);
                                                    setPreviewVideos(
                                                        course?.lectures?.filter(lecture => enrolled ? lecture?.content_type === 1 : lecture.is_preview === 1)
                                                    );
                                                    setSelectedVideo(lecture);
                                                }}
                                                data-bs-toggle="modal"
                                                className="module-overview__preview"
                                            >
                                                {trans('Preview')}
                                            </button>

                                        </>
                                    )
                                        : (
                                            <>
                                                <button data-bs-toggle="modal"
                                                    onClick={() => {
                                                        openArticleModal(true);
                                                        setPreviewArticle(lecture)
                                                    }}
                                                    className="module-overview__preview"
                                                >
                                                    {trans('Preview')}
                                                </button>
                                            </>

                                        ) : ''
                                }
                                {
                                    lecture?.content_type === 1 ?
                                        <p className="module-overview__time">{lecture?.video_duration}</p> : <p className="module-overview__time">{trans(`Article`)}</p>
                                }

                            </div>
                        </li>
                    </ul>
                </div>
            ))}


            <Modal show={isModalOpen} className='custom--modal' size="lg" onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <h5 className='mb-0'>{trans(course?.title)}</h5>
                </Modal.Header>
                <Modal.Body>
                    <div className='preview-video-item'>
                        <VideoPlayer videoSrc={selectedVideo?.video_path + '/' + selectedVideo?.file} />
                    </div>
                    <ul className='preview-video-lists'>
                        {previewVideos?.map((video, index) => (
                            <li key={index} className={`preview-video-link ${selectedVideo?.id == video?.id ? 'active' : ''}`}>
                                <button onClick={() => { setSelectedVideo(video) }} >
                                    {selectedVideo?.id == video?.id ? <i className='fas fa-pause'></i> : <i className='fas fa-play'></i>}
                                    {video.title}
                                </button>
                            </li>
                        ))}

                    </ul>
                </Modal.Body>

            </Modal>

            {/* artical modal */}
            <Modal show={isArticleModalOpen} size="lg" onHide={closeArticleModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {previewArticle?.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div >
                        <p dangerouslySetInnerHTML={{ __html: previewArticle?.article }}></p>
                    </div>
                </Modal.Body>

            </Modal>
        </>

    )
}
