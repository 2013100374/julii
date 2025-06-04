import ENDPOINTS from "@/lib/endpoints";
import { useEffect, useState } from "react";
import { request } from "@/lib/helpers";

export default function usePolicyPages() {
    const [policyPages, setPolicyPages] = useState([]);

    useEffect(() => {
        getPolicyPages();
    }, []);

    const getPolicyPages = async () => {
        const {data} = await request.get(ENDPOINTS.POLICY_PAGES);
        setPolicyPages(data);
    }

    return {policyPages}
}
