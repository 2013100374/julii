import React, { useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import useUtility from '@/app/_hooks/useUtility';
import useCourseHandler from '../../_hooks/useCourseHandler';
import SubmitBtn from '@/app/_partials/SubmitBtn';

export default function VideoUploadForm({ lecture, slug, onCancel }) {
    const { trans } = useUtility();

    const {
        initialLectureVideoValues,
        lectureVideoValidationSchema,
        handleLectureVideoSubmit,
        successResponse,
        loading,
        setVideoDocument

    } = useCourseHandler(slug);


    useEffect(() => {
        if (successResponse) {
            onCancel();
        }
    }, [successResponse, onCancel]);





    return (
        <Formik
            initialValues={initialLectureVideoValues}
            validationSchema={lectureVideoValidationSchema}
            onSubmit={handleLectureVideoSubmit}
        >
            {({ setFieldValue, handleSubmit }) => (
                <Form>
                    <div className="course-lecture-file-video">
                        <label htmlFor="course-file" className="file-upload-label">
                            <Field
                                accept="video/*"
                                type="file"
                                name="video"
                                id="course-file"
                                className="file-input"
                                aria-label={trans('Upload Course Video')}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setFieldValue('video_file', file);

                                    const video = document.createElement('video');
                                    setVideoDocument(video);
                                    setFieldValue('section_id', lecture?.course_section_id);
                                    setFieldValue('lecture_id', lecture?.id);

                                    setTimeout(() => {
                                        handleSubmit();
                                    }, 0)

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
                            <span className="text">{trans('Upload Course Video')}</span>
                        </label>
                        <div className="flex-end mt-3 gap-3">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="new--btn"
                            >
                                {trans('Cancel')}
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
