'use client';

import { useEffect, useState } from "react";
import DepositCard from "./DepositCard";
import usePaymentMethod from "../_hooks/usePaymentMethod";
;

export const Deposit = ({ course = null }) => {
    const { getPaymentMethods } = usePaymentMethod();
    const [imagePath, setImagePath] = useState('');
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const { imagePath, paymentMethods } = await getPaymentMethods();
            setImagePath(imagePath);
            setPaymentMethods(paymentMethods);
            setLoading(false);
        })();
    }, []);


    return (
        <>

            <DepositCard
                loading={loading}
                paymentMethods={paymentMethods}
                imagePath={imagePath}
                course={course}
            />
        </>
    )
}