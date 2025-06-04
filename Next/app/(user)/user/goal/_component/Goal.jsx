'use client';
import useUtility from '@/app/_hooks/useUtility';
import ENDPOINTS from '@/lib/endpoints';
import { request } from '@/lib/helpers';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import SubmitBtn from '@/app/_partials/SubmitBtn';
import GoalSkeleton from './GoalSkeleton';
import useGoalHandler from '../_hooks/useGoalHandler';

export default function Goal() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [userGoal, setUserGoal] = useState(null);
    const [goals, setGoals] = useState([]);
    const { initialValues, handleSubmit, loading, setLoading } = useGoalHandler(setUserGoal);
    const { trans } = useUtility();
    const [isLoading , setIsLoading] = useState(false);

    useEffect(() => {
        const fetchGoal = async () => {
            setIsLoading(true);  
            try {
                const { data } = await request.get(ENDPOINTS.GOALS);
                setGoals(data?.data?.goals || []);
                setUserGoal(data?.data?.user_goal || {});
            } catch (error) {
                console.error('Error fetching goals:', error);
            } finally {
                setIsLoading(false);  
            }
        };
        fetchGoal();
    }, [setIsLoading]);

    useEffect(() => {
        if (userGoal?.days) {
            setActiveIndex(userGoal.days - 1);
        }
    }, [userGoal]);

    return (
        <div className="dashboard-main__wrapper">
            <h5 className="dashboard-main__title">{trans(`Goal Settings`)}</h5>

            <Formik
                initialValues={{
                    ...initialValues,
                    goal: userGoal?.goal_id || '',
                    days: userGoal?.days || '',
                    user_goal_id: userGoal?.id || '',
                }}
                enableReinitialize={true}
                onSubmit={(values, actions) => {
                    handleSubmit(values, actions);
                }}
            >
                {({ setFieldValue, values }) => (
                    <Form>
                        <div className="set-goal">
                            <h6 className="set-goal__title">{trans(`What is your goal?`)}</h6>
                            <ul className="set-goal__list">
                                {isLoading ? (
                                    <GoalSkeleton count={6} /> 
                                ) : goals.length > 0 ? (
                                    goals.map((goal) => (
                                        <li key={goal.id} className="set-goal-item">
                                            <div className="set-goal-item__check">
                                                <Field
                                                    className="quiz-mcq-item__check-input"
                                                    id={`goal-${goal.id}`}
                                                    type="radio"
                                                    name="goal"
                                                    value={goal.id}
                                                    onChange={() => setFieldValue('goal', goal.id)}
                                                    checked={values.goal === goal.id}
                                                />
                                                <label htmlFor={`goal-${goal.id}`}></label>
                                            </div>
                                            <p className="set-goal-item__text">{trans(goal.title)}</p>
                                        </li>
                                    ))
                                ) : (
                                    <p>{trans(`No goals found. Please add a new goal.`)}</p>
                                )}
                            </ul>
                        </div>

                        <div className="set-goal">
                            <h6 className="set-goal__title">{trans(`What is your weekly learning target?`)}</h6>
                            <div className="weeks-calendar">
                                <ul className="weeks-calendar__list set-goal-calendar">
                                    {['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'].map((day, index) => (
                                        <li
                                            key={index}
                                            className={`weeks-calendar__item ${
                                                (activeIndex ?? userGoal?.days - 1) >= index ? 'active' : ''
                                            }`}
                                            onClick={() => {
                                                setActiveIndex(index);
                                                setFieldValue('days', index + 1);
                                            }}
                                        >
                                            <span className="text"></span>
                                        </li>
                                    ))}
                                </ul>

                                {activeIndex !== null && (
                                    <div
                                        className="weeks-calendar-count"
                                        style={{
                                            left: `${activeIndex * 58}px`,
                                        }}
                                    >
                                        <span className="number">{activeIndex + 1}</span>
                                        <span>{trans(`days/week`)}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="edit-account__button">
                            <SubmitBtn isSubmitting={loading} className="btn btn--base btn--shadow" title={trans('Submit')} />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
