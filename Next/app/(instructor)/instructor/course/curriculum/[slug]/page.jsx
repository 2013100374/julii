
import React from 'react'
import Curriculum from '../../_components/Curriculum';
import { getMetaTitle } from '@/lib/helpers';

  
export const metadata = getMetaTitle('Course Curriculum');


export default async function page(props) {
    const params = await props.params;
    const { slug } = params;

    return (
        <>
        <Curriculum slug={slug} />
        </>
    );
}
