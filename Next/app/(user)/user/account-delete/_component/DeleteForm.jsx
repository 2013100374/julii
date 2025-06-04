'use client'
import useUtility from '@/app/_hooks/useUtility'
import React from 'react'
import { Field, Form, Formik } from 'formik';
import SubmitBtn from '@/app/_partials/SubmitBtn';
import useAccountDelete from '../_hooks/useAccountDelete';

export default function DeleteForm() {
    const { trans } = useUtility();
    const { initialValues, handleSubmit, loading } = useAccountDelete();
    return (
        <div className="dashboard-main__wrapper">
            <h5 className="dashboard-main__title">{trans(`Delete account`)}</h5>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                <Form>
                    <div className="delete-account">
                        <p className="delete-account__desc mb-4">{trans(`If you delete your account, it will be lost.`)}</p>
                        <div className="form--check">
                            <Field className="form-check-input" type="checkbox" name="agree" id="agree" required={true} />
                            <label className="form-check-label" htmlFor="agree">{trans(`I understand that this will permanently delete my account`)}.</label>
                        </div>
                        <SubmitBtn isSubmitting={loading} type="submit" className="mt-4 btn btn--sm btn--danger" title='Delete Profile' />
                    </div> 
                </Form>
            </Formik>
        </div>
    )
}
