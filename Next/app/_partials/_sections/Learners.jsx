import React from 'react'
import { Image } from 'react-bootstrap'
import { useSection } from './_hooks/useSection';
import useUtility from '@/app/_hooks/useUtility';
import { frontendImage } from '@/lib/helpers';

export const Learners = ({ section }) => {
    const { content, elements, loading } = useSection(section);
 
    const { trans } = useUtility();

    return (
        <section className="success-section my-50">
            <div className="container">
                <div className="section-heading section-heading-dark">
                    <h2 className="section-heading__title">{trans(content?.data_values?.title)}</h2>
                </div>
                <div className="row justify-content-center gy-4">

                    {
                        elements.map((item, index) => (

                            <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-xsm-6">
                                <div className="success-card">
                                    <div className="success-card__shape">
                                        <Image src={frontendImage(content?.data_values?.shape, 'learners') } alt="" />
                                    </div>
                                    <div className="success-card__img">
                                        <Image src={frontendImage(item?.data_values?.image, 'learners') } alt={item?.data_values?.name} />
                                    </div>
                                    <div className="success-card__body">
                                        <h6 className="success-card__name">{trans(item?.data_values?.name)}</h6>
                                        <p className="success-card__designation">{trans(item?.data_values?.designation)}</p>
                                        <p className="success-card__location">@ {trans(item?.data_values?.country)}</p>
                                        <div className="success-card__logo">
                                            <Image src={frontendImage(item?.data_values?.logo, 'learners') } alt="logo" />
                                        </div>
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
