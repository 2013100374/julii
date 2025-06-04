import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function FacebookComment() {
    const { data, status } = useSelector((state) => state?.extension?.facebookComment);

    useEffect(() => {
        if (data?.data?.extension?.shortcode?.app_key?.value && status !== 'loading') {
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v4.0&appId=${data?.data?.extension?.shortcode?.app_key?.value}&autoLogAppEvents=1`;
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        }
    }, [data, status]);

    return (
        <>
            <div id="fb-root"></div>
        </>
    );
}
