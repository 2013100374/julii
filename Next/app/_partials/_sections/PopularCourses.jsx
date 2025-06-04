import React, { useEffect, useRef, useState } from "react";
import { useSection } from "./_hooks/useSection";
import { frontendImage, request, strLimit } from "@/lib/helpers";
import ENDPOINTS from "@/lib/endpoints";
import useUtility from "@/app/_hooks/useUtility";
import Link from "next/link";
import CourseCard from "../CourseCard";
import { Image } from "react-bootstrap";
import SliderCourseSkeleton from "../_skeletons/SliderCourseSkeleton";
import Skeleton from "react-loading-skeleton";

export const PopularCourses = ({ section }) => {
  const { content } = useSection(section);

  const [popularCourses, setPopularCourses] = useState([]);
  const { trans } = useUtility();
  const [activeTab, setActiveTab] = useState(0);
  const tabBarRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPopularCourses() {
      setLoading(true);
      try {
        const data = await request.get(ENDPOINTS.POPULAR_COURSE);
        setPopularCourses(data.data.data.categories);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching categories:", error);
      }
    }
    fetchPopularCourses();
  }, []);

  useEffect(() => {
    const updateBar = () => {
      const activeNavItem = document.querySelector(".nav-link.active");
      if (activeNavItem && tabBarRef.current) {
        const { offsetWidth, offsetLeft } = activeNavItem;
        tabBarRef.current.style.width = `${offsetWidth}px`;
        tabBarRef.current.style.left = `${offsetLeft}px`;
      }
    };

    updateBar();
    window.addEventListener("resize", updateBar);
    return () => window.removeEventListener("resize", updateBar);
  }, [activeTab, popularCourses]);

  return (
    <section className="courses-section py-50">
      <div className="courses-section__overlay">
        <Image
          src={frontendImage(content?.data_values?.shape, "popular_courses")}
          alt="images"
        />
      </div>
      <div className="container">
        <div className="section-heading">
          <div className="section-heading__subheading">
            {trans(content?.data_values?.title)}
          </div>
          <h2 className="section-heading__title">
            {trans(content?.data_values?.heading)}
          </h2>
        </div>
        <div className="courses-tab">
          <div className="text-center">
            {loading ? (
              <div className="mb-3">
                <Skeleton height={50} />
              </div>
            ) : (
              <ul
                className="nav custom--tab nav-tabs"
                id="myTab"
                role="tablist"
              >
                <li className="tab__bar" ref={tabBarRef}></li>
                {popularCourses.map((category, index) => (
                  <li className="nav-item" key={index}>
                    <button
                      onClick={() => setActiveTab(index)}
                      className={`nav-link ${activeTab == index && "active"}`}
                      type="button"
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="tab-content">
            {loading ? (
              <div className="courses-wrapper row justify-content-center gy-4">
                <SliderCourseSkeleton countCourse={4} />
              </div>
            ) : (
              popularCourses.map((category, index) => (
                <div
                  key={index}
                  className={`tab-pane ${activeTab == index && "show active"}`}
                  id={`${category?.slug}`}
                >
                  <div className="courses-wrapper row justify-content-center gy-4">
                    {category?.courses?.map((course, index) => (
                      <div className="col-sm-6 col-lg-4 col-xl-3" key={index}>
                        <CourseCard course={course} />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="courses-btn text-center pt-50">
          <Link href="/courses" className="btn btn--warning btn--white-shadow">
            {trans(`Explore all courses`)}
          </Link>
        </div>
      </div>
    </section>
  );
};
