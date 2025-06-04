import ENDPOINTS from "@/lib/endpoints";
import { useEffect, useState } from "react";
import useUtility from "@/app/_hooks/useUtility";
import { request } from "@/lib/helpers";

export default function useKYCDetails() {
    const [kycData, setKycData] = useState(null);
    const { gs } = useUtility();
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await request.get(ENDPOINTS.INSTRUCTOR_KYC_DATA);
            
            setKycData(data.data);
        }
        fetchData();
    }, []);

    const downloadFile = async (fileName) => {
        const response = await request.get(ENDPOINTS.DOWNLOAD_FILE + `/${fileName}`, {
            responseType: 'blob'
        });

        const name = `${gs('site_name')}-attachments.png`;
        const fileBlob = new Blob([response.data], { type: 'image/png' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(fileBlob);
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return { kycData, downloadFile }
}
