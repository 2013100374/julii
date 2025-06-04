"use client";

import { useEffect } from "react";
import { getUser } from "@/lib/helpers";
import TwoFaVerification from "./TwoFaVerification";
import EmailVerification from "./EmailVerification";
import MobileVerification from "./MobileVerification";
import Banned from "./Banned";

export default function AuthorizationHandler() {
    const user = getUser(); 

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
