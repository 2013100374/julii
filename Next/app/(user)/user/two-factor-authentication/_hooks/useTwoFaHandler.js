import { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import ENDPOINTS from "@/lib/endpoints";
import { request } from '@/lib/helpers';

export default function useTwoFaHandler() {
    const [twoFaData, setTwoFaData] = useState(null);
    useEffect(() => {
        getTwoFaData();
    }, []);

    const getTwoFaData = async () => {
        try {
            const { data } = await request.get(ENDPOINTS.TWO_FA_SETUP);
            if (data.status === 'success') {
                setTwoFaData(data.data);
            } else {
                toast.error('Failed to fetch 2FA setup data');
            }
        } catch (error) {
            console.error('Error fetching 2FA data:', error);
            toast.error('An error occurred while fetching 2FA setup data');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(twoFaData?.secret)
            .then(() => {
                toast.success('Setup key copied to clipboard');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                toast.error('Failed to copy setup key');
            });
    };

    return { copyToClipboard, twoFaData}
}
