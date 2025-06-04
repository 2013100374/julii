import { request } from '@/lib/helpers';
import { useCallback, useEffect, useState } from 'react';
import ENDPOINTS from '@/lib/endpoints';

const useDashboardHandler = () => {

    const [dashboardData, setDashboardData] = useState(null); 
    
    const getDashboardData = useCallback(async () => {
        try {
            const { data } = await request.get(ENDPOINTS.INSTRUCTOR_DASHBOARD);

            if (data.status === 'error') {
                return;
            }
            setDashboardData(data?.data); 

        } catch (error) {
            console.error('Error fetching dashboard data:', error);

        }
    }, [setDashboardData ]);


    useEffect(() => {
        getDashboardData();
    }, [getDashboardData]);


    return {
        dashboardData,
    };
}

export default useDashboardHandler;
