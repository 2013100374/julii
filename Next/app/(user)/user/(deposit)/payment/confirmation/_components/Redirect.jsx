import { useEffect } from 'react';

export default function Redirect({ data }) {
    useEffect(() => {
        const form = document.createElement('form');
        form.action = data.url;
        form.method = data.method;
        form.id = 'auto_submit';
        if (typeof data.val === 'object') {
            Object.entries(data.val).forEach(([k, v]) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = k;
                input.value = v;
                form.appendChild(input);
            });
        }
        document.body.appendChild(form);
        form.submit();
    }, [data]);

    return null;
}
