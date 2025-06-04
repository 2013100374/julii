"use client";
import useUtility from "@/app/_hooks/useUtility";
import { Formik, Form } from 'formik';
import SubmitBtn from "@/app/_partials/SubmitBtn";
import FormField from "@/app/_forms/FormField";


export default function TwoFaControl({ initialValues, validationSchema, handleSubmit, twoFaEnabled }) {
    const {trans} = useUtility();
    return (
        <>
            <div className={twoFaEnabled ? `col-md-12` : 'col-md-6'}>
                <div className="card custom--card">
                    <div className="card-header">
                        <h5 className="card-title">{trans(twoFaEnabled ? 'Disable 2FA Security' : 'Enable 2FA Security')}</h5>
                    </div>
                    <div className="card-body">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <FormField
                                        type="text"
                                        name="code"
                                        label={trans('Google Authenticator OTP')}
                                        required={true}
                                    />
                                    <SubmitBtn title='Submit' isSubmitting={isSubmitting} />
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}
