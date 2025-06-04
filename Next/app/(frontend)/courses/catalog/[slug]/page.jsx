import React from 'react'
import MainPage from '../../_component/MainPage';

export default async function page(props) {
    const params = await props.params;
    const { slug } = params;
    
    return (
        <>
           <MainPage slug={slug}/>
        </>

    )
}
