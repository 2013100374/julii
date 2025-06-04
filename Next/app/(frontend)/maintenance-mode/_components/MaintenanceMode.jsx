'use client';

import ENDPOINTS from "@/lib/endpoints";
import { request } from "@/lib/helpers";
import Image from "next/image";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export const MaintenanceMode = () => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await request.get(ENDPOINTS.ALL_SECTIONS + '/maintenance');
            setContent(data[0]?.content?.data_values);
            setLoading(false);
        }

        fetchData();
    }, []);


    if (!content) return null;


    content.image = `${process.env.NEXT_PUBLIC_API_URL}/assets/images/maintenance/${content.image}`;

    return (
        <>
            {
                loading ? <section className="py-100">

                <div className="d-flex flex-column align-items-center gap-2">
                   <Skeleton width={500} height={300}/>
                   <Skeleton width={500} height={30}/>
                   <Skeleton width={1000} height={30}/>
                   
                </div>
            </section>
            :
                    <section className="py-100">

                        <div className="d-flex flex-column align-items-center gap-2">
                            <Image src={content.image} alt="Maintenance" width={500} height={400} />
                            <div dangerouslySetInnerHTML={{ __html: content.description }} />
                        </div>
                    </section>
            }
        </>
    )
};