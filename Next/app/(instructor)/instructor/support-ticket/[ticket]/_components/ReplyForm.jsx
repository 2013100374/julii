'use client';
import FormField from "@/app/_forms/FormField";
import useUtility from "@/app/_hooks/useUtility";
import SubmitBtn from "@/app/_partials/SubmitBtn";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { HandleAttachments } from "../../create/_components/HandleAttachments";
import { formatFileSize } from "@/lib/helpers";

export const ReplyForm = ({ attachments, setAttachments, handleReplySubmit, submitting }) => {
    const { trans } = useUtility();
    const maxFileSize = 200 * 1024 * 1024;
    const allowedFileTypes = ['.jpg', '.jpeg', '.png', '.pdf', '.doc', '.docx'];


    const addAttachment = () => {
        if (attachments.length < 5) {
            setAttachments([...attachments, null]);
        }
    };

    const initialValues = {
        message: '',
        attachments: [],
    };

    useEffect(() => {
        if (attachments.length > 0) {
            initialValues.attachments = attachments;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [attachments]);


    return (
        <Formik initialValues={initialValues} onSubmit={handleReplySubmit}>
            {
                ({ setFieldValue }) => {
                    return (<Form>
                        <div className="row justify-content-between">
                            <div className="col-md-12">
                                <FormField label={trans('Reply')} type="textarea" name="message" rows="10" required={true} />

                            </div>

                            <div className="col-md-9">
                                <button type="button" className="btn btn-dark btn-sm my-2" onClick={addAttachment}>
                                    <i className="fas fa-plus"></i> {trans('Add Attachment')}
                                </button>
                                <p className="mb-2">
                                    <span className="text-muted">
                                        {trans(`Max 5 files can be uploaded | Maximum upload size is ${formatFileSize(maxFileSize)} | Allowed File Extensions: ${allowedFileTypes.join(', ')}`)}
                                    </span>
                                </p>
                                <div className="fileUploadsContainer">
                                    <HandleAttachments
                                        setFieldValue={setFieldValue}
                                        attachments={attachments}
                                        setAttachments={setAttachments}
                                        maxFileSize={maxFileSize}
                                        allowedExtensions={allowedFileTypes}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <SubmitBtn isSubmitting={submitting} title="Reply" />
                            </div>
                        </div>
                    </Form>);
                }
            }
        </Formik>
    );
}
