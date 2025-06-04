"use client";
import { Form, Formik } from "formik";
import Captcha from "../../../_partials/Captcha";
import SubmitBtn from "../../../_partials/SubmitBtn";
import useUtility from "@/app/_hooks/useUtility";
import { FormField, FormGroup } from "@/app/_forms/FormsStore";
import useContact from "../_hooks/useContact";
import { frontendImage } from "@/lib/helpers";
import { useSection } from "@/app/_partials/_sections/_hooks/useSection";
import { Image } from "react-bootstrap";

export default function ContactForm() {
    const { initialValues, validationSchema, handleSubmit, user,instructor, loading } = useContact();
    const { trans } = useUtility();
    const { content } = useSection('contact_us');

    
        
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (    
                <Form className="contact-form">
                    <div className="contact-form__shape">
                        <Image className="fit-image" src={frontendImage(content?.data_values?.shape_two,'contact_us')} alt="shape" />
                    </div>
                    <div className="contact-form__shapetwo">
                    <Image className="fit-image" src={frontendImage(content?.data_values?.shape_one,'contact_us')} alt="shape" />
                    </div>
                    <h3 className="contact-form__title">{trans(`Send us message`)}</h3>
                    <FormField className="form--control" name="name" label={trans('Name')} required={true} readOnly={(user ||instructor) ? true : false} />
                    <FormField className="form--control" name="email" label={trans('Email')} required={true} type="email" readOnly={(user || instructor) ? true : false} />
                    <FormField className="form--control"  name="subject" label={trans('Subject')} required={true} />
                    <FormField className="form--control" name="message" type="textarea" label={trans('Message')} required={true} />
                    <FormGroup>
                        <Captcha />
                    </FormGroup>
                 
                    <FormGroup  className="mb-0" >
                        <SubmitBtn isSubmitting={loading} title={trans('Submit')}  className="btn btn--base btn--shadow w-100"/>
                    </FormGroup>
                </Form>
            )}
        </Formik>
    )
}
