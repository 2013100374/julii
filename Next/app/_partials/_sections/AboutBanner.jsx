import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import { useSection } from './_hooks/useSection';
import { frontendImage } from '@/lib/helpers';
import Link from 'next/link';
import useUtility from '@/app/_hooks/useUtility';

export const AboutBanner = ({ section }) => {
    const { content } = useSection(section);
    const { trans } = useUtility();

    const [showLightbox, setShowLightbox] = useState(false);
    const [loading, setLoading] = useState(true);
    const videoUrl = content?.data_values?.video_link || '';

    return (
        <section className="about-banner py-50">
            <div className="container">
                <div className="row gy-4 align-items-center flex-row-reverse">
                    <div className="col-lg-5">
                        <div className="about-banner-thumb">
                            <div className="about-banner-thumb__image">
                                <Image className="fit-image" src={frontendImage(content?.data_values?.image, 'about_banner')} alt="about-banner-image" />
                            </div>

                            <button onClick={() => {
                                setShowLightbox(true)
                                setLoading(true);
                            }} className="about-banner-thumb__playbtn">
                                <span><i className="fas fa-play"></i></span>
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-7 pe-lg-3 pe-xl-5">
                        <div className="about-banner-content">
                            <h2 className="about-banner__heading">{trans(content?.data_values?.heading)}</h2>
                            <p className="about-banner__desc">{trans(content?.data_values?.description)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {showLightbox && (
                <div className="lightbox" onClick={() => setShowLightbox(false)}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                    {loading && (
                            <div className="spinner"></div>
                        )}
                        <iframe
                            src={videoUrl.replace("watch?v=", "embed/")}
                            frameBorder="0"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                            onLoad={() => setLoading(false)}
                        ></iframe>
                    </div>
                    <button className="lightbox-close" onClick={() => setShowLightbox(false)}>×</button>
                </div>
            )}

        </section>
    );
};
