import useUtility from '@/app/_hooks/useUtility';
import VideoPlayer from '@/app/_partials/VideoPlayer';
import Link from 'next/link';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';

export default function QuizesList({ curriculum, enrolled }) {


    const { trans } = useUtility();
    const [showQuizDescription, setShowQuizDescription] = useState(false);

    const toggleQuizDescription = (quizId) => {
        setShowQuizDescription(quizId == showQuizDescription ? null : quizId);
    }


    return (
        <>
            {curriculum?.quizzes?.map((quiz, quizIndex) => (
                <div className="accordion-body" key={`${quizIndex}`}>
                    <div className="module-overview">
                        <ul className="module-overview__list">
                            <li className="module-overview__item">
                                <div className="left">
                                    <span className="icon">
                                        <i className="las la-clipboard"></i>
                                    </span>
                                    <button href="javascript:void(0)" className="module-overview__title" onClick={() => toggleQuizDescription(quiz?.id)}>
                                        {trans(quiz?.title)} {showQuizDescription == quiz?.id ? <i className="las la-angle-up"></i> : <i className="las la-angle-down"></i>}
                                    </button>


                                </div>
                                <div className="right">
                                    {enrolled && (
                                        <>
                                            <Link href={`/user/quiz/${quiz?.id}`} data-bs-toggle="modal" className="module-overview__preview">
                                                {trans('Participants')}
                                            </Link>

                                        </>
                                    )}
                                    <p className="module-overview__time">{quiz?.questions?.length ?? 0} {trans('Question')}</p>

                                </div>
                            </li>
                        </ul>
                        <div className={`quiz-description ${showQuizDescription == quiz?.id ? 'd-block' : 'd-none'}`}>
                            <p className='ms-3' dangerouslySetInnerHTML={{ __html: quiz?.description }}></p>
                        </div>
                    </div>
                </div>
            ))}
        </>

    )
}
