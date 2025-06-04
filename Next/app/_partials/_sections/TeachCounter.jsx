import React from 'react'
import { useSection } from './_hooks/useSection';
import useUtility from '@/app/_hooks/useUtility';


export const TeachCounter = ({ section }) => {
    const {  elements } = useSection(section);
    const { trans } = useUtility();
    return (
        <section className="teach-counter py-50">
            <div className="container">
                <div className="teach-counter__wrapper">

                    {
                        elements?.map((element, index) => (
                            <div key={index} className="teach-counter-item">
                                <h2 className="teach-counter-item__count">
                                    <span className="odometer" data-odometer-final={element?.data_values?.value}>00</span>{element?.data_values?.symbol}
                                </h2>
                                <h5 className="teach-counter-item__title">{trans(element?.data_values?.title)}</h5>
                            </div>
                        ))

                    }

                </div>
            </div>
        </section>
    )
}

