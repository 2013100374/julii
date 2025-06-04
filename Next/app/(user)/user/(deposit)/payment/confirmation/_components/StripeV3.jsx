import { useEffect, useState } from 'react';

export default function StripeV3({ data }) {
    const [stripe, setStripe] = useState(null);
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://js.stripe.com/v3/";
        script.onload = () => {
            setStripe(Stripe(data.StripeJSAcc.publishable_key));
        };
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, [data]);

    useEffect(() => {
        if (stripe) {
            stripe.redirectToCheckout({
                sessionId: data.session.id
            });
        }
    }, [stripe, data]);

    return null;
}
