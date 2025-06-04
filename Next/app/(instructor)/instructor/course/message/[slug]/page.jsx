
import React from 'react'

import CourseMessage from '../../_components/CourseMessage';
import { getMetaTitle } from '@/lib/helpers';



export const metadata = getMetaTitle('Course Message');
export default async function Message(props) {
    const params = await props.params;
    const { slug } = params;

    return (
        <CourseMessage slug={slug} />
    );
}
