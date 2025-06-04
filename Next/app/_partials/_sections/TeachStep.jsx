'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useSection } from './_hooks/useSection';
import useUtility from '@/app/_hooks/useUtility';
import { Image } from 'react-bootstrap';
import { frontendImage } from '@/lib/helpers';

export const TeachStep = ({ section }) => {
    const { content, elements } = useSection(section);
    const { trans } = useUtility();

    const [activeTab, setActiveTab] = useState(0);
    const tabBarRef = useRef(null);
    const tabsContainerRef = useRef(null);

    const updateBar = () => {
        const activeNavItem = tabsContainerRef.current?.querySelector('.nav-link.active');
        if (activeNavItem && tabBarRef.current) {
            const { offsetWidth, offsetLeft } = activeNavItem;
            tabBarRef.current.style.width = `${offsetWidth}px`;
            tabBarRef.current.style.left = `${offsetLeft}px`;
        }
    };

    useEffect(() => {
        updateBar();
        const activeNavItem = document.querySelector('.nav-link.active');
        const observer = new MutationObserver(updateBar);

        if (activeNavItem && tabsContainerRef.current) {
            observer.observe(tabsContainerRef.current, {
                attributes: true,
                subtree: true,
                attributeFilter: ['class'],
            });
        }

        window.addEventListener('resize', updateBar);
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', updateBar);
        };
    }, []);

    useEffect(() => {
        setTimeout(updateBar, 0);
    }, [activeTab]);

    return (
        <section className="teach-step py-50">
            <div className="container">
                <div className="teach-step__wrapper">
                    <div className="section-heading section-heading-dark">
                        <h2 className="section-heading__title">{trans(content?.data_values?.heading)}</h2>

                        <ul className="nav teachstep--tab nav-tabs" id="myTab" role="tablist" ref={tabsContainerRef}>
                            <li className="tab__bar" ref={tabBarRef}></li>
                            {elements?.map((element, index) => (
                                <li key={index} className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link ${activeTab === index ? 'active' : ''}`}
                                        data-bs-toggle="tab"
                                        data-bs-target={`#tab-${index}`}
                                        type="button"
                                        role="tab"
                                        aria-controls={`tab-${index}`}
                                        aria-selected={activeTab === index}
                                        onClick={() => setActiveTab(index)}
                                    >
                                        {trans(element?.data_values?.title)}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="tab-content" id="myTabContent">
                            {elements?.map((element, index) => (
                                <div
                                    key={index}
                                    className={`tab-pane fade ${activeTab === index ? 'show active' : ''}`}
                                    id={`tab-${index}`}
                                    role="tabpanel"
                                    tabIndex={0}
                                >
                                    <div className="row gy-4 flex-lg-row-reverse justify-content-between align-items-center">
                                        <div className="col-lg-6">
                                            <div className="teach-step__thumb">
                                                <Image src={frontendImage(element?.data_values?.image, 'teach_step')} alt="step-img" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="teach-step__content">
                                                <p className="teach-step__desc" dangerouslySetInnerHTML={{
                                                    __html: element?.data_values?.description
                                                }}>

                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
