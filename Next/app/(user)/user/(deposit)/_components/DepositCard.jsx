"use client";
import DepositForm from "./DepositForm";
import PaymentGateway from "./PaymentGateway";
import useDepositCalculation from "../_hooks/useDepositCalculation";
import useUtility from "@/app/_hooks/useUtility";
import Skeleton from "react-loading-skeleton";



export default function DepositCard({ paymentMethods, imagePath, loading = false, course = null }) {
    const {
        selectDepositMethod,
        selectMethod,
        depositLimit,
        amount, putAmount,
        processingChargeInfo,
        processingCharge,
        payable,
        afterConvert
    } = useDepositCalculation();

    const { trans } = useUtility();


    return (
        <>
            <div className="col-12">
                {
                    loading ? <Skeleton height={50} /> :
                        <h5 className="payment-card-title">{!course ? trans('Deposit') : trans('Payment')}</h5>
                }
            </div>
            <div className="row justify-content-center gy-sm-4 gy-3">
                <div className="col-lg-6">
                    <div className="payment-system-list is-scrollable gateway-option-list">
                        <PaymentGateway paymentMethods={paymentMethods} imagePath={imagePath} selectMethod={selectMethod} loading={loading}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <DepositForm
                        depositLimit={depositLimit}
                        amount={amount}
                        putAmount={putAmount}
                        processingChargeInfo={processingChargeInfo}
                        processingCharge={processingCharge}
                        payable={payable}
                        selectDepositMethod={selectDepositMethod}
                        afterConvert={afterConvert}
                        course={course}
                        isLoading={loading}
                    />
                </div>

            </div>
        </>
    )
}
