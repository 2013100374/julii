"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSection } from "./_hooks/useSection";
import useUtility from "@/app/_hooks/useUtility";
import { Navigation } from "swiper/modules";
import Pagination from "../Pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { request } from "@/lib/helpers";
import ENDPOINTS from "@/lib/endpoints";
import CourseCard from "../CourseCard";
import SliderCourseSkeleton from "../_skeletons/SliderCourseSkeleton";

export const TopCourses = ({ section }) => {
    const { content } = useSection(section);
    const [topCourses, setTopCourses] = useState([]);
    const { trans } = useUtility();
    const [loading, setLoading] = useState(false);
    
    // Unique ID for each Swiper instance
    const swiperRef = useRef(null);
    const swiperId = `top-courses-swiper-${Math.random().toString(36).substr(2, 9)}`;
  
    useEffect(() => {
      async function fetchTopCourses() {
        setLoading(true);
        try {
          const data = await request.get(ENDPOINTS.TOP_COURSES);
          setTopCourses(data?.data?.data?.top_selling_courses);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
        setLoading(false);
      }
      fetchTopCourses();
    }, []);
  
    return (
      <section className="top-courses py-50">
        <div className="container">
          <div className="slider-top gap-4">
            <div className="section-heading style-left">
              <h2 className="section-heading__title">
                {trans(content?.data_values?.heading)}
              </h2>
              <p className="section-heading__desc">
                {trans(content?.data_values?.subheading)}
              </p>
            </div>
            <div className="swipe-btn-wrapper">
              <div className={`swiper-button-prev ${swiperId}-prev`}></div>
              <div className={`swiper-button-next ${swiperId}-next`}></div>
            </div>
          </div>
          {loading ? (
            <div className="row">
              <SliderCourseSkeleton countCourse={4} />
            </div>
          ) : (
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Pagination]}
              navigation={{
                nextEl: `.${swiperId}-next`,
                prevEl: `.${swiperId}-prev`,
              }}
              spaceBetween={20}
              breakpoints={{
                576: { slidesPerView: 2 },
                767: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1440: { slidesPerView: 4 },
              }}
            >
              {topCourses?.map?.((course, index) => (
                <SwiperSlide key={index}>
                  <CourseCard course={course} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>
    );
  };
  