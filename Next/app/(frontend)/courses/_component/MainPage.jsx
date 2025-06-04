
"use client"
import { customPageData } from '@/lib/helpers';
import React, { useEffect, useState } from 'react'
import PageContent from '@/app/_partials/PageContent';
import Courses from './Courses';


export default function MainPage({ slug }) {
    return (
        <>
            <section className="courses-filter my-50">
                <div className="container">
                    <div className="courses-filter__wrapper">
                        <Courses slug={slug} />
                    </div>
                </div>
            </section>
            <CustomPage />

        </>
    )
}

function CustomPage() {
    const [sections, setSections] = useState(null)

    useEffect(() => {
        (async () => {

            const page = await customPageData('courses');
            const sections = page?.data?.page?.secs;

            setSections(sections)
        })()
    }, [])


    return (<PageContent slug='courses' sections={sections} />)
}