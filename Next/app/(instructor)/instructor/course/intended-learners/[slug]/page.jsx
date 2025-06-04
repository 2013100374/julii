
import React from 'react'


import IntendedLearners from '../../_components/IntendedLearners';
import { getMetaTitle } from '@/lib/helpers';

  
export const metadata = getMetaTitle('Intended Learners');

export default async function IntendedLearner(props) {
    const params = await props.params;
    const { slug } = params;

    return (
        <IntendedLearners slug={slug} />
    );
}
