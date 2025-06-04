import React from 'react'
import { useSection } from './_hooks/useSection';
import useUtility from '@/app/_hooks/useUtility';
import { Navigation } from 'swiper/modules';
import Pagination from '../Pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import { frontendImage } from '@/lib/helpers';
import { Image } from 'react-bootstrap';

export const InstructorSection = ({ section }) => {
    const { elements } = useSection(section);
    const { trans } = useUtility();

    return (
        <section className="client-testimonial">
            <div className="container position-relative">
                <div className="client-testimonial__wrapper">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        spaceBetween={20}
                        breakpoints={{
                            1440: { slidesPerView: 1 }
                        }}
                    >
                        {
                            elements?.map((element, index) => (
                                <SwiperSlide key={index} className="client-testimonial-item">
                                    <div className="row gy-4 align-items-center px-5">
                                        <div className="col-md-6">
                                            <div className="client-testimonial-item__thumb">
                                                <Image className="fit-image" src={frontendImage(element?.data_values?.image, 'instructor_section')} alt="thumb" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="client-testimonial-item__content">
                                                <q className="client-testimonial-item__desc">{trans(element?.data_values?.quatation)}</q>
                                                <div className="client-testimonial-item-auth">
                                                    <p className="client-testimonial-item-auth__name">{trans(element?.data_values?.name)}</p>
                                                    <p className="client-testimonial-item-auth__desgination">{trans(element?.data_values?.designation)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))


                        }

                    </Swiper>
                </div>
            </div>
        </section>
    )
}
