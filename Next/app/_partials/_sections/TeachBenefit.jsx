import React from 'react'
import { useSection } from './_hooks/useSection';
import useUtility from '@/app/_hooks/useUtility';
import { frontendImage } from '@/lib/helpers';
import { Image } from 'react-bootstrap';

export const TeachBenefit = ({ section }) => {
    const { content, elements } = useSection(section);
    const { trans } = useUtility();

    return (
        <section className="teach-benifit py-50">
            <div className="container">
                <div className="section-heading section-heading-dark">
                    <h2 className="section-heading__title mb-0">{trans(content?.data_values?.heading)}</h2>
                </div>

                <div className="row gy-4 justify-content-center">
                    {
                        elements?.map((element, index) => (
                            <div key={index} className="col-md-4 col-sm-6">
                                <div className="teach-benifit-card">
                                    <div className="teach-benifit-card__icon">
                                        <Image src={frontendImage(element?.data_values?.image, 'teach_benifit')} alt="images" />
                                    </div>
                                    <h5 className="teach-benifit-card__title">{trans(element?.data_values?.title)}</h5>
                                    <p className="teach-benifit-card__desc">{trans(element?.data_values?.description)}</p>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </section>
    )
}
