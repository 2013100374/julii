'use client';
import { frontendImage } from '@/lib/helpers';
import { useSection } from './_hooks/useSection';
import useUtility from '@/app/_hooks/useUtility';
import { Image } from 'react-bootstrap';
export const Earning = ({ section }) => {
    const { content, elements, loading } = useSection(section);
    const { trans } = useUtility();

  
    return (
        <section className="earning-section py-50">
            <div className="container">
                <div className="section-heading style-left section-heading-dark">
                    <div className="section-heading__subheading">{trans(content?.data_values?.title)}</div>
                    <h2 className="section-heading__title">{trans(content?.data_values?.heading)}</h2>
                    <p className="section-heading__desc">
                        {trans(content?.data_values?.subheading)}
                    </p>
                </div>
                <div className="row gy-4">
                    {
                        elements?.map((item, index) => (
                            <div key={index} className="col-sm-6 col-lg-4">
                                <div className="card earning--card">
                                    <div className="card-img">
                                        <Image src={frontendImage(item?.data_values?.image,'earning')} alt='image' />
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{trans(item?.data_values?.title)}</h5>
                                        <p className="card-text">
                                           {trans(item?.data_values?.description)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </section>
    );
}

export default Earning;
