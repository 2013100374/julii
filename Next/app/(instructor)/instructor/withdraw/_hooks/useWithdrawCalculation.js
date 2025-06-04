import { useState, useEffect } from "react";
import useUtility from '@/app/_hooks/useUtility';

export default function useWithdrawCalculation() {
    const [selectWithdrawMethod, setSelectWithdrawMethod] = useState(null);
    const [withdrawLimit, setWithdrawLimit] = useState(null);
    const [amount, setAmount] = useState(0);
    const { showAmount } = useUtility();
    const [processingCharge, setProcessingCharge] = useState('0.00');
    const [processingChargeInfo, setProcessingChargeInfo] = useState('');
    const [receivable, setReceivable] = useState('0.00');
    const [processingChargeForCalculation, setProcessingChargeForCalculation] = useState(0);
    const [afterConvert, setAfterConvert] = useState(0);
    const [receivableForCalculation, setReceivableForCalculation] = useState(0);

    useEffect(() => {
        getWithdrawLimit();
        processingFeeInfo();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectWithdrawMethod]);

    useEffect(() => {
        calculateCharge();
        calculateReceivable();
        afterConvertValue();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amount, selectWithdrawMethod]);

    const selectMethod = (method) => {
        setSelectWithdrawMethod(method);
    }

    const getWithdrawLimit = () => {
        if (selectWithdrawMethod) {
            let minLimit = showAmount(selectWithdrawMethod.min_limit);
            let maxLimit = showAmount(selectWithdrawMethod.max_limit);
            let limit = minLimit + ' - ' + maxLimit;
            setWithdrawLimit(limit);
            return limit;
        }
        return 0;
    }

    const putAmount = (e) => {
        setAmount(e.target.value);
    }

    const processingFeeInfo = () => {
        if (selectWithdrawMethod) {
            setProcessingChargeInfo(`${parseFloat(selectWithdrawMethod.percent_charge).toFixed(2)}% with ${showAmount(parseFloat(selectWithdrawMethod.fixed_charge))} charge for processing fees`);
        }
    }

    const calculateCharge = () => {
        if (selectWithdrawMethod) {
            let percentCharge = (selectWithdrawMethod.percent_charge / 100) * amount;
            let fixedCharge = selectWithdrawMethod.fixed_charge;
            let charge = parseFloat(percentCharge) + parseFloat(fixedCharge);
            setProcessingCharge(showAmount(charge));
            setProcessingChargeForCalculation(parseFloat(charge));
        }
    }

    const calculateReceivable = () => {
        if (selectWithdrawMethod) {
            let receivable = amount - processingChargeForCalculation;
            if (receivable < 0) {
                receivable = 0;
            }
            setReceivable(showAmount(receivable));
            setReceivableForCalculation(receivable);
        }
    }

    const afterConvertValue = () => {
        if (selectWithdrawMethod) {
            setAfterConvert(parseFloat(receivableForCalculation * selectWithdrawMethod?.rate).toFixed(2));
        }
    }

    return {
        selectWithdrawMethod,
        selectMethod,
        withdrawLimit,
        amount,
        putAmount,
        processingCharge,
        processingChargeInfo,
        receivable,
        afterConvert
    }
}
