"use client"

import { useSelector } from "react-redux";
import { RenderSections } from "./RenderSections";

export default function PageContent({ slug, sections = [] }) {
   
    
    const customPageData = useSelector((state) => state.customPage.data);

    const page = customPageData?.data?.pages?.find(page => page.slug === slug)

    return (
        <>
            {page && <RenderSections page={page} sections={JSON.parse(sections)} />}
        </>
    )
}
