"use client";

import React, { useRef, useState } from 'react';
import { Form, Formik } from 'formik';

import SubmitBtn from '@/app/_partials/SubmitBtn';
import { FormGroup } from '@/app/_forms/FormsStore';
import useUtility from '@/app/_hooks/useUtility';
import { useSection } from '@/app/_partials/_sections/_hooks/useSection';
import useCourseHandler from '../_hooks/useCourseHandler';
import ENDPOINTS from '@/lib/endpoints';
import Input from '@/app/_forms/Input';
import { Modal } from 'react-bootstrap';
import { Button } from '@/app/_partials/Button';
import Link from 'next/link';
import { request } from '@/lib/helpers';

export default function CourseBasic({ formSubmit, load }) {
    const { content } = useSection('course');
    const { initialValues, validationSchema } = useCourseHandler();

    const [slug, setSlug] = useState(false);
    const [slugBadge, setSlugBadge] = useState(false);
    const { trans } = useUtility();
    const [generatedSlug, setGeneratedSlug] = useState('');
    const [generatedCustomSlug, setGeneratedCustomSlug] = useState('');

    const [show, setShow] = useState(false);
    const [showSpin, setShowSpin] = useState(false);
    const formikRef = useRef();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(false);


    const checkSlug = async (title) => {
        const slug = createSlug(title);
        try {
            const { data } = await request.post(`${ENDPOINTS.CHECK_SLUG}?slug=${slug}`);
            setSlug(data.exists);
            setSlugBadge(true);
            setGeneratedSlug(slug);
            setGeneratedCustomSlug(slug);
            setShowSpin(false);
            return slug;
        } catch (error) {
            console.error('Error checking slug:', error);
        }
    };

    const createSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/^-+|-+$/g, '');
    };


    const initiatedSlug = async (setFieldValue) => {
        const title = document.getElementById('course-title').value;
        if (title) {
            setShowSpin(true);
            const slug = await checkSlug(title);
            setFieldValue('slug', slug);
        }
    };

    const editSlug = async () => {
        setLoading(true)
        const slug = await checkSlug(generatedCustomSlug);
        formikRef.current.setFieldValue('slug', slug);
        setLoading(false)


    };

    return (
        <>
            <div className="course-basic">
                <div className="course-basic-wrapper">
                    <div className="course-basic-info">
                        <h4>{trans(content?.data_values?.heading)}</h4>
                        <p>{trans(content?.data_values?.subheading)}</p>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={formSubmit}
                        innerRef={formikRef}
                    >
                        {({ setFieldValue }) => (
                            <Form className="course-basic-form">
                                <div className="text-end mb-2">
                                    {showSpin ? (
                                        <i className="las la-circle-notch la-spin text--base"></i>
                                    ) : (
                                        <Link
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                initiatedSlug(setFieldValue);
                                            }}
                                            className='text-muted'
                                        >
                                            <i className="me-1 las la-link"></i>{trans('Make slug')}
                                        </Link>
                                    )}
                                </div>

                                <Input errorHandler={true} type="text" name="title" className="form--control" id="course-title" placeholder="Enter course title" />

                                <FormGroup>
                                    <span className={`${slugBadge ? 'd-block' : 'd-none'} text-end slug`}>
                                        <span className={`${slug ? 'text--danger' : 'text--success'} me-2`}>
                                            {generatedSlug}
                                        </span>
                                        <Link
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleShow();
                                            }}
                                        >
                                            <i className="las la-pen"></i>
                                        </Link>
                                    </span>

                                    <Input type="hidden" name="slug" value={generatedSlug} />
                                </FormGroup>


                                <FormGroup className="form-group text-end">
                                    <SubmitBtn type="submit" isSubmitting={load} className="btn btn--base" title="Continue" />
                                </FormGroup>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>

            {/* Modal for editing slug */}
            <Modal show={show} onHide={handleClose} className='custom--modal' aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{trans('Edit slug')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        value={generatedCustomSlug}
                        onChange={(e) => { setGeneratedCustomSlug(e.target.value); }}
                        className="form--control"
                    />
                    <span className={`${slugBadge ? 'd-block' : 'd-none'} slug`}>
                        <span className={`fs-14 mt-3 ${slug ? 'text--danger' : 'text--success'} me-2`}>
                            {generatedSlug}
                        </span>

                    </span>

                </Modal.Body>
                <Modal.Footer>
                    <Button loading={loading} className="btn--base w-100" onClick={(e) => {
                        e.preventDefault();
                        editSlug();
                    }} label={trans('Check Slug')} />
                </Modal.Footer>
            </Modal>
        </>
    );
}
