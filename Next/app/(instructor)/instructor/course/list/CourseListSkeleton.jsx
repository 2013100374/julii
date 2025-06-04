import useUtility from "@/app/_hooks/useUtility";
import React from "react";
import Skeleton from "react-loading-skeleton";

export default function CourseListSkeleton({ countCourse }) {
  const skeletonItems = Array.from({ length: countCourse });
  const { trans } = useUtility();

  return (
    <>
      {skeletonItems.map((_, index) => (
        <div className="col-12" key={index}>
          <div className="created-course">
            {/* Course Header */}
            <div className="created-course-header">
              <div className="flex-align gap-3 left">
                <Skeleton width={160} height={100} className="created-course-img" />
                <div className="created-course-details">
                  <Skeleton width={500} height={24} className="mb-2" />
                  <Skeleton width={600} height={20} className="mb-2" />
                  <Skeleton width={120} height={20} />
                  <div className="created-course-type mt-2">
                    <Skeleton width={100} height={20} />
                  </div>
                </div>
              </div>

              {/* Course Actions */}
              <div className="created-course-actions">
                <Skeleton width={36} height={36} circle />
                <Skeleton width={36} height={36} circle />
                <Skeleton width={36} height={36} circle />
              </div>
            </div>

            {/* Course Content */}
            <div className="created-course-content">
              <div className="created-course-info">
                <div className="icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="content">
                  <h6>{trans(`Total Students`)}</h6>
                  <Skeleton width={50} height={16} />
                </div>
              </div>
              <div className="created-course-info">
                <div className="icon">
                  <i className="fas fa-star"></i>
                </div>
                <div className="content">
                  <h6>{trans(`Average Rating`)}</h6>
                  <Skeleton width={40} height={16} />
                </div>
              </div>
              <div className="created-course-info">
                <div className="icon">
                  <i className="fas fa-dollar-sign"></i>
                </div>
                <div className="content">
                  <h6>{trans(`Total Earnings`)}</h6>
                  <Skeleton width={80} height={16} />
                </div>
              </div>
              <div className="created-course-info">
                <div className="icon">
                  <i className="fas fa-calendar"></i>
                </div>
                <div className="content">
                  <h6>{trans(`Published Date`)}</h6>
                  <Skeleton width={100} height={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
