"use client";

import useUtility from "@/app/_hooks/useUtility";
import useWithdrawal from "../_hooks/useWithdrawal";
import { Form, Formik } from "formik";
import SubmitBtn from "@/app/_partials/SubmitBtn";
import WithdrawInput from "./WithdrawInput";
import WithdrawCalculation from "./WithdrawCalculation";


export default function WithdrawForm({
    withdrawLimit,
    processingCharge,
    processingChargeInfo,
    receivable,
    selectWithdrawMethod,
    afterConvert,
    putAmount,
    amount
}) {
    const { initialValues, handleSubmit, isSubmitting } = useWithdrawal();
    const { trans } = useUtility();
    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm }, amount, selectWithdrawMethod)}
            >
                {() => (
                    <Form>
                        <div className="payment-system-list">
                            <WithdrawInput putAmount={putAmount} amount={amount} />
                            <hr />
                            <WithdrawCalculation
                                limit={withdrawLimit}
                                processingCharge={processingCharge}
                                processingChargeInfo={processingChargeInfo}
                                receivable={receivable}
                                selectWithdrawMethod={selectWithdrawMethod}
                                afterConvert={afterConvert}
                            />
                            <SubmitBtn isSubmitting={isSubmitting} title={'Confirm Withdraw'} />
                            <div className="info-text pt-3">
                                <p className="text">{trans('Safely withdraw your funds using our highly secure process and various withdrawal method')}</p>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}
