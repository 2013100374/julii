import { useState, useEffect, useCallback } from "react";
import useUtility from "@/app/_hooks/useUtility";

export default function useDepositCalculation() {
    const [selectDepositMethod, setSelectDepositMethod] = useState(null);
    const [depositLimit, setDepositLimit] = useState(0);
    const [amount, setAmount] = useState(0);
    const [depositAmount, setDepositAmount] = useState(0);
    const { showAmount } = useUtility();
    const [processingChargeInfo, setProcessingChargeInfo] = useState('');
    const [processingCharge, setProcessingCharge] = useState(0);
    const [processingChargeForCalculation, setProcessingChargeForCalculation] = useState(0);
    const [payable, setPayable] = useState(0);
    const [payableForCalculation, setPayableForCalculation] = useState(0);
    const [afterConvert, setAfterConvert] = useState(0);

    const selectMethod = (method) => {
        setSelectDepositMethod(method);
    }

    const processingFeeInfo = useCallback(() => {
        () => {
            if (selectDepositMethod) {
                setProcessingChargeInfo(`${parseFloat(selectDepositMethod.percent_charge).toFixed(2)}% with ${showAmount(parseFloat(selectDepositMethod.fixed_charge))} charge for processing fees`);
            }
        }
    }, [selectDepositMethod, showAmount]);


    const calculateCharge = useCallback(() => {
        if (selectDepositMethod) {
            let percentCharge = (selectDepositMethod.percent_charge / 100) * amount;
            let fixedCharge = selectDepositMethod.fixed_charge;
            let charge = parseFloat(percentCharge) + parseFloat(fixedCharge);
            setProcessingCharge(showAmount(charge));
            setProcessingChargeForCalculation(parseFloat(charge));
        }
    }, [amount, selectDepositMethod, showAmount]);


    const calculatePayable = useCallback(() => {
        if (selectDepositMethod) {
            let payable = parseFloat(amount) + parseFloat(processingChargeForCalculation);
            if (payable < 0) {
                payable = 0;
            }
            setPayable(showAmount(payable));
            setPayableForCalculation(payable);
        }
    }, [amount, processingChargeForCalculation, selectDepositMethod, showAmount]);

    const afterConvertValue = useCallback(() => {
        if (selectDepositMethod && payableForCalculation) {
            setAfterConvert(parseFloat(payableForCalculation * selectDepositMethod?.rate).toFixed(2));
        }
    }, [payableForCalculation, selectDepositMethod]);

    const getDepositLimit = useCallback(() => {
        if (selectDepositMethod) {
            let minLimit = showAmount(selectDepositMethod.min_amount);
            let maxLimit = showAmount(selectDepositMethod.max_amount);
            let limit = minLimit + ' - ' + maxLimit;
            setDepositLimit(limit);
            return limit;
        }
        return 0;
    }, [selectDepositMethod, showAmount]);

    useEffect(() => {
        getDepositLimit();
        processingFeeInfo();
    }, [getDepositLimit, processingFeeInfo,]);

    useEffect(() => {
        calculateCharge();
        calculatePayable();
        afterConvertValue();
    }, [amount, selectDepositMethod, afterConvertValue, calculateCharge, calculatePayable]);

    const putAmount = (amount) => {
        setAmount(amount);
    }

    return {
        selectDepositMethod,
        selectMethod,
        depositLimit,
        amount,
        putAmount,
        processingChargeInfo,
        processingCharge,
        payable,
        afterConvert
    
    }
}
