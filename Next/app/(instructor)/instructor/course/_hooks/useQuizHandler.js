import React from 'react'
import { getCourseDetails, notifyToast, request } from '@/lib/helpers';
import toast from 'react-hot-toast';
import ENDPOINTS from '@/lib/endpoints';
import { array, boolean, object, string } from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseData } from '@/store/courseSlice';




const useQuizHandler = (slug = null, setSuccessResponse) => {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();
    const { data: courseData } = useSelector((state) => state?.course);
    const [collapse, setCollapse] = useState(false);
    const [answers, setAnswers] = useState([{ answer: '', explanation: '', correct: false }]);



    const initialQuizValues = {
        title: '',
        description: '',
        section_id: '',
        quiz_id: '',
        passing_percentage: '',
   
    };
    const quizValidationSchema = object().shape({
        title: string().required('Title is required'),
        description: string().required('Description is required'),
        section_id: string().required('Section id required'),
        passing_percentage: string().required('Passing percentage required'),

    });

    const handleQuizSubmit = async (values, { resetForm }) => {
        setLoading(true);
        try {
            
            const { data } = await request.post(`${ENDPOINTS.ADD_QUIZ}/${slug}`, values);

            if (data.status === 'error') {
                notifyToast(data);
                return;
            }

            const course = await getCourseDetails(slug);
            dispatch(setCourseData(course));

            setSuccessResponse(true); 

            resetForm();
        } catch (error) {
            toast.error('Failed to create the quiz. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const initialQuizQuestionValues = {
        section_id: '',
        quiz_id: '',
        question: '',
        answers: [
            {
                answer: '',
                explanation: '',
                correct: false,
            },
        ],
    }


    const quizQuestionValidationSchema = object().shape({
        section_id: string().required('Section ID is required'),
        quiz_id: string().required('Quiz ID is required'),
        question: string().required('Question is required'),
        answers: array()
            .of(
                object().shape({
                    answer: string().required('Answer is required'),
                    explanation: string().optional(),
                    correct: boolean().oneOf([true, false], 'Answer field must be a boolean').required('Answer selection is required'),
                })
            )
            .test('one-answer-with-value', 'At least one answer must have a value', (answers) => {
                if (!Array.isArray(answers)) return false;

                return answers.some(item => item.answer && item.answer.trim().length > 0);
            })
            .test('only-one-correct', 'Only one answer should be marked as correct', (answers) => {
                if (!Array.isArray(answers)) return false;
                const correctAnswers = answers.filter(item => item.correct === true);
                return correctAnswers.length === 1;
            }),
    });





    const handleQuizQuestionSubmit = async (values, { resetForm }) => {
        setLoading(true);
        try {
            const { data } = await request.post(`${ENDPOINTS.ADD_QUIZ_QUESTIONS}/${slug}`, values);

            if (data.status === 'error') {
                notifyToast(data);
                return;
            }
            const course = await getCourseDetails(slug);
            dispatch(setCourseData(course));
            setCollapse(data?.data?.quiz?.id)
            resetForm();
            setAnswers([{ answer: '', explanation: '', correct: false }]);
        } finally {
            setLoading(false);
        }
    };




    const deleteQuiz = async (quizId) =>{
        try {
            const { data } = await request.get(ENDPOINTS.QUIZ_DELETE + '/' + quizId);
            const course = await getCourseDetails(slug);
            dispatch(setCourseData(course));
            notifyToast(data);
        } catch (error) {
            console.error('Error closing ticket:', error);
            toast.error('An error occurred while deletig your quiz');
        } 
    }


    const deleteQuizQuestion = async (questionId) => {
        try {
            const { data } = await request.get(ENDPOINTS.QUESTION_DELETE + '/' + questionId);
            const course = await getCourseDetails(slug);
            dispatch(setCourseData(course));
            notifyToast(data);
        } catch (error) {
            console.error('Error closing ticket:', error);
            toast.error('An error occurred while deletig your quiz question');
        }
    }




    return {
        initialQuizValues,
        quizValidationSchema,
        handleQuizSubmit,
        initialQuizQuestionValues,
        quizQuestionValidationSchema,
        handleQuizQuestionSubmit,
        isLoading,
        collapse,
        setCollapse,
        answers,
        setAnswers, 
        deleteQuiz,
        deleteQuizQuestion
    };
}



export default useQuizHandler;