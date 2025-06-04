import { customPageData, getSEO, getTitle } from '@/lib/helpers';

import PageContent from '../_partials/PageContent';
import Banner from '../_partials/_sections/Banner';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const page = await customPageData('home');
  if (page.remark == 'page_not_found') {
    return notFound();
  }
  return await getSEO({
    title: getTitle(page?.data?.page?.name),
    description: page?.data?.seo_content?.description,
    keywords: page?.data?.seo_content?.keywords,
    image: page?.data?.seo_image,
  });
}

export default async function Home() {
  const page = await customPageData('home');
  if (page.remark == 'page_not_found') return notFound();
  const sections = page?.data?.page?.secs

  return (
      <>
        <Banner />
        <PageContent
          slug='/'
          sections={sections}/>
      </>
  );
}
