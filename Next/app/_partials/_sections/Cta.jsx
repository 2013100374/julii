'use client';
import { frontendImage } from '@/lib/helpers';
import { useSection } from './_hooks/useSection';
import useUtility from '@/app/_hooks/useUtility';
import { Image } from 'react-bootstrap';
import Link from 'next/link';
export const Cta = ({ section }) => {
    const { content, elements, loading } = useSection(section);
    const { trans } = useUtility();

    return (
        <section className="cto-section py-50">
            <div className="container">
                <div className="row gy-4 align-items-center justify-content-between">
                    <div className="col-md-6">
                        <div className="cto-section__thumb-wrapper">
                            <div className="cto-section__thumb">
                                <Image src={frontendImage(content?.data_values?.image_one,'cta')} alt="thumb_one" />
                            </div>
                            <div className="cto-section__thumb">
                                <Image src={frontendImage(content?.data_values?.image_two,'cta')}alt="thumb_two" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6">
                        <div className="section-heading style-left">
                            <h2 className="section-heading__title">{trans(content?.data_values?.heading)}</h2>
                            <p className="section-heading__desc">{trans(content?.data_values?.subheading)}</p>
                            <div className="cto-section__btn">
                                <Link href={`${content?.data_values?.button_link}`} className="btn btn--warning btn--white-shadow">{trans(content?.data_values?.button_text)}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


