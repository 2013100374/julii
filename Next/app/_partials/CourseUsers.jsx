'use client'
import { getProfileImage } from '@/lib/helpers'
import React from 'react'
import { Image } from 'react-bootstrap'

export default function CourseUsers({users}) {
    
    return (
        <ul className="course-learners__group">
            {
                users?.map( (user, index)=> (
                    <li key={index} className="course-learners__item ">
                        <Image className="fit-image" src={getProfileImage(user?.profile_path, user?.profile_image)} alt="student" />
                    </li>
                ))
            }
    
        </ul>
    )
}
