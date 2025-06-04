import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import useUtility from '@/app/_hooks/useUtility';
import useCourseHandler from '../../_hooks/useCourseHandler';
import SubmitBtn from '@/app/_partials/SubmitBtn';
import { ProgressBar } from 'react-bootstrap';
import Input from '@/app/_forms/Input';

export default function ResourceUploadForm({ lecture, slug, onCancel }) {
    const { trans } = useUtility();


    const {
        initialResourcesValues,
        resourcesVideoValidationSchema,
        handleResourcesSubmit,
        successResponse,
        loading,

    } = useCourseHandler(slug);

    useEffect(() => {
        if (successResponse) {
            setTimeout(() => {
                onCancel();
            }, 100);
        }
    }, [successResponse, onCancel]);


    return (
        <Formik
            initialValues={initialResourcesValues}
            validationSchema={resourcesVideoValidationSchema}
            onSubmit={handleResourcesSubmit}
        >
            {({ setFieldValue, handleSubmit }) => (
                <Form>
                    <div className="course-lecture-file-video">
                        <label htmlFor="course-file" className="file-upload-label">
                            <Input
                                type="file"
                                name="video"
                                id="course-file"
                                className="form--control"
                                aria-label={trans('Upload Resource')}
                                onChange={(e) => {
                                    setFieldValue('resources', e.target.files[0]);
                                    setFieldValue('section_id', lecture?.course_section_id);
                                    setFieldValue('lecture_id', lecture?.id);
                                    setTimeout(() => {
                                        handleSubmit();
                                    }, 0);
                                }}
                            />

                            <Field type="hidden" name="section_id" />
                            <Field type="hidden" name="lecture_id" />
                            <span className="icon">
                                {
                                    loading ? <i className="las la-circle-notch la-spin"></i> :
                                        <i className="fas fa-file-upload"></i>
                                }
                            </span>
                            <span className="text">{trans('Upload Resource')}</span>
                        </label>

                    </div>
                </Form>
            )}
        </Formik>
    );
}
