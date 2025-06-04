'use client';

import { useEffect, useState } from "react";
import WithdrawCard from "./WithdrawCard";
import useWithdrawalMethod from "../_hooks/useWithdrawalMethod";

export const Withdraw = () => {
    const { getWithdrawalMethods } = useWithdrawalMethod();
    const [withdrawMethod, setWithdrawMethod] = useState([]);
    const [imagePath, setImagePath] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const { withdrawMethod, imagePath } = await getWithdrawalMethods();
            setWithdrawMethod(withdrawMethod);
            setImagePath(imagePath);
            setLoading(false);
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="card custom--card">
            <div className="card-body">
                <WithdrawCard
                    loading={loading}
                    withdrawMethod={withdrawMethod}
                    imagePath={imagePath}
                />
            </div>
        </div>
    )
}
