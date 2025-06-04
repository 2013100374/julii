
import { customPageData, getMetaTitle } from "@/lib/helpers";
import PageContent from "../../_partials/PageContent";

import BlogCard from "./_components/BlogCard";

import { notFound } from "next/navigation";

export const metadata = getMetaTitle("Blog");

export default async function Blogs() {

    const page = await customPageData("blogs");
    if (page?.remark === "page_not_found") return notFound();
    const sections = page?.data?.page?.secs;
    
    return (
        <>
       
            <BlogCard />
           
            <PageContent slug="/" sections={sections} />
        </>
    );
}
