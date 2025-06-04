"use client";

import { fromBase64, getLastSegment } from "@/lib/helpers";
import usePaymentConfirmation from "../_hooks/usePaymentConfirmation";
import Redirect from "./Redirect";
import Authorize from "./Authorize";
import Checkout from "./Checkout";
import Flutterwave from "./Flutterwave";
import NMI from "./NMI";
import Paystack from "./Paystack";
import Razorpay from "./Razorpay";
import Stripe from "./Stripe";
import StripeJs from "./StripeJs";
import StripeV3 from "./StripeV3";
import { Manual } from "./Manual";

export default function ConfirmationCard() {
    const { deposit, gatewayData, course } = usePaymentConfirmation();
    const lastSegment = getLastSegment(gatewayData?.view);
   
    const cards = {
        'redirect': <Redirect data={gatewayData} />,
        'Authorize': <Authorize data={gatewayData} deposit={deposit} course={course} />,
        'Checkout': <Checkout data={gatewayData} deposit={deposit}  course={course} />,
        'Flutterwave': <Flutterwave data={gatewayData} deposit={deposit}  course={course} />,
        'NMI': <NMI data={gatewayData} deposit={deposit} course={course} />,
        'Paystack': <Paystack data={gatewayData} deposit={deposit}  course={course} />,
        'Razorpay': <Razorpay data={gatewayData} deposit={deposit}  course={course} />,
        'Stripe': <Stripe data={gatewayData} deposit={deposit}  course={course} />,
        'StripeJs': <StripeJs data={gatewayData} deposit={deposit}  course={course}/>,
        'StripeV3': <StripeV3 data={gatewayData} deposit={deposit}  course={course} />,
    };

    return (
        <>
            {deposit && gatewayData ? (
                cards[lastSegment]
            ) : (
                <Manual data={gatewayData} deposit={deposit} course={course} />
            )}

        </>

    )
}
