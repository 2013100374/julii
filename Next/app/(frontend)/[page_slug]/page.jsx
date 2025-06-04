import PageContent from "@/app/_partials/PageContent";
import { customPageData, getSEO, getTitle } from "@/lib/helpers";
import { notFound } from "next/navigation";


export async function generateMetadata(props) {
    const params = await props.params;
    const { page_slug } = params;

    const page = await customPageData(page_slug);

    if (page.remark == 'page_not_found') {
        return notFound();
    }

        const seo = await getSEO({
            title: getTitle(page.data.page.name),
            description: page.data.seo_content?.description,
            keywords: page.data.seo_content?.keywords,
            image: page.data.seo_image,
        });

        return seo;
}

export default async function CustomPage(props) {
    const params = await props.params;
    const { page_slug } = params;
    const page = await customPageData(page_slug);

    if (page.remark == 'page_not_found') return notFound();
    const sections = page?.data?.page?.secs;
  
    return (
        
            <PageContent
                slug={page_slug}
                sections={sections}
            />
      
    )
}
