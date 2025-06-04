import React from 'react'
import { customPageData, getSEO, getTitle } from '@/lib/helpers';

import MainPage from './_component/MainPage';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const page = await customPageData('courses');

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

export default async function Courses() {

  return (
      <>
        <MainPage/>
      </>
  );
}
