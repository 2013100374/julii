"use client";

import { useState } from 'react';
import CodeVerification from '@/app/_partials/CodeVerification';
import { showMobileNumber } from '@/lib/helpers';
import { Form, Formik } from 'formik';
import SubmitBtn from '@/app/_partials/SubmitBtn';

import useVerificationCode from '../_hooks/useVerificationCode';
import { getUser } from '@/lib/helpers';
import useUtility from '@/app/_hooks/useUtility';
import useLoginHandler from '@/app/(frontend)/(auth)/login/_hooks/useLoginHandler';

export default function MobileVerification() {
    const [verCode, setVerCode] = useState('');
    const { logout } = useLoginHandler();
    const { tryAgain, isResending, handleSubmit, initialValues } = useVerificationCode(verCode, setVerCode, 'mobile');
    const user = getUser();
    const { trans } = useUtility();
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-7 col-xl-5">
                        <div className="d-flex justify-content-center">
                            <div className="verification-code-wrapper">
                                <div className="verification-area">
                                    <h5 className="pb-3 text-center border-bottom">{trans('Verify Mobile Number')}</h5>
                                    <p className="verification-text mb-3">{trans('A 6 digit verification code sent to your mobile number:')} +{showMobileNumber(user?.dial_code + user?.mobile)}</p>
                                    <Formik
                                        initialValues={initialValues}
                                        onSubmit={handleSubmit}
                                    >
                                        {({ isSubmitting, setFieldValue }) => {

                                            return (
                                                <Form className="submit-form">

                                                    <CodeVerification verCode={verCode} setVerCode={setVerCode} />

                                                    <div className="mb-3">
                                                        <SubmitBtn isSubmitting={isSubmitting} title="Submit" />
                                                    </div>

                                                    <div className="mb-3">
                                                        <p>
                                                            {trans('If you don\'t get any code,')}, {isResending ? <i className="la la-circle-notch la-spin text-primary"></i> : <a href="#" onClick={() => tryAgain('sms')}> {trans('Try again')}</a>}
                                                        </p>
                                                        <a href="#" onClick={logout}>{trans('Logout')}</a>
                                                    </div>
                                                </Form>
                                            );
                                        }}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
