"use client";

import useUtility from "@/app/_hooks/useUtility";
import ENDPOINTS from "@/lib/endpoints";
import { request } from "@/lib/helpers";
import { setInstructorData } from "@/store/instructorSlice";
import { setUserData } from "@/store/userSlice";
import axios from "axios";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ValidateLogin = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [session, setSession] = useState(false);
    const { trans } = useUtility();

    const loginUser = useCallback(async (session) => {
        const { data } = await request.post(ENDPOINTS.SOCIAL_LOGIN, {
            provider: session.provider,
            token: session.accessToken
        });
        

        const userData = data?.data?.user;

        deleteCookie("access-token");
        deleteCookie("is_logged_in_instructor");
        deleteCookie("instructor_data");
        dispatch(setInstructorData(null));

        setCookie('access-token', data?.data.access_token);
        setCookie('is_logged_in', true);
        setCookie('user_data', userData);
        dispatch(setUserData(userData));
        router.push('/user/dashboard');
    }, [router, dispatch]);

    useEffect(() => {
        const fetch = async () => {
            if (!session) {
                const tokenUrl = process.env.NEXT_PUBLIC_AUTH_PREFIX == '/' ? "/api/token" : (process.env.NEXT_PUBLIC_AUTH_PREFIX + "/api/token");
                const response = await axios.get(tokenUrl);
                if (response.data.session) {
                    const data = response.data.session;
                    setSession(data);
                    loginUser(data);
                }
            }
        };
        fetch();
    }, [session, loginUser]);

    return <div className="text-center"><p>{trans(`You will be redirected shortly...`)}</p></div>;
}

export default ValidateLogin;