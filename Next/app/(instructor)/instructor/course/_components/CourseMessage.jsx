"use client"
import SubmitBtn from "@/app/_partials/SubmitBtn"
import { Field, Form, Formik } from "formik"
import { useEffect, useRef } from "react"
import useContentHandler from "../_hooks/useContentHandler"
import useUtility from "@/app/_hooks/useUtility"
import { useSelector } from "react-redux"

export default function CourseMessage({ slug }) {
  const { initialMessageValues, messageValidationSchema, handleMessageSubmit, loading } = useContentHandler(slug)
  const { trans } = useUtility()
  const { data: courseData } = useSelector((state) => state?.course)

  // Use useRef instead of useState to avoid state updates during render
  const formikRef = useRef(null)

  // Move useEffect to the top level
  useEffect(() => {
    if (!formikRef.current) return

    formikRef.current.setFieldValue("welcome_message", courseData?.welcome_message ?? "")
    formikRef.current.setFieldValue("congrats_message", courseData?.congrats_message ?? "")
  }, [courseData])

  return (
    <div className="upload-course-body">
      <div className="course-message ">
        <div className="upload-content">
          <h5 className="upload-content-title">{trans('Course Messages')}</h5>
          <div className="upload-content-block">
            <p className="upload-content-block-text">
              {trans('Write messages to your students (optional) that will be sent automatically when they join or complete your course to encourage students to engage with course content. If you do not wish to send a welcome or congratulations message, leave the text box blank.')}
            </p>

            <Formik
              initialValues={initialMessageValues}
              validationSchema={messageValidationSchema}
              onSubmit={handleMessageSubmit}
            >
              {(formik) => {
                // Store formik in ref without triggering re-renders
                formikRef.current = formik

                return (
                  <Form>
                    <div className="upload-content-form mt-4">
                      <div className="form-group">
                        <label htmlFor="welcome_message" className="form--label">
                          {trans(`Welcome message`)}
                        </label>
                        <Field
                          as="textarea"
                          className="form--control"
                          id="welcome_message"
                          name="welcome_message"
                        ></Field>
                      </div>
                      <div className="form-group">
                        <label htmlFor="congrats_message" className="form--label">
                          {trans(`Congratulations message`)}
                        </label>
                        <Field
                          as="textarea"
                          className="form--control"
                          id="congrats_message"
                          name="congrats_message"
                          required={true}
                        ></Field>
                      </div>
                      <div className="form-group text-end">
                        <SubmitBtn isSubmitting={loading} type="submit" className="btn btn--base" title="Save" />
                      </div>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

