import 'bootstrap/dist/css/bootstrap.min.css';
import '@/public/css/line-awesome.min.css';
import '@/public/css/fontawesome-all.min.css';
import 'react-loading-skeleton/dist/skeleton.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/public/css/global.css';

import Wrapper from './Wrapper';
import { getSEO } from '@/lib/helpers';



export async function generateMetadata() {
    const globalSEO = await getSEO();
    return globalSEO;
}

export default async function RootLayout({ children }) {
    return (
        <html>
            <body suppressHydrationWarning>
                <Wrapper>
                    {children}
                </Wrapper>
            </body>
        </html>
    );
}

