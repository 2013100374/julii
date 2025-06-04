'use client';
import React from 'react'
import { useSection } from './_hooks/useSection';
import { Image } from 'react-bootstrap';
import useUtility from '@/app/_hooks/useUtility';
import { frontendImage } from '@/lib/helpers';

export const Achievements = ({ section }) => {
    const { content,elements } = useSection(section);
    const { trans } = useUtility();
 
    
    return (

        <section className="achievement-section py-50">
            <div className="container">
                <div className="row gy-4 flex-lg-row-reverse align-items-center">
                    <div className="col-lg-5">
                        <div className="achievement-thumb">
                            <Image src={frontendImage(content?.data_values?.image,'achivment')} alt="images" />
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="achievement-content">
                            <div className="section-heading style-left section-heading-dark">
                                <h2 className="section-heading__title">{trans(content?.data_values?.heading)}</h2>
                                <p className="section-heading__desc">
                                    {trans(content?.data_values?.description)}
                                </p>
                            </div>

                            <div className="achievement-count">
                                {
                                     elements?.map(item => (
                                        <div key={item.id} className="achievement-count__item">
                                            <h2 className="count"><span className="text">{item?.data_values?.value}</span>{item?.data_values?.symbol}{item?.data_values?.operator}</h2>
                                            <p className="achievement-count__title">{trans(item?.data_values?.title)}</p>
                                        </div>
                                    ))
                                }
                           
                             
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
