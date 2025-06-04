
import React from 'react'


import CoursePricing from '../../_components/CoursePricing';
import { getMetaTitle } from '@/lib/helpers';

export const metadata = getMetaTitle('Course Pricing');

export default async function Price(props) {
    const params = await props.params;
    const { slug } = params;

    return (
        <CoursePricing slug={slug} />
    );
}
