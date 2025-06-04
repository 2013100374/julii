import useUtility from "@/app/_hooks/useUtility";
import { useSection } from "./_hooks/useSection";
import { frontendImage, showDateTime } from "@/lib/helpers";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from "next/link";
import { Image } from "react-bootstrap";
import { useEffect, useRef } from "react";

export const Blog = ({ section }) => {
    const { content, elements, loading } = useSection(section);
    const { trans } = useUtility();

    // Unique refs for navigation
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const swiperRef = useRef(null);

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.params.navigation.prevEl = prevRef.current;
            swiperRef.current.swiper.params.navigation.nextEl = nextRef.current;
            swiperRef.current.swiper.navigation.init();
            swiperRef.current.swiper.navigation.update();
        }
    }, []);

    return (
        <section className="blog py-50">
            <div className="container">
                <div className="slider-top">
                    <div className="section-heading style-left section-heading-dark">
                        <h2 className="section-heading__title mb-0">{trans(content?.data_values?.heading)}</h2>
                    </div>
                    <div className="swipe-btn-wrapper">
                        <div className="swiper-button-prev"></div>
                        <div className="swiper-button-next"></div>
                    </div>
                </div>
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation, Pagination]}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }}
                    spaceBetween={20}
                    breakpoints={{
                        576: { slidesPerView: 2 },
                        767: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1440: { slidesPerView: 4 }
                    }}
                >
                    {elements.map((blog, index) => (
                        <SwiperSlide className="blog-item" key={index}>
                            <div className="blog-item__thumb">
                                <Link href={`/blog-details/${blog?.slug}`} className="blog-item__thumb-link">
                                    <Image src={frontendImage('thumb_' + blog?.data_values?.image, 'blog')} className="fit-image" alt="blog_image" />
                                </Link>
                            </div>
                            <div className="blog-item__content">
                                <div className="blog-item__date">
                                    <span className="icon"><i className="far fa-clock"></i></span>
                                    <span className="text">{showDateTime(blog?.created_at, 'DD MMM YYYY')}</span>
                                </div>
                                <h6 className="blog-item__title">
                                    <Link href={`/blog-details/${blog?.slug}`} className="blog-item__title-link">{trans(blog?.data_values?.title)}</Link>
                                </h6>
                                <p className="blog-item__desc">
                                    {trans(blog?.data_values?.preview_text)}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </section>
    );
};
