import { generateScript } from '@/lib/helpers';
import Script from 'next/script';
import { useSelector } from 'react-redux';

export default function Tawk() {
    const {data, status} = useSelector((state) => state?.extension?.tawkChat);
    
    if(status == 'loading' || !data?.data?.extension) return null;
    
    const script = `
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        (function() {
            var s1 = document.createElement("script"),
                s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = "https://embed.tawk.to/{{app_key}}";
            s1.charset = "UTF-8";
            s1.setAttribute("crossorigin", "*");
            s0.parentNode.insertBefore(s1, s0);
        })();
    `;

    return (
        <Script id="tawk" strategy="lazyOnload">
            {generateScript(script, data?.data?.extension?.shortcode)}
        </Script>
    );
}
