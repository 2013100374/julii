"use client"
import Input from "@/app/_forms/Input"
import useUtility from "@/app/_hooks/useUtility"
import { getCategories, getCourseImage } from "@/lib/helpers"
import { Field, Form, Formik } from "formik"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import useContentHandler from "../_hooks/useContentHandler"
import Editor from "./_partials/Editor"
import SubmitBtn from "@/app/_partials/SubmitBtn"
import { Image } from "react-bootstrap"
import FormField from "@/app/_forms/FormField"

export default function CourseContent({ slug }) {
  const { trans } = useUtility()
  const { data: courseData } = useSelector((state) => state?.course)

  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)

  const { initialValues, contentValidationSchema, handleSubmit, loading } = useContentHandler(slug)
  const quillRef = useRef()

  const [previewImage, setPreviewImage] = useState("")
  const [previewIntro, setPreviewIntro] = useState("")

  // Use useRef instead of useState to avoid state updates during render
  const formikRef = useRef(null)

  // Fetch categories at the top level
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }
    fetchCategories()
  }, [])

  // Set field values at the top level when courseData or categories change
  useEffect(() => {
    if (!formikRef.current) return

    formikRef.current.setFieldValue("title", courseData?.title ?? "")
    formikRef.current.setFieldValue("subtitle", courseData?.subtitle ?? "")
    formikRef.current.setFieldValue("course_duration", courseData?.course_duration ?? "")
    formikRef.current.setFieldValue("level", courseData?.level?.toString() ?? "")
    formikRef.current.setFieldValue("category_id", courseData?.category_id?.toString() ?? "")
    formikRef.current.setFieldValue("sub_category_id", courseData?.sub_category_id?.toString() ?? "")

    const initialCategory = categories.find((category) => category.id === Number.parseInt(courseData?.category_id))
    setSelectedCategory(initialCategory)
  }, [courseData, categories])

  // Handle quill editor content at the top level
  useEffect(() => {
    if (quillRef.current && courseData?.description) {
      const editor = quillRef.current
      editor.clipboard.dangerouslyPasteHTML(courseData.description)
    }
  }, [courseData])

  const handleImageChange = (file) => {
    if (file) {
      const fileURL = URL.createObjectURL(file)
      setPreviewImage(fileURL)
    }
  }

  const handleIntroChange = (file) => {
    if (file) {
      const fileURL = URL.createObjectURL(file)
      setPreviewIntro(fileURL)
    }
  }

  return (
    <div className="upload-course-body">
      <div className="course-content">
        <div className="upload-content">
          <h5 className="upload-content-title">{trans("Course Content")}</h5>
          <div className="upload-content-block">
            <p className="upload-content-block-text">
              {trans(`Your course landing page plays a key role in attracting learners. A well-crafted page not only boosts visibility on platforms like Google but also draws potential students in. Focus on highlighting the value of your course and clearly explaining what learners will gain from enrolling. This section will help you build a compelling landing page that speaks directly to your target audience`)}.
            </p>

            <Formik initialValues={initialValues} validationSchema={contentValidationSchema} onSubmit={handleSubmit}>
              {(formik) => {

                formikRef.current = formik

                return (
                  <Form>
                    <div className="upload-content-form mt-4">
                      <div className="form-group">
                        <label htmlFor="course-title2" className="form--label">
                          {trans("Course title")}
                        </label>
                        <Input className="form--control" name="title" type="text" errorHandler={true} />

                      </div>

                      <div className="form-group">
                        <label htmlFor="course-subtitle" className="form--label">
                          {trans("Course subtitle")}
                        </label>
                        <Input
                          name="subtitle"
                          type="text"
                          className="form--control"
                          id="course-subtitle"
                          errorHandler={true}
                        />

                      </div>

                      <div className="form-group">
                        <label htmlFor="course-description" className="form--label">
                          {trans("Course description")}
                        </label>
                        <Editor
                          ref={quillRef}
                          defaultValue={courseData?.description ?? ""}
                          readOnly={false}
                          onTextChange={(content) => {
                            formik.setFieldValue("description", content)
                          }}
                        />

                      </div>

                      <div className="form-group">
                        <label className="form--label">{trans("Select Level")}</label>
                        <div className="upload-course-label-wrapper">
                          {["Beginner", "Intermediate", "Advanced"].map((level, index) => (
                            <label
                              key={index}
                              className="upload-course-label"
                              htmlFor={`course-level-${level.toLowerCase()}`}
                            >
                              <Field
                                type="radio"
                                name="level"
                                value={(index + 1).toString()}
                                id={`course-level-${level.toLowerCase()}`}
                                onChange={() => formik.setFieldValue("level", (index + 1).toString())}
                              />
                              <span className="icon">
                                <svg viewBox="0 0 64 64" height="16" width="16">
                                  <path
                                    d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                                    className="path"
                                  />
                                </svg>
                              </span>
                              <span className="title">{trans(level)}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label htmlFor="course-category" className="form--label">
                                {trans("Select Category")}
                              </label>
                              <Field
                                as="select"
                                name="category_id"
                                className="form--control"
                                onChange={(e) => {
                                  const selectedCategoryId = e.target.value
                                  const selectedCategory = categories.find(
                                    (category) => category.id === Number.parseInt(selectedCategoryId),
                                  )
                                  setSelectedCategory(selectedCategory)
                                  formik.setFieldValue("category_id", selectedCategoryId)
                                }}
                              >
                                <option value="">{trans("Select a category")}</option>
                                {categories.map((category) => (
                                  <option key={category.id} value={category?.id}>
                                    {category?.name}
                                  </option>
                                ))}
                              </Field>
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="form-group">
                              <label htmlFor="course-subcategory" className="form--label">
                                {trans("Select Subcategory")}
                              </label>
                              <Field
                                as="select"
                                name="sub_category_id"
                                className="form--control"
                                disabled={!selectedCategory}
                              >
                                <option value="">{trans("Select a subcategory")}</option>
                                {selectedCategory?.sub_categories?.map((subcategory) => (
                                  <option key={subcategory?.id} value={subcategory?.id}>
                                    {subcategory?.name}
                                  </option>
                                ))}
                              </Field>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="course-duration" className="form--label">
                          {trans("Course Duration")}
                        </label>
                        <FormField name="course_duration" type="text" id="course-duration" inputGroup="true" inputGroupTextPosition="right" inputGroupText="Hours" />


                      </div>

                      <div className="form-group">
                        <label htmlFor="course-image" className="form--label">
                          {trans("Course image")}
                        </label>
                        <div className="course-image-upload">
                          <div className="course-image-upload__thumb">
                            <Image
                              className="file-input-img fit-image"
                              src={previewImage || getCourseImage(courseData?.image_path, courseData?.image)}
                              alt="image"
                            />
                          </div>
                          <div className="course-image-upload__content">
                            <label className="course-image-upload__btn" htmlFor="course-image">
                              <span className="icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-image-up"
                                >
                                  <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
                                  <path d="m14 19.5 3-3 3 3" />
                                  <path d="M17 22v-5.5" />
                                  <circle cx="9" cy="9" r="2" />
                                </svg>
                              </span>
                              <span className="text">{trans("Upload Course Image")}</span>
                              <Field
                                accept="image/*"
                                value=""
                                name="image"
                                onChange={(e) => {
                                  handleImageChange(e.target.files[0])
                                  formik.setFieldValue("image", e.target.files[0])
                                }}
                                className="file-input"
                                type="file"
                                id="course-image"
                              />
                            </label>
                            <small className="form--note mt-3">
                              {trans(`Upload your course thumbnail image.For
                              best results, use a square image with a `)}<strong>1:1</strong> {trans(`aspect ratio`)}. {trans(`Supported
                              formats`)}: JPG, JPEG, PNG.
                            </small>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="course-video" className="form--label">
                          {trans("Course Intro Video")}
                        </label>
                        <div className="course-image-upload">
                          <div className="course-image-upload__thumb">
                            <video
                              className="course-video-preview fit-image"
                              src={previewIntro || courseData?.intro_path + '/' + courseData?.intro}
                              autoPlay
                              muted
                            ></video>
                          </div>
                          <div className="course-image-upload__content">
                            <label className="course-image-upload__btn" htmlFor="course-video">
                              <span className="icon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-file-video-2"
                                >
                                  <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
                                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                                  <rect width="8" height="6" x="2" y="12" rx="1" />
                                  <path d="m10 15.5 4 2.5v-6l-4 2.5" />
                                </svg>
                              </span>
                              <span className="text">{trans("Upload Intro Video")}</span>
                              <Field
                                accept="video/*"
                                name="intro"
                                value=""
                                onChange={(e) => {
                                  handleIntroChange(e.target.files[0])
                                  formik.setFieldValue("intro", e.target.files[0])
                                }}
                                className="course-video-input"
                                type="file"
                                id="course-video"
                              />
                            </label>
                            <small className="form--note mt-3">
                              {trans("Upload your course video.")}{" "}
                              {trans("Supported formats")}: mp4, mkv, vob, avi, mpeg.
                            </small>
                          </div>
                        </div>
                      </div>

                      <div className="form-group text-end">
                        <SubmitBtn type="submit" isSubmitting={loading} className="btn btn--base" title="Save" />
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

