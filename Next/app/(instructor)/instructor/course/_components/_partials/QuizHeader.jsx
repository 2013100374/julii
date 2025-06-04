import useUtility from '@/app/_hooks/useUtility';
import { useState } from 'react';
import QuizAddForm from './QuizAddForm';
import useQuizHandler from '../../_hooks/useQuizHandler';
import { confirmAlert } from 'react-confirm-alert';


export default function QuizHeader({ section = '', quiz, addQuestion, collapse, collapseToggle, slug }) {
    const { trans } = useUtility();

    const [ediQuiz, setEditQuiz] = useState(false);

    const toggleEditQuiz = (quizId) => {
        setEditQuiz(ediQuiz === quizId ? null : quizId)
    }

    const {deleteQuiz} = useQuizHandler(slug)

    const handleDeleteQuiz = (quizId) => {      
        setTimeout(() => {
            confirmAlert({
                title: 'Are you sure you want to delete this quiz?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => deleteQuiz(quizId)
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
                        {trans('Quiz ')}{quiz?.serial_number}:
                    </span>
                </span>
                <span className="course-lecture-title">
                    <span className="icon">
                        <i className="far fa-file"></i>
                    </span>
                    <span className="text">
                        {trans(quiz?.title)}
                    </span>
                </span>

                <div className="course-action" >
                    <button type="button" onClick={() => toggleEditQuiz(quiz?.id)} className="course-action-btn" >
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

                    <button type="button" onClick={()=>handleDeleteQuiz(quiz?.id)} className="course-action-btn">
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


            {ediQuiz != quiz?.id && <div className="course-lecture-right">
                {
                    quiz?.questions.length == 0 && <button type="button" onClick={addQuestion} className="new--btn">
                        <i className="fas fa-plus"></i>
                        {trans('Questions')}
                    </button>
                }
                {
                    quiz?.questions.length > 0 && (
                        <button type="button" onClick={collapseToggle} className="course-lecture-toggle">
                            {
                                collapse == quiz?.id ?
                                    <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>
                            }
                        </button>
                    )
                }
            </div>
            }

            {
                ediQuiz == quiz?.id &&
                <div className="add-section-body mt-4 ">
                    <QuizAddForm section={section} quiz={quiz} setEditQuiz={setEditQuiz} toggleWrapper={() => toggleEditQuiz(quiz?.id)}  slug={slug} />
                </div>
            }
        </div>
    )
}
