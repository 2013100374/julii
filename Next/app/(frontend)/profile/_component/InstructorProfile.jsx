"use client";
import useUtility from "@/app/_hooks/useUtility";
import Rating from "@/app/_partials/Rating";
import { getProfileImage } from "@/lib/helpers";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import InstructorCourses from "./InstructorCourses";
import ProfileSkeleton from "./ProfileSkeleton";
import webIcon from "@/public/images/icon/web.png";
import facebookIcon from "@/public/images/icon/facebook.png";
import instagramIcon from "@/public/images/icon/instagram.png";
import linkedinIcon from "@/public/images/icon/linkedin.png";

export default function InstructorProfile({ data }) {
  const [instructorData, setInstructorData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { trans } = useUtility();

  useEffect(() => {
    setLoading(true);
    setInstructorData(data)
    setTimeout(() => {
      setLoading(false);
    }, 500)
  }, [data]);

  return (
    <>
      {loading ? (
        <ProfileSkeleton />
      ) : (
        <>
          <section className="instructor">
            <div className="instructor-top-wrapper">
              <div className="container">
                <div className="row">
                  <div className="col-lg-7">
                    <div className="instructor-top">
                      <h4 className="instructor-name">
                        {instructorData?.instructor?.firstname +
                          " " +
                          instructorData?.instructor?.lastname}
                      </h4>
                      <div className="flex-align gap-3">
                        <div className="rating">
                          <div className="rating__wrapper">
                            <Rating rating={instructorData?.avg_rating} />
                            <div className="rating__count">
                              <span className="rating__average">
                                {instructorData?.avg_rating} /
                              </span>
                              <span className="rating__total">{`( ${instructorData?.reviews} reviews)`}</span>
                            </div>
                          </div>
                        </div>
                        <div className="view-details">
                          <span className="view-details__icon">
                            <i className="fas fa-user-friends"></i>
                          </span>
                          <p className="view-details__count">
                            {instructorData?.total_enrolled_users}
                          </p>
                          <p className="view-details__title">
                            {trans(`Students`)}
                          </p>
                        </div>
                        <div className="view-details">
                          <span className="view-details__icon text--danger">
                            <i className="fas fa-play-circle"></i>
                          </span>
                          <p className="view-details__count">
                            {instructorData?.total_courses}
                          </p>
                          <p className="view-details__title">
                            {trans(`Courses`)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-50">
              <div className="container">
                <div className="row gy-4 flex-lg-row-reverse">
                  <div className="col-lg-5">
                    <div className="instructor-info__about">
                      <div className="thumb">
                        <Image
                          src={getProfileImage(
                            instructorData?.instructor?.profile_path,
                            instructorData?.instructor?.image
                          )}
                          alt="image"
                        />
                      </div>

                      <div className="social-share">
                        <ul className="social-share__list">
                          {
                            instructorData?.instructor?.account?.website_url ?
                              <li className="social-share__item">
                                <Link
                                  href={`${instructorData?.instructor?.account?.website_url}`}
                                  target="_blank"
                                  className="social-share__link"
                                >
                                   <Image src={webIcon?.src} alt="Website" />
                                </Link>
                              </li> : ''
                          }
                          {
                            instructorData?.instructor?.account?.facebook_url ?
                              <li className="social-share__item">
                                <Link
                                  href={`${instructorData?.instructor?.account?.facebook_url}`}
                                  target="_blank"
                                  className="social-share__link"
                                >
                                  <Image src={facebookIcon?.src} alt="facebook" />
                                </Link>
                              </li> : ''
                          }
                          {
                            instructorData?.instructor?.account?.linkedin_url ?
                              <li className="social-share__item">
                                <Link
                                  href={`${instructorData?.instructor?.account?.linkedin_url}`}
                                  target="_blank"
                                  className="social-share__link"
                                >
                                  <Image src={linkedinIcon?.src} alt="linkedin" />
                                </Link>
                              </li>
                              : ''
                          }
                          {
                            instructorData?.instructor?.account?.instagram_url ?
                              <li className="social-share__item">
                                <Link
                                  href={`${instructorData?.instructor?.account?.instagram_url}`}
                                  target="_blank"
                                  className="social-share__link"
                                >
                                  <Image src={instagramIcon?.src} alt="instagram" />
                                </Link>
                              </li> : ''
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="instructor-info">
                      <div className="instructor-content">
                        <h6 className="instructor-content__title">
                          {instructorData?.instructor?.designation}
                        </h6>
                        <div className="instructor-content__desc">
                          <p className="text">{instructorData?.instructor?.biography}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <InstructorCourses data={instructorData} loading={loading} />
    </>
  );
}
