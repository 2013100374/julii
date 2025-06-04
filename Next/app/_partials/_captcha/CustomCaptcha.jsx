"use client";

import { useFormikContext } from "formik";
import Input from "@/app/_forms/Input";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { FormGroup,FormLabel } from "@/app/_forms/FormsStore";

export default function CustomCaptcha() {
    const customCaptcha = useSelector((state) => state.captcha.customCaptcha.data);

    const { setFieldValue } = useFormikContext();

    useEffect(() => {

        var regex = /<input type="hidden" name="captcha_secret" value="([^"]+)">/;
        var match = customCaptcha?.data?.custom_captcha ? customCaptcha?.data?.custom_captcha.match(regex) : null;
        if (match && match.length > 1) {
            setFieldValue('captcha_secret',match[1]);
        }

    }, [setFieldValue,customCaptcha]); 

    return (
        <>
            {customCaptcha?.data?.extension &&(
                <FormGroup>
                    <div className="mb-2" dangerouslySetInnerHTML={{__html:customCaptcha?.data?.custom_captcha}} />
                    <FormLabel name={'captcha'} label='Captcha' required={true} />
                    <Input name={'captcha'} />
                </FormGroup>
            )}
        </>
    )
}
