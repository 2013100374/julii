import useUtility from "@/app/_hooks/useUtility";
import { useEffect } from 'react';
import CourseDetailCard from "./CourseDetailCard";

export default function Paystack({ deposit, data, course }) {
    const { showAmount } = useUtility();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = '//js.paystack.co/v1/inline.js';
        script.setAttribute('data-key', data.key);
        script.setAttribute('data-email', data.email);
        script.setAttribute('data-amount', Math.round(data.amount));
        script.setAttribute('data-currency', data.currency);
        script.setAttribute('data-ref', data.ref);
        script.setAttribute('data-custom-button', 'btn-confirm');
        document.querySelector('form').appendChild(script);
        return () => {
            document.querySelector('form')?.removeChild(script);
        };
    }, [data]);

    return (
        <>

            <div className="row">
                <div className={`col-md-12 ${course && 'col-lg-8'}`}>
                    <div className="card custom--card">
                        <div className="card-header">
                            <h5 className="card-title mb-0">Paystack</h5>
                        </div>
                        <div className="card-body p-5">
                            <form method="POST" className="text-center">
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
                                <button type="button" className="btn btn--base w-100 mt-3" id="btn-confirm">Pay Now</button>
                            </form>
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
