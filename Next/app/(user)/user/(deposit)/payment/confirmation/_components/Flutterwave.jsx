import useUtility from "@/app/_hooks/useUtility";
import { useEffect } from 'react';
import CourseDetailCard from "./CourseDetailCard";

export default function Flutterwave({ deposit, data, course }) {

    const { showAmount } = useUtility();

    const API_publicKey = data?.API_publicKey;

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js';
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);

    const payWithRave = () => {
        const { customer_email, amount, customer_phone, currency, txref } = data;
        getpaidSetup({
            PBFPubKey: API_publicKey,
            customer_email: `${customer_email}`,
            amount: `${amount}`,
            customer_phone: `${customer_phone}`,
            currency: `${currency}`,
            txref: `${txref}`,
            onclose: function () {
            },
            callback: function (response) {
                var txref = response.tx.txRef;
                var status = response.tx.status;
                var chargeResponse = response.tx.chargeResponseCode;
                if (chargeResponse == "00" || chargeResponse == "0") {
                    window.location = `${process.env.NEXT_PUBLIC_APP_URL}/user/deposit/confirmation?txref=${txref}&status=${status}`;
                } else {
                    window.location = `${process.env.NEXT_PUBLIC_APP_URL}/user/deposit/confirmation?txref=${txref}&status=${status}`;
                }
            }
        });
    }

    return (
        <>
            <div className="row">
                <div className={`col-md-12 ${course && 'col-lg-8'}`}>
                    <div className="card custom--card">
                        <div className="card-header">
                            <h5 className="card-title mb-0">Flutterwave</h5>
                        </div>
                        <div className="card-body p-5 text-center">
                            <ul className="list-group text-center">
                                <li className="list-group-item d-flex justify-content-between">
                                    You have to pay :
                                    <strong>{deposit && showAmount(deposit.final_amount, false)} {deposit && (deposit.method_currency)}</strong>
                                </li>
                                {
                                    !deposit?.course_id &&
                                    <li className="list-group-item d-flex justify-content-between">
                                        You will get :
                                        <strong>{deposit && showAmount(deposit.amount)}</strong>
                                    </li>
                                }
                            </ul>
                            <button type="button" className="btn btn--base w-100 mt-3" id="btn-confirm" onClick={payWithRave}>Pay Now</button>
                        </div>
                    </div>
                </div>
                {
                    course &&
                    <div className="col-md-12 col-lg-4">
                        <CourseDetailCard course={course} deposit={deposit} />
                    </div>
                }
            </div>
        </>
    )
}
