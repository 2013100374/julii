
import React  from 'react'
import QuizForm from '../../_component/QuizForm';
import { getMetaTitle } from '@/lib/helpers';


export const metadata = getMetaTitle('Quiz');

export default async function page( props) {

    const params = await props.params;
    const { quiz_id } = params;



    return (
        <>
            <QuizForm quizId={quiz_id} />
        </>
    )
}
