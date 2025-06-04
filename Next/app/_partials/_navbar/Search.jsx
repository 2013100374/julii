'use client';

import useCourseFilter from '@/app/(frontend)/courses/_hooks/useCourseFilter';
import useUtility from '@/app/_hooks/useUtility';
import ENDPOINTS from '@/lib/endpoints';
import { request } from '@/lib/helpers';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';

export default function Search() {
    const [show, setShow] = useState(false);
    const handleToggle = () => setShow(!show);
    const { fetchCourses } = useCourseFilter();
    const [keywords, setKeywords] = useState([]);
    const {trans} = useUtility();

    useEffect(() => {
        async function fetchKeywords() {
            try {
                const data = await request.get(ENDPOINTS.GET_KEYWORD);
                setKeywords(data.data.data.keywords);
            } catch (error) {
                console.error("Error fetching keywords:", error)
            }
        }
        fetchKeywords()
    }, [])
    

    return (
        <div className="header-search">
            <span className="header-search__icon" onClick={handleToggle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="lucide lucide-search">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                </svg>
            </span>
            <div className={`header-search__wrapper ${show ? 'show' : ''}`}>
                <div className="container">
                    <Formik
                        initialValues={{ search: [] }}
                        onSubmit={(values) => {
                            fetchCourses({ search: values.search }, true);
                            setShow(false); 
                        }}
                    >

                        {({ values, setFieldValue }) => (
                            <Form className="header-search__form">
                                <div className="input--group border-0">
                                    <button type="submit" className="input--group-text">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                            strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                                            <circle cx="11" cy="11" r="8" />
                                            <path d="m21 21-4.3-4.3" />
                                        </svg>
                                    </button>
                                    <Field
                                        type="text"
                                        name="search"
                                        className="form--control"
                                        placeholder="Search..."
                                        value={values.search[0] || ''}
                                        onChange={(e) => setFieldValue('search', [e.target.value])}
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>

                    <div className="popular-search">
                        <h5 className="popular-search__title">{trans(`Popular searches`)}</h5>
                        <ul className="popular-search__list">
                            {keywords.map((item,index ) => (
                                <li key={index} className="popular-search__item">
                                    <a
                                        className="popular-search__link"
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleToggle();
                                            fetchCourses({ search: [item?.keyword] }, true);
                                        }}
                                    >
                                        {item?.keyword}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
