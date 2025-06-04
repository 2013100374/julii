"use client";

import { Provider } from 'react-redux';
import { store } from '@/store';
import SetLanguage from './_partials/SetLanguage';
import HandleChildren from './_partials/HandleChildren';
import LoadGlobalData from './_partials/LoadGlobalData';
import { SessionProvider } from 'next-auth/react';
import Scroll from './_partials/Scroll';
import TopLoader from './_partials/TopLoader';

import SetCustomPages from './_partials/SetCustomPages';

export default function Wrapper({ children }) {
    const authPrefix = process.env.NEXT_PUBLIC_AUTH_PREFIX;

    let basePath;
    
    if (authPrefix === '/' || !authPrefix) {
        basePath = '/api/auth';
    } else {
        basePath = `${authPrefix}/api/auth`;
    }

    return (
        <SessionProvider basePath={basePath}>
            <Provider store={store}>
            <Scroll/>
                <LoadGlobalData />
                <SetLanguage />
                <TopLoader />
                <SetCustomPages/>    
                <HandleChildren>
                    {children}
                </HandleChildren>
           
            </Provider>
        </SessionProvider>
    )
}