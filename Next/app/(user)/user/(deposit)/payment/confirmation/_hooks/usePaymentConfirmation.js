"use client";

import { fromBase64 } from "@/lib/helpers";
import { useEffect, useState } from "react";

export default function usePaymentConfirmation() {

    const [deposit, setDeposit] = useState(null);
    const [gatewayData, setGatewayData] = useState(null);
    const [course,setCourse] = useState(null);

    useEffect(() => {
        getDeposit();
    }, []);

    const getDeposit = async () => {
        try {
            let deposit = JSON.parse(fromBase64(localStorage.getItem('deposit')));
            setDeposit(deposit);
        } catch (error) {
            setDeposit(null);
        }

        try {
            let gatewayData = JSON.parse(fromBase64(localStorage.getItem('gatewayData')));
            setGatewayData(gatewayData);
        } catch (error) {
            setGatewayData(null);
        }

        try {
            let course = JSON.parse(fromBase64(localStorage.getItem('course')));
            setCourse(course);
        } catch (error) {
            setCourse(null);
        }
    }

    
    return { deposit, gatewayData, course }
}
