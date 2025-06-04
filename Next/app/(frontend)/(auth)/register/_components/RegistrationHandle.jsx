"use client";

import useUtility from "@/app/_hooks/useUtility";
import RegistrationForm from "./RegistrationForm";


export default function RegistrationHandle() {

    const {gs} = useUtility();
    const isRegisterEnabled = gs('registration');

    return (
        <>
            <RegistrationForm isRegisterEnabled={isRegisterEnabled} />
        </>
    )
}
