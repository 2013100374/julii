'use client'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import useInstructorProfile from '../_hooks/useInstructorProfile';
import useUtility from '@/app/_hooks/useUtility';
import FormField from '@/app/_forms/FormField';
import { PasswordField } from '@/app/_forms/FormsStore';
import SubmitBtn from '@/app/_partials/SubmitBtn';

export default function PasswordForm() {
    const { initialPasswordValues, validationPasswordSchema, handlePasswordSubmit } = useInstructorProfile();
    const { trans } = useUtility();
    const [passwordVal, setPasswordVal] = useState(null);
    return (
        <div className="col-xl-6">
            <div className="card custom--card border-0 h-100">
                <div className="card-header">
                    <h4 className="card-header__title">{trans(`Password`)}</h4>
                </div>
                <div className="card-body">
                    <Formik
                        initialValues={initialPasswordValues}
                        validationSchema={validationPasswordSchema}
                        onSubmit={(values, { resetForm }) => handlePasswordSubmit(values, { resetForm }, setPasswordVal)}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <FormField name="current_password" type="password" label={trans('Current Password')} required />
                                <PasswordField passwordVal={passwordVal} setPasswordVal={setPasswordVal} />
                                <FormField name="password_confirmation" type="password" label={trans('Confirm Password')} required />
                                <div className="edit-account__button">
                                    <SubmitBtn isSubmitting={isSubmitting} className="btn btn--base btn--shadow" title={trans('Submit')} />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}
