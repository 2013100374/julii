"use client";

import { useState } from 'react';
import CodeVerification from '@/app/_partials/CodeVerification';
import { Form, Formik } from 'formik';
import SubmitBtn from '@/app/_partials/SubmitBtn';

import useVerificationCode from '../_hooks/useVerificationCode';
import useUtility from '@/app/_hooks/useUtility';
import useLoginHandler from '@/app/(frontend)/(auth)/login/_hooks/useLoginHandler';

export default function TwoFaVerification() {
    const [verCode, setVerCode] = useState('');
    const { logout } = useLoginHandler();
    const { handleSubmit, initialValues } = useVerificationCode(verCode, setVerCode, 'g2fa');
    const { trans } = useUtility();

    return (
        <>
            <div className="verification-code-wrapper">
                <div className="verification-area">
                    <h5 className="pb-3 text-center border-bottom">{trans('Two-Factor Authentication')}</h5>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, setFieldValue }) => {

                            return (
                                <Form className="submit-form">
                                    <p className="verification-text mb-3">{trans('Please enter the 6-digit verification code from your authenticator app')}</p>

                                    <CodeVerification verCode={verCode} setVerCode={setVerCode} />

                                    <div className="mb-3">
                                        <SubmitBtn isSubmitting={isSubmitting} title="Submit" />
                                    </div>

                                    <div className="mb-3">
                                        <a href="#" onClick={logout}>{trans('Logout')}</a>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </>
    )
}
