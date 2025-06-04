'use client';
import Input from '@/app/_forms/Input';
import { Form, Formik } from 'formik';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import useContentHandler from '../_hooks/useContentHandler';
import SubmitBtn from '@/app/_partials/SubmitBtn';
import useUtility from '@/app/_hooks/useUtility';

export default function IntendedLearners({ slug }) {
  const { data: courseData } = useSelector((state) => state?.course);

  const {
    initialIntendedValues,
    intendedValidationSchema,
    handleIntendedSubmit,
    loading
  } = useContentHandler(slug);

  const { trans } = useUtility();

  const [objectives, setObjectives] = useState([{ object: '' }]);
  const [requirements, setRequirements] = useState([{ requirement: '' }]);
  const [contents, setContents] = useState([{ content: '' }]);

  const addObject = () => setObjectives([...objectives, { object: '' }]);
  const addRequirement = () => setRequirements([...requirements, { requirement: '' }]);
  const addContent = () => setContents([...contents, { content: '' }]);

  

  const removeObject = (index, setFieldValue) => {
    const updatedObjectives = objectives.filter((_, i) => i !== index);

    setObjectives(updatedObjectives);
    updatedObjectives.forEach((object, idx) => {
      setFieldValue(`object[${idx}]`, object.object);
    });
    setFieldValue(`object[${index}]`, ''); 
  };

  const removeRequirement = (index, setFieldValue) => {
    const updatedRequirements = requirements.filter((_, i) => i !== index);
    setRequirements(updatedRequirements);
    updatedRequirements.forEach((requirement, idx) => {
      setFieldValue(`requirement[${idx}]`, requirement.requirement);
    });
    setFieldValue(`requirement[${index}]`, '');
  };

  const removeContent = (index, setFieldValue) => {
    const updatedContents = contents.filter((_, i) => i !== index);
    setContents(updatedContents);
    updatedContents.forEach((content, idx) => {
      setFieldValue(`content[${idx}]`, content.content);
    });
    setFieldValue(`content[${index}]`, ''); 
  };

  useEffect(() => {
    setObjectives(courseData?.objects ?? [{ object: '' }]);
    setRequirements(courseData?.requirements ?? [{ requirement: '' }]);
    setContents(courseData?.contents ?? [{ content: '' }]);
  }, [courseData]);

  const handleObjectivesChange = (e, index, setFieldValue) => {
    const updatedObjectives = objectives.map((object, idx) => {
      if (idx === index) {
        return { ...object, object: e.target.value };
      }
      return object;
    });
    setObjectives(updatedObjectives);
    setFieldValue(`object[${index}]`, updatedObjectives[index].object);
  };

  const handleRequirementChange = (e, index, setFieldValue) => {
    const updatedRequirements = requirements.map((requirement, idx) => {
      if (idx === index) {
        return { ...requirement, requirement: e.target.value };
      }
      return requirement;
    });
    setRequirements(updatedRequirements);
    setFieldValue(`requirement[${index}]`, updatedRequirements[index].requirement);
  };

  const handleContentsChange = (e, index, setFieldValue) => {
    const updatedContents = contents.map((content, idx) => {
      if (idx === index) {
        return { ...content, content: e.target.value };
      }
      return content;
    });
    setContents(updatedContents);
    setFieldValue(`content[${index}]`, updatedContents[index].content);
  };

  const formikRef = useRef(null);
  useEffect(() => {
    if (formikRef.current) {
      objectives.forEach((object, index) => {
        formikRef.current.setFieldValue(`object[${index}]`, object.object);
      });
      requirements.forEach((requirement, index) => {
        formikRef.current.setFieldValue(`requirement[${index}]`, requirement.requirement);
      });
      contents.forEach((content, index) => {
        formikRef.current.setFieldValue(`content[${index}]`, content.content);
      });
    }
  }, [objectives, requirements, contents]);



  return (

    <div className="upload-course-body">
      <Formik
        innerRef={formikRef}
        initialValues={initialIntendedValues}
        validationSchema={intendedValidationSchema}
        onSubmit={handleIntendedSubmit}
      >
        {({ setFieldValue }) => {
          return (
            <Form>
              <div className="intended-learners">
                <div className="upload-content">
                  <h5 className="upload-content-title">{trans(`Intended Learners`)}</h5>
                  <div className="upload-content-block">
                    <h6 className="upload-content-block-title">{trans(`Learning Objectives`)}</h6>
                    <p className="upload-content-block-text">
                      {trans(
                        `By the end of this course, learners will be able to effectively manage a project, develop a solution, and communicate effectively with their team members.`
                      )}
                    </p>
                  </div>


                  {

                    !courseData ? (
                      <div className="d-flex justify-content-center">
                        <h3>
                          <i className="las la-circle-notch la-spin "></i>
                        </h3>
                      </div>

                    ) :
                      <>
                        <div className="upload-content-block">
                          {objectives.map((object, index) => (
                            <div className="form-group" key={index}>
                              <div className="input-group">
                                <Input
                                  type="text"
                                  name={`object[${index}]`}
                                  className="form--control form-control"
                                  placeholder="Example: Define the roles and responsibilities of a project manager"
                                  value={object.object}
                                  onChange={(e) => handleObjectivesChange(e, index, setFieldValue)}
                                />
                                <div className="input-group-text">
                                  <button type="button" className="input-group-text" onClick={() => removeObject(index, setFieldValue)}>
                                    <i className="las la-trash text--danger"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}

                          <button type="button" onClick={addObject} className="add--btn">
                            <span className="icon">
                              <i className="las la-plus"></i>
                            </span>
                            {trans(`Add More`)}
                          </button>
                        </div>


                        <div className="upload-content-block">
                          <h6 className="upload-content-block-title">{trans(`Course Requirements`)}</h6>
                          <p className="upload-content-block-text">
                            {trans(`You don’t need any special skills or experience to take this course—just a desire to learn! Whether you’re completely new or have some background knowledge, we’ll support you throughout. Everything you need will be provided, so beginners are welcome and encouraged to join!`)}
                          </p>

                          <div className="upload-content-form mt-4">
                            {requirements.map((requirement, index) => (
                              <div className="form-group" key={index}>
                                <div className="input-group">
                                  <Input
                                    type="text"
                                    name={`requirement[${index}]`}
                                    value={requirement.requirement}
                                    onChange={(e) => handleRequirementChange(e, index, setFieldValue)}
                                    className="form--control form-control"
                                    placeholder="Example: No programming experience needed. You will learn everything."
                                  />
                                  <div className="input-group-text">
                                    <button type="button" className="input-group-text" onClick={() => removeRequirement(index, setFieldValue)}>
                                      <i className="las la-trash text--danger"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}

                            <button type="button" onClick={addRequirement} className="add--btn">
                              <span className="icon">
                                <i className="las la-plus"></i>
                              </span>
                              {trans(`Add More`)}
                            </button>
                          </div>
                        </div>


                        <div className="upload-content-block">
                          <h6 className="upload-content-block-title">{trans(`Who is this course for`)}?</h6>
                          <p className="upload-content-block-text">
                            {trans(`This course is perfect for beginners eager to learn, as well as those looking to expand their skills. If you're curious, motivated, and ready to dive in, this content will provide the knowledge and tools you need to grow!`)}
                          </p>

                          <div className="upload-content-form mt-4">
                            {contents.map((content, index) => (
                              <div className="form-group" key={index}>
                                <div className="input-group">
                                  <Input
                                    type="text"
                                    name={`content[${index}]`}
                                    value={content.content}
                                    onChange={(e) => handleContentsChange(e, index, setFieldValue)}
                                    className="form--control form-control"
                                    placeholder="Example: Beginner Python developers curious about data science"
                                  />
                                  <div className="input-group-text">
                                    <button type="button" className="input-group-text" onClick={() => removeContent(index, setFieldValue)}>
                                      <i className="las la-trash text--danger"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}

                            <button type="button" onClick={addContent} className="add--btn">
                              <span className="icon">
                                <i className="las la-plus"></i>
                              </span>
                              {trans(`Add More`)}
                            </button>

                            <div className="form-group mt-3 text-end">
                              <SubmitBtn type="submit" isSubmitting={loading} className="btn btn--base" title="Save" />
                            </div>
                          </div>
                        </div>
                      </>
                  }
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
