import React from 'react'
import { useSection } from './_hooks/useSection';
import useUtility from '@/app/_hooks/useUtility';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Image } from 'react-bootstrap';

export const Categories = ({ section }) => {
    const { content } = useSection(section);

    const { trans } = useUtility();
    const { data: categories } = useSelector((state) => state?.categories);
    return (
        <section className="category-section py-50">
            <div className="container">
                <div className="section-heading section-heading-dark">
                    <h2 className="section-heading__title">{trans(content?.data_values?.heading)}</h2>
                    <p className="section-heading__desc">{trans(content?.data_values?.subheading)}</p>
                </div>
                <div className="row gy-4">

                    {categories?.filter(category => category?.is_trending == 1)?.map((category, index) => (
                        <div key={index} className="col-lg-3 col-md-4 col-
                        6">
                            <Link href={`/courses/catalog/${category?.slug}`} className="category-card">
                                <div className="category-card__img">
                                    <Image src={category?.image_path + '/' + category?.image} alt={trans(category?.name)} />
                                </div>
                                <h5 className="category-card__title">{trans(category?.name)}</h5>
                            </Link>
                        </div>

                    ))
                    }

                </div>
            </div>
        </section>
    )
}
