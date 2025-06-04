'use client'
import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { notFound, useRouter } from 'next/navigation';
import { frontendImage, request, showDateTime } from '@/lib/helpers';
import ENDPOINTS from '@/lib/endpoints';
import useUtility from '@/app/_hooks/useUtility';
import Link from 'next/link';
import { useSection } from '@/app/_partials/_sections/_hooks/useSection';
import { Image } from 'react-bootstrap';
import QuizViewSkeleton from './QuizViewSkeleton';



export default function View({ quizId }) {

    const { trans } = useUtility();
    const router = useRouter(); 

    const { content} = useSection('quiz_view');
    const [quiz, setQuiz] = useState();
     const [quizLoading, setQuizLoading] = useState(false);


    useEffect(() => {
        const fetchQuizData = async () => {
            setQuizLoading(true);
            try {
                const { data } = await request.get(`${ENDPOINTS.QUIZ_VIEW}/${quizId}`);

                if (data.status === 'error') {
                    setQuiz(data)
                    return;
                }
     
                    setQuiz(data?.data?.quiz);
            } catch (error) {
                console.error(error);
                
            }finally{

                setQuizLoading(false);

            }
        };

        fetchQuizData();
    }, [quizId,setQuiz,setQuizLoading ]);

    const [currentDate, setCurrentDate] = useState('');
    

    useEffect(() => {
        const date = new Date();
        setCurrentDate(date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }));

        if(quiz?.status == 'error'){
            return notFound();
        }
    }, [quiz]);



    return (
        <>
        {
           
            quizLoading ? 
    
            <QuizViewSkeleton />

             : 
              
                <section className="quiz-view py-100">
                    <div className="container">
                        <div className="quiz-board bg-img">
                            <div className="quiz-board__wrapper">
                                <div className="quiz-board__icon">
                                    <Image src={frontendImage( content?.data_values?.image,'quiz_view')} alt="icon" />
                                </div>
                                <div className="quiz-board__content">
                                    <div className="quiz-board-header">
                                        <div className="quiz-board-header__left">
                                            <h4 className="quiz-board-header__heading">{trans(`Quiz`)}:</h4>
                                            <h4 className="quiz-board-header__title">{quiz?.title}</h4>
                                        </div>
        
                                        <div className="quiz-date">
                                            <p className="quiz-date__title">{trans(`Date`)}</p>
                                            <p className="quiz-date__time">{showDateTime(currentDate, 'DD MMM YYYY')}</p>
                                        </div>
                                    </div>
                                    <div className="quiz-result">
                                        <div className="quiz-result__info">
                                            <p className="quiz-result__title">{trans(`Receive grade`)}</p>
        
                                            <p className="quiz-result__desc">
        
                                                {quiz?.quiz_results?.is_participate ? (
                                                    <>
                                                        {trans(`Your Earn Percentage`)} {parseFloat(quiz?.quiz_results?.percentage).toFixed(0)}% <br />
                                                        <strong>{quiz?.quiz_results?.percentage >= quiz?.passing_percentage ? <span className='badge badge--success'>{trans(`Pass`)}</span> : <span className='badge badge--danger'>{trans(`Fail`)}</span>}</strong>
                                                    </>
                                                ) : (
                                                    <>
                                                        {trans(`To Pass`)} {parseFloat(quiz?.passing_percentage).toFixed(0)}% <strong>{trans(`or higher`)}</strong>
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                        <div className="quiz-grade">
                                            <p className="quiz-grade__title">{trans(`Your Grade`)}</p>
                                            {quiz?.quiz_results?.is_participate ? <p className="quiz-grade__mark">{quiz?.quiz_results?.get_point} {trans(`out of`)} {quiz?.total_grade} </p> : <p className="quiz-grade__mark">-</p>}
        
                                        </div>
                                    </div>
                                    {!quiz?.quiz_results?.is_participate ?
                                        <div className="quiz-board__button">
                                            <Link href={`/user/quiz/view/${quiz?.id}`} className="btn btn--base btn--sm">{trans(`Start Quiz`)}</Link>
                                        </div> :
                                        <div className="quiz-board__button">
                                        <Link href={`/user/quiz/view/${quiz?.id}`} className="btn btn--base btn--sm">{trans(`Retake Quiz`)}</Link>
                                    </div>
                                    }
        
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        }
        </>
    );
}
