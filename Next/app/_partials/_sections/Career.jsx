'use client'
import React from 'react'
import { useSection } from './_hooks/useSection';
import useUtility from '@/app/_hooks/useUtility';

export const Career = ({ section }) => {
    const { content, elements} = useSection(section);

    const { trans } = useUtility();
    return (
        <section className="courses-trics my-50">
        <div className="container">
            <div className="section-heading section-heading-dark">
                <h2 className="section-heading__title">{trans(content?.data_values?.heading)}</h2>
            </div>
            <div className="row g-3 g-md-4 justify-content-center">
                {
                    elements?.map((item, index) => (
                        <div key={index} className="col-lg-4 col-xsm-6">
                            <div className="courses-trics-card">
                                <div className="courses-trics-card__count">{index+1}</div>
                                <div className="courses-trics-card__content">
                                    <h5 className="courses-trics-card__title">{trans(item?.data_values?.title)}</h5>
                                    <p className="courses-trics-card__text">{trans(item?.data_values?.subtitle)}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
           
            </div>
        </div>
    </section>
    )
}
