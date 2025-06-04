"use client";
import Input from "@/app/_forms/Input";
import useUtility from "@/app/_hooks/useUtility";
import { Form, Formik, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import useCourseFilter from "../_hooks/useCourseFilter";
import { useSelector } from "react-redux";

const AutoFetchCourses = ({ fetchCourses }) => {
  const { values } = useFormikContext();

  useEffect(() => {
    fetchCourses(values);
  }, [values, fetchCourses]);

  return null;
};

export default function Filter({
  slug,
  courses,
  showSidebar,
  toggleSidenav,
  setLoading,
}) {
  const { trans } = useUtility();
  const { fetchCourses, loading } = useCourseFilter(slug);
  const { data: filterData } = useSelector((state) => state?.filter);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);

  const handleCategoryChange = () => {
    setLoadingSubcategories(true);

    setTimeout(() => {
      setLoadingSubcategories(false);
    }, 500);
  };

  const [openSections, setOpenSections] = useState({
    categories: true,
    subcategory: true,
    level: true,
    rating: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const levelMapping = {
    Beginner: 1,
    Intermediate: 2,
    Advance: 3,
    All: 0,
  };

  const sortOptions = [
    { label: "Select One", value: "" },
    { label: "Most Popular", value: "popular" },
    { label: "Highest Rated", value: "rate" },
    { label: "Newest", value: "new" },
    { label: "Price High to Low", value: "high_to_low" },
    { label: "Price Low to High", value: "low_to_high" },
  ];

  useEffect(() => {
    if (loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [setLoading, loading]);

  const ratingOptions = [5, 4, 3, 2, 1];

  return (
    <Formik
      initialValues={{
        sort: [],
        categories: [],
        sub_categories: [],
        level: [],
        rating: [],
      }}
      onSubmit={fetchCourses}
    >
      {({ values, setFieldValue }) => (
        <>
          {/* Extracted AutoFetchCourses component to avoid useEffect inside Formik render prop */}
          <AutoFetchCourses fetchCourses={fetchCourses} />

          <Form>
            <div
              className={`courses-sidebar ${showSidebar ? "show-sidebar" : ""}`}
            >
              <div
                onClick={toggleSidenav}
                className="courses-sidebar-close d-lg-none"
              >
                <i className="las la-times"></i>
              </div>
              <div className="courses-sidebar__header">
                <h5 className="courses-sidebar__title">{trans(`Filters`)}</h5>
                <button
                  type="button"
                  className="courses-sidebar__clear"
                  onClick={() => {
                    setFieldValue("sort", []);
                    setFieldValue("categories", []);
                    setFieldValue("sub_categories", []);
                    setFieldValue("level", []);
                    setFieldValue("rating", []);
                  }}
                >
                  {trans(`Clear all`)}
                </button>
              </div>
              <p className="courses-count">
                {trans("Showing")} <span>{courses?.to}</span> {trans(`of`)}{" "}
                <span>{courses?.total}</span>
              </p>

              {/* Sort By Section */}
              <div className="filter-block">
                <h6 className="filter-block__title">{trans(`Sort by`)}</h6>
                <div className="filter-block__list">
                <select
                className="form-select form--control"
                value={values.sort[0] || ""}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  setFieldValue("sort", [selectedValue]);
                
                  if (selectedValue === "") {
                    setFieldValue("sort", []); 
                  }
                }} 
              >
                {sortOptions?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
                </div>
              </div>
              <div className="accordion sidebar--acordion">
                <div className="filter-block">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        aria-expanded={openSections.rating ? "true" : "false"}
                        onClick={() => toggleSection("rating")}
                      >
                        {trans(`Ratings`)}
                      </button>
                    </h2>
                    <div
                      className={`accordion-collapse ${
                        openSections.rating ? "show" : "collapse"
                      }`}
                    >
                      <div className="accordion-body">
                        <ul className="filter-block__list">
                          {ratingOptions.map((rating, index) => (
                            <li key={index} className="filter-block__item">
                              <div className="form--radio">
                                <Input
                                  className="form-check-input m-0"
                                  type="radio"
                                  id={`rating-${rating}`}
                                  checked={values.rating.includes(rating)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setFieldValue("rating", [rating]);
                                    }
                                  }}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`rating-${rating}`}
                                >
                                  <ul className="rating__list">
                                    {[...Array(rating)].map((_, i) => (
                                      <li key={i} className="rating__item">
                                        <span className="rating__icon">
                                          <i className="las la-star"></i>
                                        </span>
                                      </li>
                                    ))}
                                    <li className="ms-1 text-muted"><span>{rating != 5 ? rating + ' & star up' : '5 star'}</span></li>
                                  </ul>
                                </label>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Categories Filter */}
                <div className="filter-block">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        aria-expanded={
                          openSections.categories ? "true" : "false"
                        }
                        onClick={() => toggleSection("categories")}
                      >
                        {trans(`Categories`)}
                      </button>
                    </h2>
                    <div
                      className={`accordion-collapse ${
                        openSections.categories ? "show" : "collapse"
                      }`}
                    >
                      <div className="accordion-body">
                        {
                          !filterData?.categories ? <div className="subcategory-loader">
                          <span
                            className="spinner-border mx-auto d-block"
                            role="status"
                          ></span>
                        </div> :

                        <ul className="filter-block__list">
                          {filterData?.categories?.map((category) => (
                            <li
                              key={category.id}
                              className="filter-block__item"
                            >
                              <div className="form--check">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`cat-${category.id}`}
                                  checked={values.categories.includes(
                                    category.id
                                  )}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setFieldValue("categories", [
                                        ...values.categories,
                                        category.id,
                                      ]);
                                    } else {
                                      setFieldValue(
                                        "categories",
                                        values.categories.filter(
                                          (id) => id !== category.id
                                        )
                                      );

                                      const updatedSubcategories =
                                        values.sub_categories.filter(
                                          (subId) =>
                                            !filterData?.sub_categories.some(
                                              (sub) =>
                                                sub.id === subId &&
                                                sub.category_id === category.id
                                            )
                                        );
                                      setFieldValue(
                                        "sub_categories",
                                        updatedSubcategories
                                      );
                                    }
                                    handleCategoryChange();
                                  }}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`cat-${category.id}`}
                                >
                                  {category.name}
                                </label>
                              </div>
                            </li>
                          ))}
                        </ul>
                        }
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subcategories Filter */}
                <div className="filter-block">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        aria-expanded={
                          openSections.subcategory ? "true" : "false"
                        }
                        onClick={() => toggleSection("subcategory")}
                      >
                        {trans(`Subcategories`)}
                      </button>
                    </h2>
                    <div
                      className={`accordion-collapse ${
                        openSections.subcategory ? "show" : "collapse"
                      }`}
                    >
                      <div className="accordion-body">
                        {(loadingSubcategories ||  !filterData?.sub_categories) ?(
                          <div className="subcategory-loader">
                            <span
                              className="spinner-border mx-auto d-block"
                              role="status"
                            ></span>
                          </div>
                        ) : (
                          <ul className="filter-block__list">
                            {filterData?.sub_categories
                              ?.filter(
                                (subcategory) =>
                                  values.categories.length === 0 ||
                                  values.categories.includes(
                                    subcategory.category_id
                                  )
                              )
                              .map((subcategory) => (
                                <li
                                  key={subcategory.id}
                                  className="filter-block__item"
                                >
                                  <div className="form--check">
                                    <Input
                                      className="form-check-input"
                                      type="checkbox"
                                      id={`subCat-${subcategory.id}`}
                                      checked={values.sub_categories.includes(
                                        subcategory.id
                                      )}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setFieldValue("sub_categories", [
                                            ...values.sub_categories,
                                            subcategory.id,
                                          ]);
                                        } else {
                                          setFieldValue(
                                            "sub_categories",
                                            values.sub_categories.filter(
                                              (id) => id !== subcategory.id
                                            )
                                          );
                                        }
                                      }}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={`subCat-${subcategory.id}`}
                                    >
                                      {subcategory.name}
                                    </label>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Level Filter */}
                <div className="filter-block">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        aria-expanded={openSections.level ? "true" : "false"}
                        onClick={() => toggleSection("level")}
                      >
                        {trans(`Level`)}
                      </button>
                    </h2>
                    <div
                      className={`accordion-collapse ${
                        openSections.level ? "show" : "collapse"
                      }`}
                    >
                      <div className="accordion-body">
                        <ul className="filter-block__list">
                          {Object.keys(levelMapping).map((levelName) => {
                            const levelValue = levelMapping[levelName];
                            const count =
                              filterData?.[
                                `${levelName.toLowerCase()}_course_count`
                              ] || 0;

                            return (
                              <li
                                key={levelValue}
                                className="filter-block__item"
                              >
                                <div className="form--check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={levelName}
                                    checked={values.level.includes(levelValue)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setFieldValue("level", [
                                          ...values.level,
                                          levelValue,
                                        ]);
                                      } else {
                                        setFieldValue(
                                          "level",
                                          values.level.filter(
                                            (l) => l !== levelValue
                                          )
                                        );
                                      }
                                    }}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={levelName}
                                  >
                                    {trans(levelName)}
                                    {count > 0 && <span>({count})</span>}
                                  </label>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}
