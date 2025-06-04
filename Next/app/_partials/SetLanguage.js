"use client";
import { fetchLangKeys } from "@/store/langSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function SetLanguage() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchLangKeys());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return null;
}
