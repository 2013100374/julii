import { cache } from 'react'
import { getBlogDetails } from "../_hooks/BlogDetails";
import BlogDetailsClient from "../BlogDetailsClient";
import { frontendImage, getSEO, getTitle } from "@/lib/helpers";


import { notFound } from 'next/navigation';


const data = cache(async ({ slug }) => {
    return await getBlogDetails({ slug });
});

export async function generateMetadata(props) {
    const params = await props.params;
    const { slug } = params;
    const blogData = await data({ slug });

    return await getSEO({
        title: getTitle(blogData?.blog?.data_values?.title),
        description: blogData?.seo_content?.description,
        keywords: blogData?.seo_content?.keywords,
        image: blogData?.seo_image
    });
}

export default async function BlogDetails(props) {
    const params = await props.params;
    const { slug } = params;
    const blogData = await data({ slug });


    if (blogData.status == 'error') {
        return notFound();
    }

    
    return (
        <BlogDetailsClient blogData={blogData} />
    );


}