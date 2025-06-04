"use client";

import { useEffect } from "react";
import { getInstructor } from "@/lib/helpers";
import EmailVerification from "./EmailVerification";
import MobileVerification from "./MobileVerification";
import TwoFaVerification from "./TwoFaVerification";
import Banned from "./Banned";

export default function AuthorizationHandler() {
    const user = getInstructor(); 

    useEffect(() => { 
        if (user) {
            if (user.status == 0) return;
            if (user.ev != 1) return;
            if (user.sv != 1) return;
            if (user.tv != 1) return;

            window.location.reload();
        }
    }, [user]);

    if (user?.status == 0) return <Banned user={user} />;
    if (user?.ev != 1) return <EmailVerification user={user} />;
    if (user.sv != 1) return <MobileVerification />;
    if (user?.tv != 1) return <TwoFaVerification />;

    return null;
}
