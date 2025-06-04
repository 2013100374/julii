"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PreLoader from '@/app/_partials/PreLoader';
import Cookie from './Cookie';
import { Toaster } from 'react-hot-toast';
import { usePathname, useRouter } from 'next/navigation';
import { deleteCookie, setCookie } from 'cookies-next'; 
import Tawk from './Tawk';
import FacebookComment from './FacebookComment';
import { GoogleAnalytics } from './GoogleAnalytics';
import { getCategories } from '@/lib/helpers';
import { setCategoriesData } from '@/store/categoriesSlice';
import CustomColor from './CustomColor';


export default function HandleChildren({ children }) {
    const languageStatus        = useSelector((state) => state.language.status);
    const generalSettingStatus  = useSelector((state) => state.gs.status);
    const gsRemark              = useSelector((state) => state.gs.data?.remark);
    const customPageStatus      = useSelector((state) => state.customPage.status);
    const frontendSectionStatus = useSelector((state) => state.frontend.status);
    const [loading, setLoading] = useState(true);
    const router                = useRouter();
    const pathname              = usePathname();
 
  
    

    const dispatch = useDispatch();

    useEffect(() => {
    
        if (languageStatus == 'succeeded' && generalSettingStatus == 'succeeded' && customPageStatus == 'succeeded' && frontendSectionStatus == 'succeeded') {
            setLoading(false);
        }

    }, [languageStatus, generalSettingStatus, customPageStatus, frontendSectionStatus])


    useEffect(() => {
        if (gsRemark == 'maintenance_mode') {
            setCookie('maintenance_mode', true);
            if (pathname != '/maintenance-mode') {
                router.push('/maintenance-mode');
            }
        } else {
            deleteCookie('maintenance_mode');
            if (pathname == '/maintenance-mode') {
                router.push('/');
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gsRemark]);

      useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getCategories()
                    dispatch(setCategoriesData(data));
       
            } catch (error) {
                console.error("Error fetching categories:", error)
            }
        }
        fetchCategories()
    }, [dispatch])
    



    if (loading) {
        return <PreLoader />
    }

    if (gsRemark == 'maintenance_mode') {
        return children;
    }

    return (
        <>
            <div className="container">
                <Toaster position='top-right' reverseOrder={false} />
                <Tawk /> 
                <FacebookComment /> 
                <GoogleAnalytics />
            </div>
            {children}
            <Cookie /> 
            <CustomColor />
        </>
    );
}
