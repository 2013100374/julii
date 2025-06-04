import React from 'react';
import '@/public/css/cookie.css';
import useUtility from '@/app/_hooks/useUtility';
import useCookie from '@/app/_partials/_hooks/useCookie';
import Link from 'next/link';

export default function Cookie() {
    const { trans } = useUtility();
    const { cookie, cookieAccepted, handleCookieAccept } = useCookie();

    return (
        <>
            {(!cookieAccepted && cookie?.data_values?.status == 1) && (
                <div className="cookies-card text-center">
                    <div className="cookies-card__icon bg--base">
                        <i className="las la-cookie-bite"></i>
                    </div>
                    <p className="mt-4 cookies-card__content">
                        {trans(cookie?.data_values?.short_desc)}
                        <Link href="/cookie-policy">
                            {trans('learn more')}
                        </Link>
                    </p>
                    <div className="cookies-card__btn mt-4">
                        <button type='button' className="btn btn--base w-100" onClick={handleCookieAccept}>
                            {trans('Allow')}
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
