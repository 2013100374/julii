import useUtility from '@/app/_hooks/useUtility';
import React, { useState } from 'react';
import useQuizHandler from '../../_hooks/useQuizHandler';
import { Card } from 'react-bootstrap';
import QuizHeader from './QuizHeader';
import useCourseHandler from '../../_hooks/useCourseHandler';
import QuestionAddForm from './QuestionAddForm';
import { confirmAlert } from 'react-confirm-alert';

export default function QuizQuestions({ section, quiz, slug, quizIndex }) {
    const { trans } = useUtility();

    const { setSuccessResponse } = useCourseHandler(slug);

    const { collapse, setCollapse, deleteQuizQuestion } = useQuizHandler(slug, setSuccessResponse)


    const toggleCollapse = (quizId) => {
        collapse == quizId ? setCollapse(null) : setCollapse(quizId);
    }

    const [addQuestion, setQuestion] = useState(false);
    const [editQuestion, setEditQuestion] = useState(null);

    const toggleQuestion = (quizId, question = null) => {
        setCollapse(null);
        if (addQuestion === quizId && !question) {
            setQuestion(null);
            setEditQuestion(null);
        } else {
            setQuestion(quizId);
            setEditQuestion(question);
        }
    };


    const handleDeleteQuestion = (questionId) => {
        setTimeout(() => {
            confirmAlert({
                title: 'Are you sure you want to delete this question?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => deleteQuizQuestion(questionId)
                    },
                    {
                        label: 'No'
                    }
                ]
            });
        }, 0);
    };

    return (
        <>
            <QuizHeader section={section} quiz={quiz} quizIndex={quizIndex} slug={slug} addQuestion={() => toggleQuestion(quiz?.id)} collapse={collapse} collapseToggle={() => toggleCollapse(quiz?.id)} />

            {collapse === quiz?.id && (
                <div className="course-lecture-file">

                    <Card className="custom--card">
                        <Card.Header>
                            <div className='flex-between mb-0'>
                                <label className='form--label mb-0'>{trans(`Questions`)}</label>
                                <button type='button' className='new--btn' onClick={() => toggleQuestion(quiz?.id)} ><i className='fas fa-plus'></i>{trans('Add Question')}</button>

                            </div>
                        </Card.Header>
                        <div className='card-body'>
                            <ul>
                                {quiz?.questions?.map((item, index) => (
                                    <li key={index} className='quetions-list-item'>
                                        <div className="flex-between gap-3">
                                            <div className="question">
                                                <p>
                                                    {index + 1} : <span dangerouslySetInnerHTML={{ __html: item?.question }}></span>
                                                </p>
                                            </div>
                                            <div className="flex-align gap-2 flex-nowrap">
                                                <button type="button" onClick={() => toggleQuestion(quiz?.id, item)} ><i className="las la-pen"></i></button>
                                                <button type="button" onClick={() => handleDeleteQuestion(item?.id)} ><i className="las la-trash"></i></button>

                                            </div>
                                        </div>
                                    </li>
                                ))}

                            </ul>
                        </div>
                    </Card>
                </div>
            )}

            {
                addQuestion == quiz?.id && !collapse && <QuestionAddForm quiz={quiz} slug={slug} onCancel={() => toggleQuestion(quiz?.id)} setQuestion={setQuestion} setCollapse={setCollapse} editQuestion={editQuestion} />
            }
        </>
    );
}





