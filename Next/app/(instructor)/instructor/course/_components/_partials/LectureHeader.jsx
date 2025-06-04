import useUtility from '@/app/_hooks/useUtility';
import SubmitBtn from '@/app/_partials/SubmitBtn';
import { Form, Formik } from 'formik';
import React, { useEffect, useRef } from 'react'
import useCourseHandler from '../../_hooks/useCourseHandler';
import FormField from '@/app/_forms/FormField';
import { confirmAlert } from 'react-confirm-alert';
import { FormCheck } from 'react-bootstrap';

export default function LectureHeader({ lecture, lectureIndex, showLectureContent, toggleContentBtn, toggleContent, showContent, slug }) {
    const { trans } = useUtility();

    const handleEditLecture = () => {
        setEditLecture(!editLecture);
    }

    const {
        lectureValidationSchema,
        handleLectureSubmit,
        loading,
        lectureDelete,
        editLecture,
        setEditLecture
    } = useCourseHandler(slug);


    const handleDeleteLecture = (lectureId) => {
        setTimeout(() => {
            confirmAlert({
                title: 'Are you sure you want to delete this lecture?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => lectureDelete(lectureId)
                    },
                    {
                        label: 'No'
                    }
                ]
            });
        }, 0);
    };





    return (
        <div className="course-lecture-header">
            <div className="course-lecture-left">
                <span className="course-lecture-name">
                    <span className="icon">
                        <i className="far fa-check-circle"></i>
                    </span>
                    <span>
                        {trans('Lecture ')}{lecture?.serial_number}:
                    </span>
                </span>
                <span className="course-lecture-title">
                    <span className="icon">
                        <i className="far fa-file"></i>
                    </span>
                    <span className="text">
                        {trans(lecture?.title)}
                    </span>
                </span>


                <div className="course-action">
                    <button type="button" className="course-action-btn" onClick={handleEditLecture}>
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="16" height="16"
                                viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-file-pen-line">
                                <path
                                    d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
                                <path
                                    d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                                <path d="M8 18h1" />
                            </svg>
                        </span>
                    </button>

                    <button type="button" onClick={() => handleDeleteLecture(lecture?.id)} className="course-action-btn">
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
            </div>
            {!editLecture && <div className="course-lecture-right">
                {showLectureContent !== lectureIndex + 1 && lecture?.content_type === 0 ? (
                    <button
                        type="button"
                        onClick={toggleContentBtn}
                        className="new--btn"
                    >
                        <i className="fas fa-plus"></i>
                        {trans('Content')}
                    </button>
                ) : (
                    lecture?.resources.length > 0 | lecture?.content_type > 0 &&
                    <button type="button" onClick={toggleContent} className="course-lecture-toggle">
                        {!showContent ?
                            <i className="fas fa-chevron-down"></i> :
                            <i className="fas fa-chevron-up"></i>
                        }
                    </button>
                )}
            </div>}

            {
                editLecture &&
                <div className="add-section-body mt-4 ">
                    <Formik
                        initialValues={{
                            title: lecture?.title || '',
                            section_id: lecture?.course_section_id || '',
                            lecture_id: lecture?.id || '',
                            is_preview: lecture?.is_preview ?? false,
                        }}
                        validationSchema={lectureValidationSchema}
                        enableReinitialize={true}
                        onSubmit={handleLectureSubmit}
                    >
                        {({ setFieldValue, values }) => {

                            return (
                                <Form>
                                    <FormField name="title" label="Lecture Title" required={true} />
                                    <FormCheck
                                        className='form--switch p-0'
                                        type="switch"
                                        name="is_preview"
                                        id="preview-switch"
                                        label="Enable Preview"
                                        checked={values?.is_preview}
                                        onChange={(e) => setFieldValue("is_preview", e.target.checked)}
                                    />

                                    <div className="flex-end mt-3 gap-3">
                                        <button onClick={handleEditLecture} className="new--btn">{trans('Cancel')}</button>
                                        <SubmitBtn isSubmitting={loading} className="save--btn" title={trans("Update Lecture")} />
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>

                </div>

            }

        </div>
    )
}
