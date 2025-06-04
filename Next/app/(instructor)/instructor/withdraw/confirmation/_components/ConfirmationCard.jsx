"use client";
import FormBuilder from "@/app/_partials/FormBuilder";
import useUtility from "@/app/_hooks/useUtility";
import SubmitBtn from "@/app/_partials/SubmitBtn";
import { Form, Formik } from "formik";
import { getInstructor } from "@/lib/helpers";
import FormField from "@/app/_forms/FormField";
import useWithdrawalConfirmation from "../_hooks/useWithdrawalConfirmation";

export default function ConfirmationCard() {
    const { initialValues, handleSubmit, withdrawInfo } = useWithdrawalConfirmation();
    const { withdraw_data, form, method } = withdrawInfo;
    const { showAmount, trans } = useUtility();
    const user = getInstructor();
    
    return (
        <>
            <div className="col-lg-12">
                <div className="card custom--card">

                    <div className="card-body">
                        <div className="alert alert--primary">
                            <span className="alert__icon">
                                <i className="las la-info-circle"></i>
                            </span>
                            <div className="alert__content">
                                <p className="alert__desc"> You are requesting <span className="text--base">{showAmount(withdraw_data?.amount)}</span> for withdrawal. The admin will send you <span className="text--success">{showAmount(withdraw_data?.final_amount, false)} {withdraw_data?.currency} </span> to your account.</p>
                            </div>
                        </div>

                        <div className="mb-2">
                            <div dangerouslySetInnerHTML={{ __html: method?.description }} />
                        </div>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    {form && <FormBuilder form={form} />}

                                    {user?.ts == 1 && (<FormField name="authenticator_code" label={trans('Google Authenticator Code')} required={true} />)}

                                    <div className="form-group">
                                        <SubmitBtn isSubmitting={isSubmitting} title={'Submit'} />
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}
