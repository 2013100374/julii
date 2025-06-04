import { useEffect, useState } from 'react';
import useUtility from "@/app/_hooks/useUtility";
import toast from 'react-hot-toast';
import { notifyToast } from '@/lib/helpers';
import { useSelector } from 'react-redux';
import CourseDetailCard from './CourseDetailCard';

export default function Razorpay({ deposit, data, course }) {
    const { showAmount, trans } = useUtility();
    const [verifying, setVerifying] = useState(false);
    const gs = useSelector(state => state?.gs?.data?.data?.general_setting);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    if (!data) return null;

    const payNow = async () => {
        try {
            const value = data.val;
            const options = {
                key: value?.key,
                amount: value?.amount,
                currency: value?.currency,
                name: value?.name,
                description: value?.description,
                order_id: value?.order_id,
                callback_url: data?.url,
                prefill: {
                    name: value["prefill.name"],
                    email: value["prefill.email"],
                    contact: value["prefill.contact"],
                },
                theme: {
                    color: `#${gs?.base_color}`
                },
                handler: function (response) {
                    setVerifying(true);
                    fetch(data?.url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        }),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            notifyToast(data);
                            if (data.status === "success") {
                                let base = process?.env?.NEXT_PUBLIC_AUTH_PREFIX || "/";

                                if (base !== "/") {
                                    base += "/";
                                }

                                if(deposit?.course_id){
                                    window.location.href = `${base}${deposit?.success_url}`;
                                }else{
                                    window.location.href = `${base}user/deposit/history`;
                                }
                            }
                        })
                        .catch((error) => {
                            toast.error("Error verifying payment");
                        })
                        .finally(() => {
                            setVerifying(false);
                        })
                },
                modal: {
                    ondismiss: function () {
                        let base = process?.env?.NEXT_PUBLIC_AUTH_PREFIX || "/";

                        if (base !== "/") {
                            base += "/";
                        }
                     
                        window.location.href = `${base}`;
                    }
                }

            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <div className="row">
                <div className={`col-md-12 ${course && 'col-lg-8'}`}>
                    <div className="card custom--card">
                        <div className="card-header">
                            <h5 className="card-title mb-0">{trans('Razorpay')}</h5>
                        </div>
                        <div className="card-body p-5">
                            <ul className="list-group text-center">
                                <li className="list-group-item d-flex justify-content-between">
                                    {trans('You have to pay:')}
                                    <strong>{deposit && showAmount(deposit.final_amount, false)} {deposit && (deposit.method_currency)}</strong>
                                </li>
                                {
                                    !deposit?.course_id &&
                                    <li className="list-group-item d-flex justify-content-between">
                                        {trans('You will get:')}
                                        <strong>{deposit && showAmount(deposit.amount)}</strong>
                                    </li>
                                }
                            </ul>
                            <form action={data.url} method={data.method} onSubmit={(e) => {
                                e.preventDefault();
                                payNow();
                            }}>
                                <input type="hidden" custom={data.custom} name="hidden" />
                                <button type="submit" className="btn btn--base w-100 mt-3">{verifying ? trans('Verifying...') : trans('Pay Now')}</button>
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
