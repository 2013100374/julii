"use client";

import { useState, useEffect } from "react";
import useUtility from "@/app/_hooks/useUtility";
import Skeleton from "react-loading-skeleton";
import { Image } from "react-bootstrap";
import '@/public/css/payment-card.css';
import { usePathname } from "next/navigation";
import { getProfileImage } from "@/lib/helpers";
import balanceImage from "@/public/images/main_balance.png";


export default function PaymentGateway({ paymentMethods, imagePath, selectMethod, loading = false }) {
    const { trans } = useUtility();
    const [showAll, setShowAll] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (showAll) {
            const sixthItem = document.querySelectorAll('.payment-item')[5];
            if (sixthItem) {
                sixthItem.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [showAll]);

    if (loading) return (
        <div className="px-3">
            <Skeleton
                direction="ltr"
                duration={0.6}
                height={40}
                count={5}
            />
        </div>
    );
    const selectedMethod = paymentMethods.find(method => method.method_code === -1000);

    return (
        <>
            {
                (pathname != '/user/deposit-amount' && selectedMethod) &&
                <label key={selectedMethod.id} htmlFor={selectedMethod.id}
                    className={`payment-item`}>
                    <div className="payment-item__info">
                        <span className="payment-item__check"></span>
                        <span className="payment-item__name">{trans(selectedMethod.name)}</span>
                    </div>
                    <div className="payment-item__thumb">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <Image
                            className="payment-item__thumb-img"
                            src={balanceImage.src}
                            alt="payment-thumb"
                        />
                    </div>
                    <input className="payment-item__radio gateway-input" hidden id={selectedMethod.id}
                        type="radio" name="method_code" value={selectedMethod.id}
                        onChange={() => selectMethod(selectedMethod)}
                    />
                </label>
            }

            {paymentMethods.map((method, index) => (
                (method?.method_code != -1000 &&

                    <label key={method.id} htmlFor={method.id}
                        className={`payment-item ${(!showAll && index > 4) ? 'd-none' : ''}`}>
                        <div className="payment-item__info">
                            <span className="payment-item__check"></span>
                            <span className="payment-item__name">{trans(method.name)}</span>
                        </div>
                        <div className="payment-item__thumb">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <Image
                                className="payment-item__thumb-img"
                                src={`${process.env.NEXT_PUBLIC_API_URL}/${imagePath}/${method?.method?.image}`}
                                alt="payment-thumb"
                            />
                        </div>
                        <input className="payment-item__radio gateway-input" hidden id={method.id}
                            type="radio" name="method_code" value={method.id}
                            onChange={() => selectMethod(method)}
                        />
                    </label>
                )

            ))}

            {(paymentMethods.length > 4 && !showAll) && (
                <button type="button" className={`payment-item__btn more-gateway-option`} onClick={() => {
                    setShowAll(true);
                }}>
                    <p className="payment-item__btn-text">{trans('Show All Payment Options')}</p>
                    <span className="payment-item__btn__icon"><i className="las la-angle-down"></i></span>
                </button>
            )}
        </>
    )
}
