import useUtility from '@/app/_hooks/useUtility'
import Skeleton from '@/app/_partials/_skeletons/Skeleton'
import React from 'react'
import { Image } from 'react-bootstrap';
import skillImage from '@/public/images/icon/skill.png';
import watchImage from '@/public/images/icon/watch.png';
import certificateImage from '@/public/images/icon/certificate.png';
import badgeImage from '@/public/images/icon/badge.png';


export default function RequireSkeleton() {
    const {trans} = useUtility();
    let base = process?.env?.NEXT_PUBLIC_AUTH_PREFIX || "/";


    if (base !== "/") {
        base = base.replace(/\/$/, "");
    }

    const getImage = (type) => {
        return String(base + "/images/icon/" + type + ".png").replace('//', '/');
    };

  return (

    <section className="course-require">
    
    <div className="container">
        <div className="course-require__wrapper">
            <div className="course-require-item">
                <div className="course-require-item__icon">
                       <Image src={skillImage?.src} alt="sill" />
                </div>
                <div className="course-require-item__content">
                    <p className="course-require-item__heading">{trans('Skill level')}</p>
                    <Skeleton height={20} />
                </div>
            </div>
            <div className="course-require-item">
                <div className="course-require-item__icon">
                   <Image src={watchImage?.src} alt="watch" />
                </div>
                <div className="course-require-item__content">
                    <p className="course-require-item__heading">{trans(`Total complete`)}</p>
                    <Skeleton height={20} />
                </div>
            </div>
            <div className="course-require-item">
                <div className="course-require-item__icon">
                   <Image src={certificateImage?.src} alt="certificate" />
                </div>    
                <div className="course-require-item__content">
                    <p className="course-require-item__heading">{trans(`Certificate of completion`)}</p>
                    <Skeleton height={20} />
                </div>
            </div>
            <div className="course-require-item">
                <div className="course-require-item__icon">
                <Image src={badgeImage?.src} alt="badge" />
                </div>
                <div className="course-require-item__content">
                    <p className="course-require-item__heading">{trans(`Last updated`)}</p>
                  
                <Skeleton height={20} />

                </div>
            </div>
        </div>
    </div>
</section>
  )
}
