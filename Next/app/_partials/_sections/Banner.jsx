'use client';
import React from 'react';
import { useSection } from './_hooks/useSection';
import { frontendImage } from '@/lib/helpers';
import useUtility from '@/app/_hooks/useUtility';
import { Image } from 'react-bootstrap';
import Link from 'next/link';
import { useSelector } from 'react-redux';


export const Banner = () => {
    const { content, elements, loading } = useSection('banner');
 
    
    const { trans } = useUtility();
    const gsRemark = useSelector((state) => state.gs.data?.remark);
    
    if(gsRemark === "maintenance_mode"){
        return null;
    }

  
    return (
        <section className="banner-section">
            <div className="container">
                <div className="row align-items-center gy-5">
                    <div className="col-lg-6 col-xxl-7">
                        <div className="banner-content">
                            <div className="banner-title-message">
                                {elements?.map((element, index) => (
                                    <div key={index} className={`banner-title-message${index + 1}`}>
                                        {trans(element?.data_values?.title_message)}
                                    </div>
                                ))}
                            </div>

                            <h2 className="banner-content__title">
                                {trans(content?.data_values?.heading)}  
                            </h2>

                            <p className="banner-content__desc">
                                {trans(content?.data_values?.subheading)}
                            </p>

                            <Link href={`${content?.data_values?.button_link}`} className="btn btn--base btn--shadow">
                                {trans(content?.data_values?.button_text)}
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xxl-5 d-none d-lg-block position-relative">
                        <div className="banner-thumb">
                            <Image className="fit-image"  src={frontendImage(content?.data_values?.image, 'banner')} alt="Banner" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
