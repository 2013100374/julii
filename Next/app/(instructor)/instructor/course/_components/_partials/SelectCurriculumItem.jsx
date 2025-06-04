import React, { useEffect, useState } from 'react'
import useCourseHandler from '../../_hooks/useCourseHandler';
import useUtility from '@/app/_hooks/useUtility';
import { Field, Form, Formik } from 'formik';
import FormField from '@/app/_forms/FormField';
import SubmitBtn from '@/app/_partials/SubmitBtn';
import QuizAddForm from './QuizAddForm';

import { FormCheck } from 'react-bootstrap';


export default function SelectCurriculumItem({ section, index, slug }) {


    const { initialLectureValues, lectureValidationSchema, handleLectureSubmit, loading, currentWrapperContent, setCurrentWrapperContent,
        currentWrapper, setCurrentWrapper } = useCourseHandler(slug);


    const { trans } = useUtility();

    const toggleWrapper = (index) => {
        setCurrentWrapper((prev) => (prev === index ? null : index));
        setCurrentWrapperContent(null);
    };

    const handleWrapperContent = (type) => setCurrentWrapperContent(type);



    return (
        <>
            {currentWrapper === index ? (
                <button onClick={() => toggleWrapper(index)} className="new--btn">
                    <i className="fas fa-times"></i>
                </button>
            ) : (
                <button onClick={() => toggleWrapper(index)} className="new--btn">
                    <i className="fas fa-plus"></i>
                    {trans('Curriculum Item')}
                </button>
            )}


            {currentWrapper === index && !currentWrapperContent && (
                <div className="add-course-wrapper">
                    <button
                        type="button"
                        onClick={() => handleWrapperContent('lecture')}
                        className="add-course-btn"
                    >
                        <i className="fas fa-plus"></i>
                        {trans('Lecture')}
                    </button>
                    <button
                        type="button"
                        onClick={() => handleWrapperContent('quiz')}
                        className="add-course-btn"
                    >
                        <i className="fas fa-plus"></i>
                        {trans('Quiz')}
                    </button>

                </div>
            )}

            {currentWrapper === index && currentWrapperContent === 'lecture' && (
                <div className="add-curriculumn mt-4">
                    <Formik
                        initialValues={initialLectureValues}
                        validationSchema={lectureValidationSchema}
                        onSubmit={handleLectureSubmit}
                    >
                        {({ setFieldValue }) => (
                            <Form>
                                <FormField name="title" label="Lecture Title" required={true} />
                                <FormCheck className='form--switch p-0' type="switch" name="is_preview" id="preview-switch" label="Enable Prview" />
                                <Field type="hidden" name="section_id" />
                                <div className="flex-end mt-3 gap-3">
                                    <button onClick={() => toggleWrapper(index)} className="new--btn">{trans('Cancel')}</button>
                                    <SubmitBtn type="submit" isSubmitting={loading} className="save--btn" onClick={() => {
                                        setFieldValue("section_id", section?.id);
                                        setFieldValue("is_preview", document.getElementById('preview-switch').checked);
                                    }} title={trans("Add Lecture")} />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            )}

            {currentWrapper === index && currentWrapperContent === 'quiz' && (
                <div className="add-curriculumn mt-4">
                    <QuizAddForm section={section} slug={slug} toggleWrapper={() => toggleWrapper(index)} />
                </div>
            )}


        </>
    )
}
