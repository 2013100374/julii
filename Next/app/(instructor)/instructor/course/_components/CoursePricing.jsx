"use client";
import useUtility from '@/app/_hooks/useUtility';
import SubmitBtn from '@/app/_partials/SubmitBtn';
import { Field, Form, Formik } from 'formik';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import useContentHandler from '../_hooks/useContentHandler';

import FormField from '@/app/_forms/FormField';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from 'date-fns';

export default function CoursePricing({ slug }) {
    const { trans, gs, showAmount } = useUtility();
    const { data: courseData } = useSelector((state) => state?.course);

    const [discountType, setDiscountType] = useState('');
    const [finalPrice, setFinalPrice] = useState(0); // State to store the discounted price
    const { initialPricingValues, priceValidationSchema, handlePricingSubmit, loading } = useContentHandler(slug);

    const [startDate, setStartDate] = useState(courseData?.duration ?? new Date());
    const formikRef = useRef(null);
  
    useEffect(() => {
        if (courseData && formikRef.current) {
            setStartDate(courseData?.duration ?? new Date());
            const price = parseFloat(courseData?.price).toFixed(2) ?? '';
            const discount = parseFloat(courseData?.discount).toFixed(2) ?? '';
            formikRef.current.setFieldValue('price', price);
            formikRef.current.setFieldValue('discount', discount);
            formikRef.current.setFieldValue('duration', courseData?.duration ?? '');
            formikRef.current.setFieldValue('discount_type', courseData?.discount_type?.toString() ?? '');
            setDiscountType(courseData?.discount_type?.toString() ?? '');
            calculateDiscount(price, discount, courseData?.discount_type);
            setFinalPrice(courseData?.price - courseData?.discount_price)
        }
    }, [courseData]);


    const calculateDiscount = (price, discount, type) => {
        let discountedPrice = parseFloat(price);
        if (type === '1' && discount) {
            discountedPrice = discountedPrice - (discountedPrice * discount / 100);
        } else if (type === '2' && discount) {
            discountedPrice = discountedPrice - discount;
        }

        setFinalPrice(discountedPrice.toFixed(2)); 
    };

    return (
        <div className="upload-course-body">
            <div className="course-pricing">
                <div className="upload-content">
                    <h5 className="upload-content-title">{trans('Course Pricing')}</h5>

                    <div className="upload-content-block">
                        <h6 className="upload-content-block-title">
                           {trans(`Set a price for your course`)}
                        </h6>
                        <p className="upload-content-block-text">
                            {trans(`Set the price tier for your course based on the value and content it offers. Please note that courses with practice tests cannot be offered for free, as they require additional resources. Ensure your course price reflects the materials and features included.`)}
                        </p>

                        <Formik
                            innerRef={formikRef}
                            initialValues={initialPricingValues}
                            validationSchema={priceValidationSchema}
                            onSubmit={handlePricingSubmit}
                        >
                            {({ setFieldValue, values }) => (
                                <div className="upload-content-form mt-4">
                                    <Form>
                                        <div className="form-group">
                                            <label htmlFor="course-price" className="form--label">
                                                {trans('Regular Price')}
                                            </label>
                                            <FormField
                                                name="price"
                                                type="number"
                                                label="Price"
                                                inputGroup={true}
                                                hideLabel={true}
                                                inputGroupTextPosition="right"
                                                inputGroupText={gs('cur_text')}
                                                required={true}
                                                onChange={(e) => {
                                                    setFieldValue('price', e.target.value);
                                                    calculateDiscount(e.target.value, values.discount, discountType);
                                                }}
                                            />
                                        </div>
                                        
                                        <div className="form-group">
                                            <label htmlFor="course-discount-type" className="form--label">
                                                {trans('Discount Type')}
                                            </label>
                                            <Field
                                                as="select"
                                                name="discount_type"
                                                onChange={(e) => {
                                                    setFieldValue('discount_type', e.target.value);
                                                    setDiscountType(e.target.value);
                                                    calculateDiscount(values.price, values.discount, e.target.value);
                                                }}
                                                className="form--control"
                                            >
                                                <option value="">{trans('Select Discount Type')}</option>
                                                <option value="1">{trans('Percent')}</option>
                                                <option value="2">{trans('Fixed')}</option>
                                            </Field>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="course-discount" className="form--label">
                                                {trans('Discount Price')}
                                            </label>
                                            <FormField
                                                name="discount"
                                                type="number"
                                                label="discount"
                                                inputGroup={true}
                                                hideLabel={true}
                                                inputGroupTextPosition="right"
                                                inputGroupText={discountType === "2" ? gs('cur_text') : '%'}
                                                onChange={(e) => {
                                                    setFieldValue('discount', e.target.value);
                                                    calculateDiscount(values.price, e.target.value, discountType);
                                                }}
                                         
                                            />
                                            <span> {trans('After Discount')}: {showAmount(finalPrice)}</span>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label htmlFor="course-discount-duration" className="form--label">
                                                {trans('Discount Duration')}
                                            </label>
                                            <DatePicker
                                                name="duration"
                                                dateFormat="MM/dd/yyyy"
                                                className="form--control w-100"
                                                selected={startDate}
                                                minDate={subDays(new Date(), 0)}
                                                onChange={(date) => {
                                                    setStartDate(date);
                                                    setFieldValue('duration', date.toISOString());
                                                }}
                                            />
                                        </div>

                                        <div className="form-group text-end">
                                            <SubmitBtn isSubmitting={loading} type="submit" className="btn btn--base" title="Save" />
                                        </div>
                                    </Form>
                                </div>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}
