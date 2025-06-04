'use client';
import React from 'react'
import { useSection } from './_hooks/useSection';
import useUtility from '@/app/_hooks/useUtility';

export const AboutContent = ({ section }) => {

    const { elements } = useSection(section);

    const { trans } = useUtility();

    return (
        <section className="about-content-section py-50">
            <div className="container">
                <div className="row gy-4">
                    {
                        elements?.map((element, index) => (
                            <div key={index} className="col-md-6">
                                <div className="about-content-info">
                                    <span className="icon" dangerouslySetInnerHTML={{
                                        __html: element?.data_values?.icon,
                                    }}></span>
                                    <h3>{trans(element?.data_values?.heading)}</h3>
                                    <p>{trans(element?.data_values?.description)}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
