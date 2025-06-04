"use client";

import { useDispatch } from "react-redux";
import CustomCaptcha from "./_captcha/CustomCaptcha";
import GoogleCaptcha from "./_captcha/GoogleCaptcha";
import { fetchCustomCaptcha, fetchGoogleCaptcha } from "@/store/captchaSlice";
import { useEffect } from "react";

export default function Captcha() {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchGoogleCaptcha());
        dispatch(fetchCustomCaptcha());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <GoogleCaptcha />
            <CustomCaptcha />
        </>
    );
}
