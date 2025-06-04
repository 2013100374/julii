"use client";
import WithdrawMethods from "./WithdrawMethods";
import WithdrawForm from './WithdrawForm';
import useWithdrawCalculation from "../_hooks/useWithdrawCalculation";

export default function WithdrawCard({ withdrawMethod, imagePath, loading = false }) {

    const {
        selectMethod,
        putAmount,
        withdrawLimit,
        processingCharge,
        processingChargeInfo,
        receivable,
        selectWithdrawMethod,
        amount,
        afterConvert
    } = useWithdrawCalculation();

    return (
        <div>
            <div className="row justify-content-center gy-sm-4 gy-3">
                <div className="col-lg-6">
                    <div className="payment-system-list is-scrollable gateway-option-list">
                        <WithdrawMethods
                            withdrawalMethods={withdrawMethod}
                            imagePath={imagePath}
                            selectMethod={selectMethod}
                            loading={loading}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <WithdrawForm
                        withdrawLimit={withdrawLimit}
                        processingCharge={processingCharge}
                        processingChargeInfo={processingChargeInfo}
                        receivable={receivable}
                        selectWithdrawMethod={selectWithdrawMethod}
                        afterConvert={afterConvert}
                        putAmount={putAmount}
                        amount={amount}
                    />
                </div>
            </div>
        </div>
    )
}
