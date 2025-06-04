'use client';
import useUtility from '@/app/_hooks/useUtility';
import { showDateTime } from '@/lib/helpers';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import QuizBreadcrumbSkeleton from './QuizBreadcrumbSkeleton';

export default function QuizBrudcrumb({quiz, loading}) {
    const {trans} = useUtility();
        const [currentDate, setCurrentDate] = useState('');
    
        useEffect(() => {
    
    
            const date = new Date();
            setCurrentDate(date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }));
    
        }, []);
    
  

    return (
        loading ? <QuizBreadcrumbSkeleton/> :
        <section className="quiz-breadcrumb">
            <div className="container">
                <Link href={`/user/quiz/${quiz?.id}`} className="quiz-breadcrumb-back"> <span className="icon"><i className="fas fa-arrow-left"></i></span>
                    {trans(`Back`)}</Link>
                <div className="quiz-breadcrumb__wrapper">
                    <div className="quiz-breadcrumb__content">
                        <h4 className="quiz-breadcrumb__title"><span>{trans(`Quiz`)}: </span> {trans(quiz?.title)}</h4>
                        <p className="quiz-breadcrumb__desc"> {quiz?.questions?.length} {trans(`Question`)}</p>
                    </div>

                    <div className="quiz-date">
                        <p className="quiz-date__title">{trans(`Date`)}</p>
                        <p className="quiz-date__time">{showDateTime(currentDate, 'DD MMM YYYY')}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
