"use client";

import useUtility from '@/app/_hooks/useUtility';
import { useSection } from '@/app/_partials/_sections/_hooks/useSection';
import Pagination from '@/app/_partials/Pagination';
import ENDPOINTS from '@/lib/endpoints';
import { frontendImage, request, showDateTime } from '@/lib/helpers';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import ResponsivePagination from 'react-responsive-pagination';
import BlogSkeleton from './BlogSkeleton';
import usePaginationParams from '@/app/_hooks/usePaginationParams';


export default function BlogCard() {

    const { content } = useSection('blog');
    const { trans } = useUtility();
    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);
    const { pageNumber, setPageNumber } = usePaginationParams();



    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        async function fetchBlogs() {
            setLoading(true)
            try {
                const data = await request.get(`${ENDPOINTS.BLOGS}?page=${pageNumber}`);
                setBlogs(data.data.data.blogs);

                setLoading(false)

            } catch (error) {
                setLoading(false)
                console.error("Error fetching blogs:", error)
            }
        }
        fetchBlogs()
    }, [pageNumber])

    return (
        <>
            <section className="blog py-50">
                <div className="container">
                    <div className="slider-top">
                        <div className="section-heading style-left section-heading-dark">
                            <h2 className="section-heading__title mb-0">{trans(content?.data_values?.heading)}</h2>
                        </div>
                        <div className="slider-controller">
                            <div className="blog-slider-progress" >
                                <div className="blog-progress-bar"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row gy-4">
                        {
                            loading ?
                                <BlogSkeleton count={blogs.data?.length ?? 8} /> :
                                blogs.data?.map((blog, index) => (
                                    <div className="col-xl-3 col-lg-4 col-sm-6" key={index}>
                                        <div className="blog-item" >
                                            <div className="blog-item__thumb">
                                                <Link href={`/blog-details/${blog?.slug}`} className="blog-item__thumb-link">
                                                    <Image src={frontendImage('thumb_' + blog?.data_values?.image, 'blog')} className="fit-image" alt="blog_image" />
                                                </Link>
                                            </div>
                                            <div className="blog-item__content">
                                                <div className="blog-item__date">
                                                    <span className="icon"><i className="far fa-clock"></i></span>
                                                    <span className="text">{showDateTime(blog?.created_at, 'DD MMM YYYY')}</span>
                                                </div>
                                                <h6 className="blog-item__title">
                                                    <Link href={`/blog-details/${blog?.slug}`} className="blog-item__title-link">{trans(blog?.data_values?.title)}</Link>
                                                </h6>
                                                <p className="blog-item__desc">
                                                    {trans(blog?.data_values?.preview_text)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            {
                                (<div className="Page navigation example mt-3">
                                    <Pagination loading={loading} pagination={blogs} />
                                </div>)
                            }
                    </div>
                </div>

            </section>


        </>
    )
}

