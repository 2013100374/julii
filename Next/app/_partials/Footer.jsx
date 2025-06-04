'use client';
import React, { useEffect, useState } from 'react';

import useUtility from '@/app/_hooks/useUtility';
import { Logo } from './_navbar/Logo';
import { useSection } from './_sections/_hooks/useSection';
import { Form, Formik } from 'formik';
import SubmitBtn from './SubmitBtn';
import Subscription from './Subscription';
import FormField from '../_forms/FormField';
import { useSelector } from 'react-redux';
import usePolicyPages from './_hooks/usePolicyPages';
import Link from 'next/link';
import ENDPOINTS from '@/lib/endpoints';
import { request, strLimit } from '@/lib/helpers';

export const Footer = () => {

    const { content, elements } = useSection('footer');

    const { policyPages } = usePolicyPages();


    const { trans } = useUtility();
    const { initialValues, validationSchema, handleSubmit } = Subscription();
    const { data: categories } = useSelector((state) => state?.categories)


    const { data: instructorData } = useSelector((state) => state?.instructor);

    const [latestCourse, setLatestCourses] = useState([]);

    useEffect(() => {
        async function fetchLatestCourses() {

            try {
                const data = await request.get(ENDPOINTS.LATEST_COURSE);


                setLatestCourses(data?.data?.data?.courses);
            } catch (error) {
                console.error("Error fetching categories:", error)
            }
        }
        fetchLatestCourses()
    }, [])





    return (
        <footer className="footer-area  py-50">
            <div className="newsletter">
                <div className="container">
                    <div className="newsletter-wrapper mb-50 pb-50">
                        <div className="row gy-4">
                            <div className="col-md-6">
                                <div className="newsletter__content">
                                    <h4 className="newsletter__heading">{trans(content?.data_values.news_letter_heading)}</h4>
                                    <p className="newsletter__text">{trans(content?.data_values.news_letter_subheading)}</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ isSubmitting }) => (
                                        <Form className="newsletter-form">
                                            <div className="newsletter-form__wrapper">
                                                <div className="newsletter-form__input">
                                                    <FormField name="email" fromGroup={false} required={true} className="form-control form--control" placeholder="Enter Your Email" />
                                                </div>
                                                <div className="newsletter-form__button">
                                                    <SubmitBtn type="submit" className="btn btn--white-shadow btn--base" isSubmitting={isSubmitting} title={trans('Subscribe')} />
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-area">
                <div className="container">
                    <div className="footer-item-wrapper">
                        <div className="footer-item">
                            <div className="footer-item__logo">
                                <Logo />
                            </div>

                            <p className="footer-item__desc">
                                {trans(content?.data_values.footer_description)}
                            </p>

                            <div className="social">
                                <h5 className="footer-item__title">{trans(`Follow Us on`)}</h5>
                                <ul className="social-list">
                                    {
                                        elements?.map((item, index) => (
                                            <li key={index} className="social-list__item">
                                                <Link target='_blank' href={`${item?.data_values?.url}`} className="social-list__link flex-center" dangerouslySetInnerHTML={{
                                                    __html: item?.data_values?.social_icon
                                                }}></Link>
                                            </li>
                                        ))
                                    }


                                </ul>
                            </div>
                        </div>
                        <div className="footer-item">
                            <h5 className="footer-item__title">{trans(`Quick Links`)}</h5>
                            <ul className="footer-menu">
                                <li className="footer-menu__item"><Link href="/about" className="footer-menu__link">{trans('About')}</Link></li>

                                <li className="footer-menu__item"><Link href="/become-a-teacher" className="footer-menu__link">{trans('Become Instructor')}</Link></li>

                                {!instructorData &&
                                    <li className="footer-menu__item">
                                        <Link className="footer-menu__link" href="/instructor/login">{trans(`Instructor Login`)}</Link>
                                    </li>
                                }

                                <li className="footer-menu__item"><Link href="/contact" className="footer-menu__link">{trans('Contact')}</Link></li>
                            </ul>
                        </div>
                        <div className="footer-item">
                            <h5 className="footer-item__title">{trans('Policy')}</h5>
                            <ul className="footer-menu">
                                {policyPages?.data?.policies?.map((policy, index) => (
                                    <li key={index} className="footer-menu__item"><Link href={`/policy/${policy.slug}`} className="footer-menu__link">{trans(policy.data_values.title)} </Link>
                                    </li>
                                ))
                                }

                            </ul>
                        </div>
                        <div className="footer-item">
                            <h5 className="footer-item__title">{trans(`Course Catalog`)}</h5>
                            <ul className="footer-menu">
                                {
                                    categories?.slice(0, 5).map((category, index) => (
                                        <li key={index} className="footer-menu__item">
                                            <Link className="footer-menu__link" href={`/courses/catalog/${category?.slug}`}>
                                                {category?.name}
                                            </Link>
                                        </li>
                                    ))
                                }

                            </ul>
                        </div>
                        <div className="footer-item">
                            <h5 className="footer-item__title">{trans('Latest Courses')}</h5>
                            <ul className="footer-menu">
                                {latestCourse?.map((course, index) => (
                                    <li key={index} className="footer-menu__item">
                                        <Link href={`/course-details/${course?.slug}`} className="footer-menu__link">{strLimit(course?.title, 20)}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
