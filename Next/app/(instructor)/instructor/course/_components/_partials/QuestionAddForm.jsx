import React, { useEffect, useRef, useState } from 'react'
import useQuizHandler from '../../_hooks/useQuizHandler';
import useCourseHandler from '../../_hooks/useCourseHandler';
import useUtility from '@/app/_hooks/useUtility';
import { FieldArray, Form, Formik } from 'formik';
import Editor from './Editor';
import { Card } from 'react-bootstrap';
import Input from '@/app/_forms/Input';
import SubmitBtn from '@/app/_partials/SubmitBtn';

export default function QuestionAddForm({ quiz, slug, onCancel, setQuestion, setCollapse, editQuestion }) {



    const { setSuccessResponse } = useCourseHandler(slug);

    const { initialQuizQuestionValues, quizQuestionValidationSchema, handleQuizQuestionSubmit, isLoading, collapse, answers, setAnswers } = useQuizHandler(slug, setSuccessResponse)

    const { trans } = useUtility();

    const addAnswer = () => {
        setAnswers([...answers, { answer: '', explanation: '', correct: false }]);
    };

    const deleteAnswer = (index) => {
        setAnswers(answers.filter((_, i) => i !== index));
    };
    const quillRef = useRef();


    useEffect(() => {
        if (collapse) {
            setCollapse(quiz?.id);
            setQuestion(false);
        }
    }, [collapse, quiz, setCollapse, setQuestion]);



    useEffect(() => {
        if (editQuestion) {
            const formattedAnswers = editQuestion.options?.map(opt => ({
                answer: opt.option,
                explanation: opt.explanation,
                correct: opt.answer === 1,
            })) || [{ answer: '', explanation: '', correct: false }];

            setAnswers(formattedAnswers);
        }
    }, [editQuestion, setAnswers]);


    return (
        <div className="course-lecture-body">
            <div className="course-lecture-file">
                <div className="course-lecture-file-title">
                    <span className="text">{editQuestion ? trans('Edit Question') : trans('Add Multiple Choice')}</span>
                    <button type="button" onClick={onCancel} className="cross-icon">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <Formik
                    initialValues={{
                        ...initialQuizQuestionValues,
                        point: editQuestion?.point || 0, // Ensure point value is included
                    }}
                    validationSchema={quizQuestionValidationSchema}
                    onSubmit={handleQuizQuestionSubmit} >
                    {({ setFieldValue }) => (
                        <Form>
                            <div className="add-section-body">
                                <label className="form--label">{trans('Question')}</label>
                                <Editor
                                    ref={quillRef}
                                    readOnly={false}
                                    defaultValue={editQuestion?.question}
                                    onTextChange={(content) => {
                                        setFieldValue('question', content);
                                    }}
                                />

                                <FieldArray
                                    name="answers"
                                    render={(arrayHelpers) => (
                                        <div>
                                            {answers.map((answer, index) => (
                                                <Card key={index} className='custom--card mb-3 mt-3'>
                                                    <div className="card-body">
                                                        <div className="question-wrapper  d-flex mt-3">
                                                            <div className="question-item flex-grow-1">
                                                                <div className="flex-align align-items-start gap-3">
                                                                    <div className="form--radio">
                                                                        <Input
                                                                            className="form-check-input p-2"
                                                                            type="radio"
                                                                            name="correct"
                                                                            onChange={() => {
                                                                                const updatedAnswers = answers.map((ans, i) => ({ ...ans, correct: i === index, }));
                                                                                setAnswers(updatedAnswers);
                                                                                setFieldValue('answers', updatedAnswers);
                                                                            }}
                                                                            checked={answer?.correct}
                                                                            required={true}
                                                                        />
                                                                    </div>
                                                                    <div className="form-group flex-grow-1 mb-0">
                                                                        <Input
                                                                            className="form--control"
                                                                            name={`answers[${index}].answer`}
                                                                            onChange={(e) => {
                                                                                const updatedAnswers = [...answers];
                                                                                updatedAnswers[index].answer = e.target.value;
                                                                                setAnswers(updatedAnswers);
                                                                                setFieldValue('answers', updatedAnswers);
                                                                            }}
                                                                            value={answer?.answer}
                                                                            placeholder="Add an answer"
                                                                            errorHandler={index != answers.length - 1 ? true : false}
                                                                        />
                                                                    </div>

                                                                </div>
                                                                <div className="form-group mb-0 text-end mt-3">
                                                                    <Input
                                                                        className="form--control w-75"
                                                                        name={`answers[${index}].explanation`}
                                                                        onChange={(e) => {
                                                                            const updatedAnswers = [...answers];
                                                                            updatedAnswers[index].explanation = e.target.value;
                                                                            setAnswers(updatedAnswers);
                                                                            setFieldValue('answers', updatedAnswers);
                                                                        }}
                                                                        value={answer?.explanation}
                                                                        type="text"
                                                                        placeholder="Add an explanation"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    if (answers.length !== 1) {
                                                                        deleteAnswer(index);
                                                                        arrayHelpers.remove(index);
                                                                    }
                                                                }}
                                                                className={`course-action-btn question-btn ms-3 ${answers.length === 1 && 'disabled-btn'}`}
                                                            >
                                                                <span className="icon">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="lucide lucide-trash"
                                                                    >
                                                                        <path d="M3 6h18" />
                                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                                                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                                    </svg>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))}
                                            <button type='button' className='new--btn' onClick={addAnswer} ><i className='fas fa-plus'></i>{trans('Add New')}</button>
                                        </div>
                                    )}
                                />
                            </div>

                            <div className="flex-end mt-3 gap-3">
                                <button type="button" onClick={onCancel} className="new--btn">{trans('Cancel')}</button>

                                <SubmitBtn type="submit" isSubmitting={isLoading} onClick={() => {
                                    setFieldValue('section_id', quiz?.course_section_id);
                                    setFieldValue('quiz_id', quiz?.id);
                                    if (editQuestion) {
                                        setFieldValue('question_id', editQuestion?.id);
                                        setFieldValue('answers', answers);
                                    }
                                }} className="save--btn" title="Save"
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div >
    )
}
