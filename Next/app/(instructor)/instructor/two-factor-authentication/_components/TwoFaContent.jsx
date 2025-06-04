"use client";

import { getUser } from "@/lib/helpers";
import TwoFaQR from './TwoFaQR';
import TwoFaControl from './TwoFaControl';
import useTwoFaHandler from "../_hooks/useTwoFaHandler";
import useTwoFaControl from "../_hooks/useTwoFaControl";

export default function TwoFaContent() { 
    const { copyToClipboard, twoFaData } = useTwoFaHandler();
    const { initialValues, validationSchema, handleSubmit, twoFaEnabled } = useTwoFaControl(twoFaData);

    return (
        <>
            { !twoFaEnabled ? <TwoFaQR twoFaData={twoFaData} copyToClipboard={copyToClipboard} /> : '' }
            <TwoFaControl initialValues={initialValues} validationSchema={validationSchema} handleSubmit={handleSubmit} twoFaEnabled={twoFaEnabled} twoFaData={twoFaData} />
        </>
    )
}
