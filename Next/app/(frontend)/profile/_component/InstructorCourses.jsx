"use client";

import CourseCard from "@/app/_partials/CourseCard";
import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import useUtility from "@/app/_hooks/useUtility";
import SliderSkeleton from "./SliderSkeleton";

export default function InstructorCourses({ data, loading }) {
  const { trans } = useUtility();
  const swiperId = `top-courses-swiper-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <>
      {loading ? (
        <div className="container">
          <div className="row mb-3">
            <SliderSkeleton countCourse="4" />
          </div>
        </div>
      ) : (
        <section className="instructor-courses py-50">
          <div className="container">
            <div className="slider-top gap-4">
              <div className="section-heading style-left">
                <h2 className="section-heading__title text-dark">
                  {trans("More Courses by")}{" "}
                  {data?.instructor?.firstname +
                    " " +
                    data?.instructor?.lastname}
                </h2>
              </div>
              <div className="swipe-btn-wrapper">
                <div className={`swiper-button-prev ${swiperId}-prev`}></div>
                <div className={`swiper-button-next ${swiperId}-next`}></div>
              </div>
            </div>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation={{
                nextEl: `.${swiperId}-next`,
                prevEl: `.${swiperId}-prev`,
              }}
              pagination={{
                type: "progressbar",
                el: ".short-slider-progress",
              }}
              loop={false}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              spaceBetween={20}
              breakpoints={{
                576: { slidesPerView: 1 },
                767: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1440: { slidesPerView: 4 },
              }}
            >
              <div className="instructor-slider">
                {data?.courses?.map?.((course, index) => (
                  <SwiperSlide key={index}>
                    <CourseCard course={course} />
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </div>
        </section>
      )}
    </>
  );
}
