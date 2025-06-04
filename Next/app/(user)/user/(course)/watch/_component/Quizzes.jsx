import useUtility from '@/app/_hooks/useUtility'
import React, { useState } from 'react'
import useWatchHandler from '../_hooks/useWatchHandler';
import Link from 'next/link';

export default function Quizzes({ curriculum, curIndex, setCompletedLectures }) {
  const { trans } = useUtility()

  const { completeCurriculum, submitActivity  } = useWatchHandler();

  const [isCompleted, setIsCompleted] = useState(curriculum?.is_completed);

  const handleCheckboxChange = (curriculumId) => {
    setIsCompleted(!isCompleted);
    setCompletedLectures((prev) => [...prev, curriculumId]);
    completeCurriculum(curriculum?.id, !isCompleted);
  };


  return (
    <>
      {curriculum?.quizzes?.map((quiz, index) => (
        <li key={index} className="course-video-item">
          <div className="course-video-item__left">
            <div className="form--check">
              <input className="form-check-input" type="checkbox" checked={isCompleted}
                disabled={isCompleted}
                onChange={()=>handleCheckboxChange(curriculum?.id)} />
              
              <Link href={`/user/quiz/${quiz?.id}`}  className="form-check-label text-dark"  >{curIndex}. {trans(quiz?.title)}</Link>
            </div>
          </div>
          <div className="course-video-item__right">
            <span className="inner-text">{trans(`Quiz`)}</span>
          </div>
        </li>

      ))}
    </>
  )
}
