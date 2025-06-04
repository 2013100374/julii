'use client';
import { frontendImage } from '@/lib/helpers';
import { useSection } from './_hooks/useSection';
import useUtility from '@/app/_hooks/useUtility';
import { Image } from 'react-bootstrap';
import Link from 'next/link';
export const Instructor = ({ section }) => {
    const { content, elements, loading } = useSection(section);

    const { trans } = useUtility();

    return (
        <section className="instructor-section py-50">
            <div className="container">
                <div className="row gy-4 justify-content-between align-items-center">
                    <div className="col-lg-7 col-xl-5 order-2 order-lg-1">
                        <div className="section-heading style-left  section-heading-dark">
                            <h2 className="section-heading__title">{trans(content?.data_values?.heading)}</h2>
                            <p className="section-heading__desc">{trans(content?.data_values?.subheading)}</p>
                        </div>
                        <div className="instructor-benefit pb-50">
                            <ul className="instructor-benefit__list">
                                {
                                    elements?.map((item, index) => (

                                        <li className="instructor-benefit__item" key={index}>
                                            <span
                                                className="instructor-benefit__icon"
                                                dangerouslySetInnerHTML={{ __html: item?.data_values?.icon }}
                                            />
                                            <div className="instructor-benefit__content">
                                                <h6 className="instructor-benefit__title">{trans(item?.data_values?.heading)}</h6>
                                                <p className="instructor-benefit__desc">{trans(item?.data_values?.subheading)}</p>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <Link href={`${content?.data_values?.button_link}`} className="btn btn--warning btn--shadow">{content?.data_values?.button_text}</Link>
                    </div>
                    <div className="col-lg-5 order-1 order-lg-2">
                        <div className="instructor-thumb text-center">
                            <Image src={frontendImage(content?.data_values?.image, 'instructor')} alt={trans(`instructor_image`)} />
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Instructor;
