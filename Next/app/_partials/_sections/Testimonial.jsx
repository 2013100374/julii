import React from 'react'
import { useSection } from './_hooks/useSection';
import { frontendImage } from '@/lib/helpers';
import useUtility from '@/app/_hooks/useUtility';
import { Image } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

export const Testimonial = ({ section }) => {
    const { content, elements, loading } = useSection(section);
    const { trans } = useUtility();
    const swiperId = `testimonial-swiper-${Math.random().toString(36).substr(2, 9)}`;
    return (
        <>
            <section className="testimonials py-50 section-bg">
                <div className="testimonials__shape">
                    <Image src={frontendImage(content?.data_values?.shape, 'testimonial')} alt="shape" />
                </div>
                <div className="container">
                    <div className="slider-top gap-4">
                        <div className="section-heading style-left section-heading-dark">
                            <h2 className="section-heading__title mb-0">{trans(content?.data_values?.heading)}</h2>
                        </div>
                        <div className="swipe-btn-wrapper">
                            <div className={`swiper-button-prev ${swiperId}-prev`}></div>
                            <div className={`swiper-button-next ${swiperId}-next`}></div>
                        </div>
                    </div>

                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation={{
                            nextEl: `.${swiperId}-next`,
                            prevEl: `.${swiperId}-prev`,
                        }}
                        spaceBetween={20}
                        breakpoints={{
                            576: { slidesPerView: 2 },
                            767: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1440: { slidesPerView: 4 },
                        }}
                    >
                        {
                            elements.map((element, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <div className="testimonial-item">
                                            <div className="testimonial-item__thumb">
                                                <Image className="fit-image" src={frontendImage(element?.data_values?.image, 'testimonial')} alt={trans(element?.data_values?.title)} />
                                            </div>
                                            <div className="testimonial-item__content">
                                                <div className="testimonial-item__rating">
                                                    <ul className="rating-list">
                                                        {
                                                            [...Array(5)].map((_, index) => {
                                                                const isFullStar = index < Math.floor(element?.data_values?.rating); // For full stars
                                                                const isHalfStar = index === Math.floor(element?.data_values?.rating) && element?.data_values?.rating % 1 !== 0; // For half star

                                                                return (
                                                                    <li key={index} className="rating-list__item">
                                                                        <i
                                                                            className={
                                                                                isFullStar ? "las la-star" :
                                                                                    isHalfStar ? "las la-star-half-alt" :
                                                                                        ""
                                                                            }
                                                                        ></i>
                                                                    </li>
                                                                );
                                                            })
                                                        }

                                                    </ul>
                                                </div>
                                                <p className="mb-1">{trans(element?.data_values?.author)}</p>
                                                <h6 className="testimonial-item__title">{trans(element?.data_values?.designation)}</h6>
                                                <p className="testimonial-item__desc">{trans(element?.data_values?.comment)}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })
                        }
                    </Swiper>
                </div>
            </section>
        </>
    );
}
