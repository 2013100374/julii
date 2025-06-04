import React from 'react'
import { useSection } from './_hooks/useSection';
import useUtility from '@/app/_hooks/useUtility';
import Link from 'next/link';

export const Location = ({ section }) => {
    const { content, elements } = useSection(section);
    const { trans } = useUtility();

    return (
        <section className="our-location py-50 bg-white">
            <div className="container">
                <div className="section-heading style-left section-heading-dark">
                    <h2 className="section-heading__title">{trans(content?.data_values?.heading)}</h2>
                    <p className="section-heading__desc">{trans(content?.data_values?.subheading)}</p>
                </div>
                <div className="row gy-4 justify-content-between">
                    <div className="col-xl-5 col-md-6">
                        <div className="location-info">
                            {
                                elements?.map((element, index) => (
                                    <div key={index} className="location-info__item">
                                        <h4 className="location-info__title">{trans(element?.data_values?.city)}</h4>
                                        <p className="location-info__address">{trans(element?.data_values?.address)}</p>
                                        <Link href={`${trans(element?.data_values?.map_link)}`} target="_blank"
                                            className="location-info__link">{trans(`View Map`)}</Link>
                                    </div>

                                ))
                            }

                        </div>
                    </div>
                    <div className="col-xl-7 col-md-6">
                        <div className="location-map h-100">
                            <iframe src={`${trans(content?.data_values?.map_link)}`}
                                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
