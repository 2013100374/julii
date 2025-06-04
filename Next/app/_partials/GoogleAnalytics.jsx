import { useEffect } from "react";
import { useSelector } from "react-redux";

export const GoogleAnalytics = () => {
    const { data, status } = useSelector((state) => state?.extension?.googleAnalytics);

    useEffect(() => {
        if (status != 'loading' || data?.data?.extension) {
            const script1 = document.createElement('script');
            script1.async = true;
            script1.src = `https://www.googletagmanager.com/gtag/js?id=${data?.data?.extension?.shortcode?.measurement_id?.value}`;
            document.body.appendChild(script1);

            const script2 = document.createElement('script');
            script2.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag("js", new Date());
                gtag("config", "${data?.data?.extension?.shortcode?.measurement_id?.value}");
            `;
            document.body.appendChild(script2);

            return () => {
                document.body.removeChild(script1);
                document.body.removeChild(script2);
            }
        }
    }, [data, status]);

    return null;
}