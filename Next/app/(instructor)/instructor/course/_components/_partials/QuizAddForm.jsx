import React, { useEffect, useRef } from 'react'
import useQuizHandler from '../../_hooks/useQuizHandler';
import useCourseHandler from '../../_hooks/useCourseHandler';
import { Form, Formik } from 'formik';
import Editor from './Editor';
import FormField from '@/app/_forms/FormField';
import SubmitBtn from '@/app/_partials/SubmitBtn';
import useUtility from '@/app/_hooks/useUtility';

export default function QuizAddForm({ section, slug, toggleWrapper, quiz = '', setEditQuiz }) {

    const { successResponse, setSuccessResponse } = useCourseHandler(slug);
    const { initialQuizValues, quizValidationSchema, handleQuizSubmit, isLoading } = useQuizHandler(slug, setSuccessResponse);
    const { trans } = useUtility();
    const quillRef = useRef();


    useEffect(() => {
        if (successResponse) {

            quiz ? setEditQuiz(false) : toggleWrapper();

        }
    }, [successResponse,quiz,setEditQuiz,toggleWrapper]);


    if (quiz) {
        initialQuizValues.title = quiz?.title
        initialQuizValues.description = quiz?.description
        initialQuizValues.passing_percentage = quiz?.passing_percentage
    }

    return (
        <Formik
            initialValues={initialQuizValues}
            validationSchema={quizValidationSchema}
            onSubmit={handleQuizSubmit}
        >
            {({ setFieldValue }) => (
                <Form>
                    <FormField name="title" label="Quiz Title" required={true} />

                    <FormField name="passing_percentage" label="Passing Percentage" required={true} inputGroup={true} inputGroupTextPosition="right" inputGroupText='%' />

                    <div className="form--group mb-3">
                        <label className="form--label">{trans('Quiz Description')}</label>
                        <Editor ref={quillRef} readOnly={false} defaultValue={quiz?.description ?? ''} onTextChange={(content) => {
                            setFieldValue('description', content);
                        }}
                        />
                    </div>
                    <div className="flex-end mt- 3 gap-3">
                        <button type='button' onClick={toggleWrapper} className="new--btn">{trans('Cancel')}</button>
                        <SubmitBtn isSubmitting={isLoading} className="save--btn" onClick={() => {
                            setFieldValue("section_id", section?.id);
                            quiz && setFieldValue("quiz_id", quiz?.id);
                        }} title={quiz ? trans("Update Quiz") : trans("Add Quiz")} />
                    </div>
                </Form>
            )}
        </Formik>
    )
}
