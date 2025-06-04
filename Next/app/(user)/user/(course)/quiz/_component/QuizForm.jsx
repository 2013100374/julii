"use client";
import React, { useEffect, useState } from "react";
import QuizBrudcrumb from "./QuizBrudcrumb";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { notFound } from "next/navigation";
import { request } from "@/lib/helpers";
import ENDPOINTS from "@/lib/endpoints";
import { setQuizData } from "@/store/quizSlice";
import useUtility from "@/app/_hooks/useUtility";
import { Field, Form, Formik } from "formik";
import SubmitBtn from "@/app/_partials/SubmitBtn";
import useWatchHandler from "../../watch/_hooks/useWatchHandler";

export default function QuizForm({ quizId }) {
  const dispatch = useDispatch();
  const { trans } = useUtility();

  const {
    handleQuizSubmit,
    initialQuestionValues,
    quizValidationSchema,
    loading,
  } = useWatchHandler();

  const [quiz, setQuiz] = useState([]);
  const [quizLoading, setQuizLoading] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      setQuizLoading(true);
      try {
        const { data } = await request.get(`${ENDPOINTS.QUIZ_VIEW}/${quizId}`);
        if (data.status === "error") {
          setQuiz(data);
        }
        setQuiz(data?.data?.quiz);
      } catch (error) {
        console.error("Failed to fetch quiz data:", error);
      } finally {
        setQuizLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId, setQuiz]);

  if (quiz?.status == "error") {
    return notFound();
  }

  return (
    <>
      <QuizBrudcrumb quiz={quiz} loading={quizLoading} />

      {quizLoading ? (
        <section className="quiz-setion py-100 ">
          <div className="container">
            <div className="quiz-wrapper">
            <h4 className="text-center mb-0">
              <i className="las la-circle-notch la-spin"></i>Loading....
            </h4>

            </div>
          </div>
        </section>
      ) : (
        <section className="quiz-setion py-100">
          <div className="container">
            <Formik
              className="quiz-form"
              initialValues={initialQuestionValues}
              validationSchema={quizValidationSchema}
              onSubmit={handleQuizSubmit}
            >
              {({ setFieldValue }) => (
                <Form>
                  <div className="quiz-wrapper">
                    {quiz?.questions?.map((question, index) => (
                      <div key={index} className="quiz-mcq">
                        <div className="quiz-mcq__header">
                          <h6 className="quiz-mcq__title">
                            <span className="count">{index + 1}.</span>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: question?.question,
                              }}
                            ></span>
                          </h6>
                        </div>
                        <div className="quiz-mcq-wrapper">
                          <ul className="quiz-mcq-item__list">
                            {question?.options?.map((option, opIndex) => (
                              <li key={opIndex} className="quiz-mcq-item">
                                <div className="quiz-mcq-item__check">
                                  <Field
                                    className="quiz-mcq-item__check-input"
                                    id={`option-${option?.id}`}
                                    type="radio"
                                    name={`answers.${index}`}
                                    value={option?.id}
                                    onChange={() =>
                                      setFieldValue(
                                        `answers.${index}`,
                                        option?.id
                                      )
                                    }
                                    required
                                  />
                                  <label
                                    htmlFor={`option-${option?.id}`}
                                  ></label>
                                </div>
                                <p className="quiz-mcq-item__text">
                                  {trans(option?.option)}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}

                    <SubmitBtn
                      isSubmitting={loading}
                      type="submit"
                      className="btn btn--base btn--sm"
                      onClick={() => {
                        setFieldValue("quiz_id", quiz?.id);
                      }}
                      title={trans(`Submit`)}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </section>
      )}
    </>
  );
}
