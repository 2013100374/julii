'use client'
import FormLabel from '@/app/_forms/FormLabel'
import Input from '@/app/_forms/Input'
import SubmitBtn from '@/app/_partials/SubmitBtn'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import useInstructorProfile from '../_hooks/useInstructorProfile'
import useUtility from '@/app/_hooks/useUtility'


export default function SocialForm() {


    const { user, handleAccountSubmit, validationAccountSchema, loading } = useInstructorProfile();
    const { trans } = useUtility();

    const formInitialValues = {
        website_url: user?.account?.website_url || '',
        facebook_url: user?.account?.facebook_url || '',
        instagram_url: user?.account?.instagram_url || '',
        linkedin_url: user?.account?.linkedin_url || ''
    };


    return (
        <div className="col-xl-6">
            <div className="card custom--card border-0 h-100">
                <div className="card-header">
                    <h4 className="card-header__title">{trans(`Social profile`)}</h4>
                </div>
                <Formik
                    initialValues={formInitialValues}
                    validationSchema={validationAccountSchema}
                    onSubmit={handleAccountSubmit}
                >
                    <Form >
                        <div className="card-body">
                            <div className="row">
                                <div className="form-group">
                                    <FormLabel name="website" label="Website"></FormLabel>
                                    <div className="input--group">
                                        <span className="input--group-text"><i className="fas fa-globe"></i></span>
                                        <Field className="form--control" name="website_url" id="website" type="text" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <FormLabel name="fb" label="Facebook"></FormLabel>
                                    <div className="input--group">
                                        <span className="input--group-text"><i className="fab fa-facebook-f"></i></span>
                                        <Input className="form--control" name="facebook_url" id="fb" type="text" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <FormLabel name="instagram" label="Instagram"></FormLabel>
                                    <div className="input--group">
                                        <span className="input--group-text"><i className="fab fa-instagram"></i></span>
                                        <Field className="form--control" name="instagram_url" id="instagram" type="text" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <FormLabel name="linkedin" label="Linkedin"></FormLabel>
                                    <div className="input--group">
                                        <span className="input--group-text"><i className="fab fa-linkedin-in"></i></span>
                                        <Field className="form--control" name="linkedin_url" id="linkedin" type="text" />
                                    </div>
                                </div>
                                <div className="edit-account__button">
                                    <SubmitBtn isSubmitting={loading} className="btn btn--base btn--shadow" title={trans('Submit')} />
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>

    )
}
