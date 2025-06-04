import ContactForm from "./_components/ContactForm";
import { customPageData, getMetaTitle } from "@/lib/helpers";
import ContactFormWrapper from "./_components/ContactFormWrapper";
import PageContent from "../../_partials/PageContent";

import { notFound } from "next/navigation";

export const metadata = getMetaTitle("Contact");

export default async function Contact() {

    const page = await customPageData("contact");
    if (page?.remark === "page_not_found") return notFound();
    const sections = page?.data?.page?.secs;
    
    return (
        <>
            <ContactFormWrapper>
                <ContactForm />
            </ContactFormWrapper>
            <PageContent slug="/" sections={sections} />
        </>
    );
}
