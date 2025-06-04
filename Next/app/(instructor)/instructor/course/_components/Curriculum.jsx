"use client";
import useUtility from '@/app/_hooks/useUtility';
import React, { useEffect, useState,useRef } from 'react';
import { useSelector } from 'react-redux';
import SectionAddForm from './_partials/SectionAddForm';
import Lecture from './_partials/Lecture';
import SelectCurriculumItem from './_partials/SelectCurriculumItem';
import Quiz from './_partials/Quiz';

import useCourseHandler from '../_hooks/useCourseHandler';

import SubmitBtn from '@/app/_partials/SubmitBtn';
import FormLabel from '@/app/_forms/FormLabel';
import Input from '@/app/_forms/Input';
import { Form, Formik } from 'formik';
import { confirmAlert } from 'react-confirm-alert';



export default function Curriculum({ slug }) {
    const { trans } = useUtility();
    const [showSectionForm, setShowSectionForm] = useState(false);
    const { data: courseData } = useSelector((state) => state?.course);
    const toggleSectionForm = () => setShowSectionForm(!showSectionForm);
    const { initialSectionValues, sectionValidationSchema, handleSectionSubmit, successResponse, setSuccessResponse, loading, sectionDelete } = useCourseHandler(slug);
    const [editSection, setEditSection] = useState(null);

    const handleEditSection = (sectionId) => {
        setEditSection(editSection === sectionId ? null : sectionId);
        setSuccessResponse(false)
    };

    useEffect(() => {
        if (successResponse) {
            setEditSection(false)
        }
    }, [successResponse]);


    const handleDeleteSection = (sectionId) => {
        setTimeout(() => {
            confirmAlert({
                title: 'Are you sure you want to delete this section?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => sectionDelete(sectionId)
                    },
                    {
                        label: 'No'
                    }
                ]
            });
        }, 0);
    };

    const formikRef = useRef(null);

    useEffect(() => {
     if ( formikRef.current) {
        if (section) {
            formikRef.current.setFieldValue('title', section?.title || '');
              formikRef.current.setFieldValue('learning_object', section?.learning_object || '');
              formikRef.current.setFieldValue('section_id', section?.id || '');
    }
    }
    }, []);



    return (
        <>
            <div className="upload-course-body">
                <div className="upload-course-wrapper">
                    <div className="course-curriculum">
                        <div className="upload-content">
                            <h5 className="upload-content-title">{trans(`Course Curriculum`)}</h5>
                            <div className="upload-content-block">
                                <p className="upload-content-block-text">
                                    {trans(`Start by organizing your course into clear sections and lectures, making sure each one is easy to follow. Structure everything according to your course outline to ensure a smooth and engaging learning experience for your students.`)}
                                </p>
                            </div>

                            <div className="course-section-list">

                                { !courseData ? (
                                    <div className="d-flex justify-content-center">
                                        <h3>
                                        <i className="las la-circle-notch la-spin "></i>
                                        </h3>
                                    </div>
                                
                                )
                                :
                                 courseData?.sections?.map((section, index) => (
                                    <div key={index} className="course-section">
                                        <div className="course-section-header">
                                            <span className="course-section-name">
                                                {trans('Section ')}{index + 1}:
                                            </span>
                                            <span className="course-section-title">
                                                <span className="icon">
                                                    <i className="far fa-file"></i>
                                                </span>
                                                <span className="text">{trans(`${section?.title}`)}</span>
                                            </span>
                                            <div className="course-action">
                                                <button type="button" onClick={() => handleEditSection(section?.id)} className="course-action-btn">
                                                    <span className="icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            width="16" height="16"
                                                            viewBox="0 0 24 24" fill="none"
                                                            stroke="currentColor" strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="lucide lucide-file-pen-line">
                                                            <path
                                                                d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0  0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
                                                            <path
                                                                d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                                                            <path d="M8 18h1" />
                                                        </svg>
                                                    </span>
                                                </button>
                                                <button type="button" onClick={() => handleDeleteSection(section?.id)} className="course-action-btn">
                                                    <span className="icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            width="16" height="16"
                                                            viewBox="0 0 24 24" fill="none"
                                                            stroke="currentColor" strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="lucide lucide-trash">
                                                            <path d="M3 6h18" />
                                                            <path
                                                                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                                            <path
                                                                d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>


                                            {editSection == section?.id && <div className="add-section-body ">
                                                <Formik
                                           
                                                    initialValues={{
                                                        title: section?.title || '',
                                                        learning_object: section?.learning_object || '',
                                                        section_id: section?.id || '',
                                               
                                                    }}
                                                    validationSchema={sectionValidationSchema}
                                                    onSubmit={handleSectionSubmit}
                                                >

                                                    <Form className="w-100">
                                                        <div className="form--group mb-3">
                                                            <FormLabel label={trans('Section Title')} required={true} />
                                                            <Input errorHandler={true} name='title' type="text" className="form--control" />
                                                        </div>
                                                        <div className="form--group mb-0">
                                                            <FormLabel label={trans('What will students learn from this section?')} />
                                                            <Input errorHandler={true} type="text" name='learning_object' className="form--control" />
                                                        </div>

                                                        <div className="flex-end mt-3 gap-3">
                                                            <button type="button" onClick={() => handleEditSection(section?.id)} className="new--btn">
                                                                {trans(`Cancel`)}
                                                            </button>
                                                            <SubmitBtn type="submit" isSubmitting={loading} className="save--btn" title="Update Section" />
                                                        </div>
                                                    </Form>

                                                </Formik>
                                            </div>}

                                        </div>

                                        <div className="course-section-body">
                                            {
                                                section?.curriculums?.map((curriculum, index) => (
                                                    <div key={index} >
                                                        {curriculum?.lectures && curriculum?.lectures.length > 0 && <Lecture curriculum={curriculum} slug={slug} />}
                                                        {curriculum?.quizzes && curriculum?.quizzes.length > 0 && <Quiz section={section} curriculum={curriculum} slug={slug} />}
                                                    </div>
                                                ))
                                            }
                                            <SelectCurriculumItem section={section} index={index} slug={slug} />
                                        </div>
                                    </div>
                                ))}

                                {showSectionForm ? (
                                    <SectionAddForm toggleSectionForm={toggleSectionForm} slug={slug} />
                                ) : (
                                    <button onClick={toggleSectionForm} className="new--btn mt-4">
                                        <i className="fas fa-plus"></i>
                                        {trans('Section')}
                                    </button>
                                )}




                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}