
import React from 'react'
import InstructorProfile from '../_component/InstructorProfile'
import { getSEO, getTitle } from '@/lib/helpers';
import ENDPOINTS from '@/lib/endpoints';
import { notFound } from 'next/navigation';



export async function generateMetadata(props) {
    const params = await props.params;
    const { username } = params;
 
        const seo = await getSEO({
                title: getTitle(username),
            });
        
         return seo;
            
}



export default async function page(props) {
  
    const params = await props.params;

    const { username } = params;

    var data;
    try {
        let base = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${base}${ENDPOINTS.INSTRUCTOR_PROFILE}/${username}`);
        data = await response.json();
        
    } catch (error) {
        console.error("Error fetching metadata:", error);
        return { title: "Profile Not Found", description: "Error loading course" };
    }
 
    
    if(data?.remark == 'instructor_not_found'){
        return notFound();
    }


    return (
        <>
            <InstructorProfile data={data?.data} />
        </>

    )
}
