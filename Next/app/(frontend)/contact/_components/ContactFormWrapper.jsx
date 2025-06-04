"use client";

import Link from "next/link";
import useUtility from "@/app/_hooks/useUtility";
import { useSection } from "@/app/_partials/_sections/_hooks/useSection";




export default function ContactFormWrapper({ children }) {
    const { trans } = useUtility();
    const { content, elements, loading } = useSection('contact_us');


    return (
        <>
            <section className="contact-us py-50">
                <div className="container">
                    <div className="row gy-4 gx-5 align-items-center justify-content-between">
                        <div className="col-lg-6">
                            <div className="section-heading section-heading-dark style-left">
                                <h2 className="section-heading__title">{trans(content?.data_values?.heading)}</h2>
                                <p className="section-heading__desc">{trans(content?.data_values?.short_description)}</p>
                            </div>

                            <div className="section-heading section-heading-dark style-left">
                                <h4 className="section-heading__title">{trans(content?.data_values?.title)}</h4>
                                <p className="section-heading__desc">{trans(content?.data_values?.subtitle)}</p>
                            </div>

                            <div className="location-info">
                                {
                                    elements?.map((element, index) => (
                                        <div key={index} className="location-info__item">
                                            <h5 className="location-info__title">{trans(element?.data_values?.city)}</h5>
                                            <p className="location-info__address">{trans(element?.data_values?.address)}</p>
                                            <Link href={element?.data_values?.google_map_link} target="_blank"
                                                className="location-info__link">{trans(`View Map`)}</Link>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="col-lg-5">
                            {children}
                        </div>
                    </div>
                </div>
            </section>

     
        </>
    )
}
