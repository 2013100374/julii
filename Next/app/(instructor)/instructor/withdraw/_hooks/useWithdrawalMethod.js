import ENDPOINTS from "@/lib/endpoints";
import { request } from "@/lib/helpers";

export default function useWithdrawalMethod() {
    const getWithdrawalMethods = async () => {
        try {
            const { data } = await request.get(ENDPOINTS.WITHDRAWAL_METHODS);

            if (data.status === 'success') {
                return {
                    withdrawMethod: data.data.withdrawMethod,
                    imagePath: data.data.imagePath
                };
            }
        } catch (error) {
            console.error('Error fetching withdrawal methods:', error);
        }
        return {
            withdrawMethod: [],
            imagePath: ''
        };
    };

    return { getWithdrawalMethods }
}
