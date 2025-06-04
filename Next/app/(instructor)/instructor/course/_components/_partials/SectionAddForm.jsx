import FormLabel from '@/app/_forms/FormLabel'
import Input from '@/app/_forms/Input'
import useUtility from '@/app/_hooks/useUtility'
import SubmitBtn from '@/app/_partials/SubmitBtn'
import { Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import useCourseHandler from '../../_hooks/useCourseHandler'

export default function SectionAddForm({toggleSectionForm,slug}) {
    const {  trans } = useUtility()
    const {
        initialSectionValues,
        sectionValidationSchema,
        handleSectionSubmit,
        successResponse,
        loading
    } = useCourseHandler(slug);
  
    useEffect(() => {
        if (successResponse) {
            toggleSectionForm();
        }
    }, [successResponse, toggleSectionForm]);

    return (
        <>
            <button onClick={toggleSectionForm} className="new--btn mt-4">
                <i className="fas fa-times"></i>
            </button>
            <div className="course-section mt-4">
                <div className="course-section-header">
                    <Formik
                        initialValues={initialSectionValues}
                        validationSchema={sectionValidationSchema}
                        onSubmit={handleSectionSubmit}
                    >
                        <Form className="w-100">
                            <div className="form--group mb-3">
                                <FormLabel name="password" label={trans('Section Title')} required={true} />
                                <Input errorHandler={true} name='title' type="text" className="form--control" />
                            </div>
                            <div className="form--group mb-0">
                                <FormLabel name="password" label={trans('What will students be able to do at the end of this section?')} required={true} />
                                <Input errorHandler={true} type="text" name='learning_object' className="form--control" />
                            </div>

                            <div className="flex-end mt-3 gap-3">
                                <SubmitBtn type="submit" isSubmitting={loading} className="btn btn--base" title="Add Section" />
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}
