"use client"
import { useRef } from 'react';
import { Formik, Field, Form } from 'formik';
import useUtility from '@/app/_hooks/useUtility';
import Editor from './Editor';
import useCourseHandler from '../../_hooks/useCourseHandler';
import { Button } from '@/app/_partials/Button';
import SubmitBtn from '@/app/_partials/SubmitBtn';

export default function ArticleSubmitForm({ lecture, onCancel, slug }) {
  const { trans } = useUtility();

  const {
    initialArticleValues,
    lectureArticleValidationSchema,
    handleArticleSubmit,
    loading
  } = useCourseHandler(slug);

  const quillRef = useRef();

  return (
    <Formik
      initialValues={initialArticleValues}
      validationSchema={lectureArticleValidationSchema}
      onSubmit={handleArticleSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <div className="course-lecture-file-article">
            <label className="form--label">{trans('Article')}</label>
            <Editor
              ref={quillRef}
              readOnly={false}
              defaultValue={lecture?.article || ''}  
              onTextChange={(content) => {
                setFieldValue('article', content);  
              }}
            />
            <Field type="hidden" name="section_id" />
            <Field type="hidden" name="lecture_id" />

            <div className="flex-end mt-3 gap-3">
              <button type="button" onClick={onCancel} className="new--btn">{trans('Cancel')}</button>

               <SubmitBtn type="submit" isSubmitting={loading}  onClick={() => {
                  setFieldValue('section_id', lecture?.course_section_id);
                  setFieldValue('lecture_id', lecture?.id);
                }}
                 className="save--btn" title="Save" />

             
            
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
