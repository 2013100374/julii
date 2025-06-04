'use client';
import { frontendImage } from '@/lib/helpers';
import { useSection } from './_hooks/useSection';
import useUtility from '@/app/_hooks/useUtility';
import { Image } from 'react-bootstrap';
export const Counter = ({ section }) => {
    const { content, elements, loading } = useSection(section);
    const { trans } = useUtility();

    return (
        <section className="counter-section">
            <div className="counter-section__shape">
                <Image src={frontendImage(content?.data_values?.shape, 'counter')} alt="shapes" />
            </div>
            <div className="container">
                <div className="row gy-4 justify-content-between align-content-center">
                    <div className="col-md-5 col-xl-3">
                        <h2 className="counter-section__title"   dangerouslySetInnerHTML={{ __html: trans(content?.data_values?.heading) }}  />
                    </div>
                    <div className="col-md-7 col-lg-6">
                        <div className="counter">
                            <div className="counter__wrapper">

                            {
                                elements.map((element, index) => (
                                    <div key={index} className="counter__item">
                                        <h2 className="counter__count">{element?.data_values?.digit}{element?.data_values?.symbol}</h2>
                                        <h4 className="counter__text">{trans(element?.data_values?.title)}</h4>
                                    </div>
                                ))
                            }
                               
                           
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

