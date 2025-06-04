import React from 'react'
import QuizQuestions from './QuizQuestions';

export default function Quiz({ section, curriculum, slug }) {

    return (
        <>
            {curriculum?.quizzes?.length > 0 && curriculum?.quizzes?.map((quiz, quizIndex) => {
                return (
                    <div key={quizIndex} className="course-lecture mb-3">
                        {<QuizQuestions section={section} quiz={quiz}  slug={slug} quizIndex={quizIndex} />  }
                    </div>
                );
            })}
        </>
    )
}
