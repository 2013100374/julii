
"use client"
import React from 'react'
import CourseBasic from './CourseBasic'
import useCourseHandler from '../_hooks/useCourseHandler';


export default function CreateForm() {
    const { handleSubmit, loading } = useCourseHandler();
    return (
        <>
            {<CourseBasic formSubmit={handleSubmit} load={loading} />}
        </>

    )
}
