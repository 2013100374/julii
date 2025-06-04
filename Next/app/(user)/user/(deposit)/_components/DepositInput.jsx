import Input from "@/app/_forms/Input";
import useUtility from "@/app/_hooks/useUtility";

export default function DepositInput({ amount, putAmount }) {
    const {trans,gs} = useUtility();
    return (
        <>
            <div className="deposit-info">
                <div className="deposit-info__title">
                    <p className="text mb-0">{trans('Amount')}</p>
                </div>
                <div className="deposit-info__input">
                    <div className="input-group">
                        <span className="input-group-text">{gs('cur_sym')}</span>
                        <Input name='amount' className="form--control form-control amount" placeholder='00.00' required value={amount} onChange={putAmount}   />
                    </div>
                </div>
            </div>
        </>
    )
}
