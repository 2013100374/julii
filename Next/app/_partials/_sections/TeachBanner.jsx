import React from 'react'
import { useSection } from './_hooks/useSection';
import useUtility from '@/app/_hooks/useUtility';
import Link from 'next/link';
import { frontendImage } from '@/lib/helpers';
import { Image } from 'react-bootstrap';

export const TeachBanner = ({ section }) => {
    const { content, elements } = useSection(section);
    const { trans } = useUtility();

    return (
        <section className="teach-banner">
            <div className="container">
                <div className="row justify-content-between align-items-end">
                    <div className="col-lg-6">
                        <div className="teach-banner__content">
                            <div className="banner-title-message">
                                {
                                    elements?.map((item, index)=>(
                                        <div key={index} className={`banner-title-message${index+1}`}>{trans(item?.data_values?.title)}</div>
                                    ))
                                }
                               
                            </div>

                            <h2 className="teach-banner__title">{trans(content?.data_values?.heading)}</h2>
                            <p className="teach-banner__desc">{trans(content?.data_values?.subheading)}</p>
                            <Link href={`${trans(content?.data_values?.button_link)}`} className="btn btn--base btn--white-shadow">{trans(content?.data_values?.button_text)}</Link>
                        </div>
                    </div>
                    <div className="col-lg-5 position-relative">
                        <div className="teach-banner__thumb">
                            <Image src={frontendImage(content?.data_values?.image, 'teach_banner')} alt="banner-image" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
