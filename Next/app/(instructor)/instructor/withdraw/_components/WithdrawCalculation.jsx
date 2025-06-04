import useUtility from "@/app/_hooks/useUtility";

export default function WithdrawCalculation({
    limit,
    processingCharge,
    processingChargeInfo,
    receivable,
    selectWithdrawMethod,
    afterConvert
}) {
    const { trans, gs } = useUtility();
    const curText = gs('cur_text');
    return (
        <>
            <div className="deposit-info">
                <div className="deposit-info__title">
                    <p className="text has-icon">{trans('Limit')}</p>
                </div>
                <div className="deposit-info__input">
                    <p>{limit}</p>
                </div>
            </div>
            <div className="deposit-info">
                <div className="deposit-info__title">
                    <p className="text has-icon">
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
                    <p className="text">{trans('Receivable')}</p>
                </div>
                <div className="deposit-info__input">
                    <p className="text">{receivable}</p>
                </div>
            </div>
            {(selectWithdrawMethod && selectWithdrawMethod?.currency != curText) && (
                <div className="deposit-info pt-2">
                    <div className="deposit-info__title">
                        <p className="text">{trans('Conversion')}</p>
                    </div>
                    <div className="deposit-info__input">
                        <p className="text">
                            1 {curText} = <span className="rate">{parseFloat(selectWithdrawMethod?.rate).toFixed(2)}</span> <span className="method_currency">{selectWithdrawMethod?.currency}</span>
                        </p>
                    </div>
                </div>
            )}
            {(selectWithdrawMethod && selectWithdrawMethod?.currency != curText) && (
                <div className="deposit-info pt-2">
                    <div className="deposit-info__title">
                        <p className="text">
                            In {selectWithdrawMethod?.currency}
                        </p>
                    </div>
                    <div className="deposit-info__input">
                        <p className="text">{afterConvert}</p>
                    </div>
                </div>
            )}
        </>
    )
}
