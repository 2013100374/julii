'use client';

import { Form, Formik } from "formik";
import { useState } from 'react';
import SubmitBtn from "@/app/_partials/SubmitBtn";
import useUtility from "@/app/_hooks/useUtility";
import useChangePassword from '../_hooks/useChangePassword';
import { FormField, PasswordField } from "@/app/_forms/FormsStore";

export default function ChangePasswordForm() {
    const [passwordVal, setPasswordVal] = useState(null);
    const { initialValues, validationSchema, handleSubmit } = useChangePassword();
    const { trans } = useUtility();
    return (
        <>
            <div className="dashboard-main__wrapper">
                <h5 className="dashboard-main__title">{trans(`Change Password`)}</h5>
                <div className="edit-account">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm }, setPasswordVal)}
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
        </>
    )
}
