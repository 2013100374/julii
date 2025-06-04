"use client";

import { Formik } from "formik";
import Link from "next/link";
import Captcha from "@/app/_partials/Captcha";
import SubmitBtn from "@/app/_partials/SubmitBtn";
import AgreePolicy from "./AgreePolicy";
import useRegister from '../_hooks/useRegister';
import SocialLogin from '@/app/_partials/SocialLogin';
import { useState } from "react";

import { FormField, FormGroup, PasswordField } from "@/app/_forms/FormsStore";
import useUtility from "@/app/_hooks/useUtility";
import { frontendImage } from "@/lib/helpers";
import { useSection } from "@/app/_partials/_sections/_hooks/useSection";
import Image from "next/image";
export default function RegistrationForm({ isRegisterEnabled }) {


    const { trans, gs } = useUtility();

    const { initialValues, validationSchema, handleSubmit } = useRegister();
    const agreeEnabled = gs('agree');
    const [passwordVal, setPasswordVal] = useState(null);
    const socialCredentials = gs('socialite_credentials');

    const { content } = useSection('contact_us');

    return (
        <>
            <section className="account py-50">
                <div className="container">
                    <div className={`account-form  ${!isRegisterEnabled ? 'form-disabled' : null}`}>
                        <div className="account-form__shape">
                            <Image width={100} height={100} className="fit-image" src={frontendImage(content?.data_values?.shape_two, 'contact_us')} alt="shape" />
                        </div>
                        {!isRegisterEnabled && (
                            <div className="form-disabled-text">
                                <i className="las la-lock"></i>
                                <div className="mt-3">
                                    <p className="title fw-bold">{trans('Registration is currently disabled.')}</p>
                                </div>
                            </div>
                        )}


                        <div className="account-form__content">
                            <h4 className="account-form__title">{trans(`Get Started For Free`)}</h4>
                        </div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm }, setPasswordVal)}
                        >
                            {({ isSubmitting, handleSubmit }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <FormField
                                                name="firstname"
                                                label={trans('First Name')}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <FormField
                                                name="lastname"
                                                label={trans('Last Name')}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <FormField
                                                type="email"
                                                name="email"
                                                label={trans('Email')}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-sm-6">

                                            <PasswordField passwordVal={passwordVal} setPasswordVal={setPasswordVal} />
                                        </div>
                                        <div className="col-sm-6">
                                            <FormField
                                                type="password"
                                                name="password_confirmation"
                                                label={trans('Confirm Password')}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <Captcha />
                                        </div>
                                    </div>
                                    {agreeEnabled == 1 ? <AgreePolicy /> : ''}
                                    <FormGroup>
                                        <SubmitBtn className="btn btn--warning btn--shadow" isSubmitting={isSubmitting} title={'Register'} />
                                    </FormGroup>
                                </form>
                            )}
                        </Formik>
                        <FormGroup className="col-sm-12 mb-3">
                            <SocialLogin socialCredentials={socialCredentials} />
                        </FormGroup>

                        <div className="col-sm-12">
                            <div className="have-account">
                                <p className="have-account__text">{trans(`You have already account`)}? <Link href={'/login'}
                                    className="have-account__link">{trans(`Sign in`)}</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

        </>
    )
}
