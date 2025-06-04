'use client';
import useUtility from "@/app/_hooks/useUtility";
import useTickets from "../../_hooks/useTickets";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Form, Formik } from "formik";
import FormField from "@/app/_forms/FormField";
import FormGroup from "@/app/_forms/FormGroup";
import Input from "@/app/_forms/Input";
import SubmitBtn from "@/app/_partials/SubmitBtn";
import { HandleAttachments } from "./HandleAttachments";
import { formatFileSize } from "@/lib/helpers";

export const NewTicketForm = () => {
    const { trans }                     = useUtility();
    const { handleSubmit, submitting }  = useTickets();
    const [attachments, setAttachments] = useState([]);
    const maxFileSize                   = 200 * 1024 * 1024;
    const allowedFileTypes              = ['.jpg', '.jpeg', '.png', '.pdf', '.doc', '.docx'];

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const initialValues = {
        subject: '',
        priority: '',
        message: '',
        attachments: []
    };

    const addAttachment = () => {
        if (attachments.length < 5) setAttachments([...attachments, null]);
    };

    useEffect(() => {
        initialValues.attachments = attachments;
    }, [attachments, initialValues]);

    return (
        <>
            <div className="flex-between mb-3">
                <h5 className="card-title mb-0">{trans('Open Ticket')}</h5>
                <Link className="btn btn--base" href="/user/support-ticket">{trans('Tickets')}</Link>
            </div>
            <div className="card custom--card">
                <div className="card-body">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values, { resetForm }) => {
                            handleSubmit(values, resetForm);
                        }}
                    >
                        {({ setFieldValue }) => (
                            <Form>
                                <FormField name="subject" label={trans('Subject')} required={true} />

                                <FormGroup>
                                    <label htmlFor="priority" className="form-label">{trans('Priority')} <span className="text--danger">*</span></label>
                                    <Input as="select" name="priority" required={true}>
                                        <option value="">{trans('Select Priority')}</option>
                                        <option value="3">{trans('High')}</option>
                                        <option value="2">{trans('Medium')}</option>
                                        <option value="1">{trans('Low')}</option>
                                    </Input>
                                </FormGroup>

                                <FormField name="message" label={trans('Message')} type="textarea" required={true} />

                                <FormGroup>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={addAttachment}
                                        disabled={attachments.length >= 5}
                                    >
                                        {trans('+ Add Attachment')}
                                    </button>
                                    <small className="form-text text-muted d-block mt-2">
                                        {trans(`Max 5 files can be uploaded | Maximum upload size is ${formatFileSize(maxFileSize)} | Allowed File Extensions: ${allowedFileTypes.join(' ')}`)}
                                    </small>
                                </FormGroup>

                                <HandleAttachments
                                    setFieldValue={setFieldValue}
                                    attachments={attachments}
                                    setAttachments={setAttachments}
                                    maxFileSize={maxFileSize} 
                                    allowedExtensions={allowedFileTypes}
                                />

                                <FormGroup className="mb-0">
                                    <SubmitBtn isSubmitting={submitting} title="Submit" />
                                </FormGroup>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
}
