import ENDPOINTS from "@/lib/endpoints";
import { request } from "@/lib/helpers";

export default function useCustomPage() {
    const getCustomPage = async (slug) => {
        const { data } = await request.get(`${ENDPOINTS.CUSTOM_PAGE}/${slug}`);
        return data;
    }

    return { getCustomPage }
}
