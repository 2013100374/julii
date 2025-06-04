"use client";

import { ErrorMessage, useFormikContext } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector } from "react-redux";
import { FormGroup } from "@/app/_forms/FormsStore";
import { useEffect, useRef } from "react";
export default function GoogleCaptcha() {
    const recaptchaRef = useRef(null);

    const googleCaptcha = useSelector((state) => state.captcha.googleCaptcha.data);
    
    useEffect(() => {
        recaptchaRef.current?.reset();
    }, [googleCaptcha]);

    const { setFieldValue } = useFormikContext();

    return (
        <>
            {googleCaptcha?.data?.extension && (
                <FormGroup>
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={googleCaptcha?.data?.extension?.shortcode?.site_key?.value}
                        onChange={(value) => {
                            setFieldValue("g-recaptcha-response", value);
                        }}
                    />
                    <ErrorMessage name="g-recaptcha-response" component="p" className="text-danger" />
                </FormGroup>
            )}
        </>
    )
}
