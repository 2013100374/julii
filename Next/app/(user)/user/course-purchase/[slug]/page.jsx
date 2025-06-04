import React from 'react'
import Purchase from '../Purchase';
import { getMetaTitle } from '@/lib/helpers';



export const metadata = getMetaTitle('Payment');

export default async function page(props) {

    
    const params = await props.params;
    const { slug } = params;
  

    return (
       <Purchase  slug={slug} />
    )
}
