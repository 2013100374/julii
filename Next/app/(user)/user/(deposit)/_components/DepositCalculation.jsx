import React from 'react'
import useUtility from "@/app/_hooks/useUtility";

export default function DepositCalculation({ depositLimit, processingChargeInfo, processingCharge, payable, selectDepositMethod, afterConvert, course }) {
    const {trans,gs} = useUtility();
    const curText = gs('cur_text');
    return (
        <>
        {
            !course?.id &&
            <div className="deposit-info">
                <div className="deposit-info__title">
                    <p className="text">{trans('Limit')}</p>
                </div>
                <div className="deposit-info__input">
                    <p className="text"><span className="gateway-limit">{depositLimit}</span>
                    </p>
                </div>
            </div>
        }
            <div className="deposit-info">
                <div className="deposit-info__title">
                    <p className="text">
                        <span>
                            {trans('Processing Charge')}
                            <br />
                            <small className="text-primary text-sm">{processingChargeInfo}</small>
                        </span>
                    </p>
                </div>
                <div className="deposit-info__input">
                    <p className="text">{processingCharge}</p>
                </div>
            </div>

            <div className="deposit-info total-amount pt-3">
                <div className="deposit-info__title">
                    <p className="text">{trans('Total')}</p>
                </div>
                <div className="deposit-info__input">
                    <p className="text">{payable}</p>
                </div>
            </div>
            {(selectDepositMethod && selectDepositMethod?.currency != curText && selectDepositMethod?.method.crypto != 1) && (
                <div className="deposit-info gateway-conversion pt-2">
                    <div className="deposit-info__title">
                        <p className="text">{trans('Conversion Rate')}
                        </p>
                    </div>
                    <div className="deposit-info__input">
                        <p className="text">
                            1 {curText} = <span className="rate">{parseFloat(selectDepositMethod?.rate).toFixed(2)}</span> <span className="method_currency">{selectDepositMethod?.currency}</span>
                        </p>
                    </div>
                </div>
            )}
            {selectDepositMethod && selectDepositMethod?.currency != curText && selectDepositMethod?.method?.crypto != 1 && (
                <div className="deposit-info conversion-currency pt-2">
                    <div className="deposit-info__title">
                        <p className="text">
                            In <span>{selectDepositMethod?.currency}</span>
                        </p>
                    </div>
                    <div className="deposit-info__input">
                        <p className="text">
                            <span>{afterConvert} {selectDepositMethod?.currency}</span>
                        </p>

                    </div>
                </div>
            )}
            {selectDepositMethod && selectDepositMethod?.method?.crypto == 1 && (
                <div className="crypto-message mb-3">
                    {trans('Conversion with')} {selectDepositMethod?.currency} {trans('and final value will Show on next step')}
                </div>
            )}
        </>
    )
}
