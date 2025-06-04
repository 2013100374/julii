"use client";

import { Form, Formik } from "formik";
import Link from "next/link";
import Input from "@/app/_forms/Input";
import Captcha from "@/app/_partials/Captcha";
import useLoginHandler from "../_hooks/useLoginHandler";
import { FormField, FormGroup, FormLabel } from "@/app/_forms/FormsStore";
import useUtility from "@/app/_hooks/useUtility";
import SocialLogin from "@/app/_partials/SocialLogin";
import { Button } from "@/app/_partials/Button";
import React, { useState } from 'react'
import { useSection } from "@/app/_partials/_sections/_hooks/useSection";
import { frontendImage } from "@/lib/helpers";
import Image from "next/image";
export default function LoginForm() {

    const { initialValues, validationSchema, handleSubmit } = useLoginHandler();
    const { trans, gs } = useUtility();
    const social = gs('socialite_credentials');
    const [showPassword, setShowPassword] = useState(false);
    const toggleShow = () => setShowPassword(!showPassword);
    const { content } = useSection('contact_us');

    return (
        <>
            <section className="account py-50">
                <div className="container">
                    <div className="account-form">
                        <div className="account-form__shape">
                            <Image width={100} height={100} className="fit-image" src={frontendImage(content?.data_values?.shape_two, 'contact_us')} alt="shape" />
                        </div>
                        <div className="account-form__content">
                            <h4 className="account-form__title">{trans(`Log in as student`)}</h4>
                        </div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => {
                                return (
                                    <Form>
                                        <div className="row">
                                            <FormGroup className="col-sm-12 ">
                                                <FormField
                                                    name={'username'}
                                                    label={trans('Username or Email')}
                                                    required={true}
                                                    className="form--control"
                                                />

                                            </FormGroup>
                                            <FormGroup className="col-sm-12 mb-3">
                                                <div className="flex-between align-items-start">
                                                    <FormLabel
                                                        name="password"
                                                        label={trans('Password')}
                                                        required={true}
                                                    />


                                                    <Link href={'password-reset-request'} className="forgot-password">{trans(`Forgot Your Password`)}?</Link>
                                                </div>
                                                <div className="position-relative">
                                                    <Input
                                                        name="password"
                                                        type={`${showPassword ? 'text' : 'password'}`}
                                                        required={true}
                                                        className="form-control form--control" errorHandler={true}

                                                    />

                                                    <span onClick={toggleShow} className={`password-show-hide toggle-password  ${showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}`}
                                                        id="#your-password"></span>
                                                </div>
                                            </FormGroup>
                                            <Captcha />
                                            <FormGroup className="col-sm-12 mb-3">
                                                <div className="flex-between">
                                                    <Button loading={isSubmitting} className="btn btn--warning btn--shadow" label='Sign In' />
                                                    <div className="form--check">
                                                        <input className="form-check-input" type="checkbox" id="remember" />
                                                        <label className="form-check-label" htmlFor="remember">{trans(`Remember me`)} </label>
                                                    </div>
                                                </div>
                                            </FormGroup>
                                            <FormGroup className="col-sm-12 mb-3">
                                                <SocialLogin socialCredentials={social} />
                                            </FormGroup>
                                            <div className="col-sm-12">
                                                <div className="have-account">
                                                    <p className="have-account__text">{trans(`Not a member yet`)}? <Link href={'register'}
                                                        className="have-account__link">{trans(`Sign Up for free`)}</Link></p>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </section>
        </>
    )
}
