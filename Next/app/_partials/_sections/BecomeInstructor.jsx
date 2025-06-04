import React from 'react'
import { useSection } from './_hooks/useSection';
import useUtility from '@/app/_hooks/useUtility';
import Link from 'next/link';

export const BecomeInstructor = ({ section }) => {
    const { content } = useSection(section);
    const { trans } = useUtility();
    return (
        <section className="instructor-cta py-50">
            <div className="container">
                <div className="instructor-cta__content">
                    <h2 className="instructor-cta__title">{trans(content?.data_values?.heading)}</h2>
                    <p className="instructor-cta__desc">{trans(content?.data_values?.subheading)}</p>
                    <Link href={`${content?.data_values?.button_link}`} className="btn btn--base btn--shadow">{trans(content?.data_values?.button_text)}</Link>
                </div>
            </div>
        </section>
    )
}
