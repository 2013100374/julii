"use client";
"use strict";
import { fetchCustomPages } from "@/store/customPageSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function SetCustomPages() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCustomPages());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return null;
}

