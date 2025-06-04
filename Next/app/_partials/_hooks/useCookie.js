import ENDPOINTS from '@/lib/endpoints';
import { request } from '@/lib/helpers';
import { useEffect, useState } from 'react'

export default function useCookie() {
    const [cookie, setCookie] = useState(null);
    const [cookieAccepted, setCookieAccepted] = useState(false);

    useEffect(() => {
        const cookie = document.cookie.split('; ').find(row => row.startsWith('gdpr_cookie='));

        if (cookie) setCookieAccepted(true);

        if(!cookieAccepted) getCookie();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getCookie = async () => {
        const {data} = await request.get(ENDPOINTS.COOKIE);
        setCookie(data?.data?.cookie);
    }

    const handleCookieAccept = () => {
        const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString(); // 30 days
        document.cookie = `gdpr_cookie=${window.location.hostname}; expires=${expires}; path=/`;
        setCookieAccepted(true);
    };

    return { cookie, setCookie, cookieAccepted, setCookieAccepted, handleCookieAccept }
}
