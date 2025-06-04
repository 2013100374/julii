"use client";

import { ErrorMessage, Form, Formik } from "formik";
import SubmitBtn from "@/app/_partials/SubmitBtn";
import { useState } from "react";
import useUtility from "@/app/_hooks/useUtility";
import { FormField, Select, FormLabel, FormGroup } from "@/app/_forms/FormsStore";
import Link from "next/link";
import useInstructorProfileHandler from "../_hooks/useInstructorProfileHandler";

export default function ProfileForm() {
    const { loading, initialValues, validationSchema, handleSubmit, countries } = useInstructorProfileHandler();
    const [mobileCode, setMobileCode] = useState(93); 
    const { trans } = useUtility();

    return (
        <section className="account py-50">
        <div className="container">
            <div className="account-form no-shadow">
                <div className="account-form__content">
                    <h4 className="account-form__title">{trans(`Profile Data`)}</h4>
                </div>

                    <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue, values }) => (
                            <Form>
                                <div className="row">
                                    <div className="col-md-12">
                                        <FormField name="username" required={true} label={trans('Username')} />
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <FormLabel name="country" label={trans('Country')} required={true} />
                                            <Select
                                                name="country"
                                                className="form-control form--control select2"
                                                required
                                                value={values.country} 
                                                onChange={(e) => {
                                                    const selectedCountry = countries[e.target.options.selectedIndex];
                                                    setFieldValue('country', selectedCountry.country);
                                                    setFieldValue('mobile_code', selectedCountry.dial_code);
                                                    setFieldValue('country_code', selectedCountry.country_code);
                                                    setMobileCode(selectedCountry.dial_code); 
                                                }}
                                            >
                                                {countries.map((country, key) => (
                                                    <option
                                                        key={key}
                                                        value={country.country}
                                                    >
                                                        {country.country}
                                                    </option>
                                                ))}
                                            </Select>
                                            <ErrorMessage name="country" />
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                        <FormField
                                            name="mobile"
                                            label={trans('Mobile')}
                                            type="tel"
                                            required={true}
                                            inputGroup={true}
                                            inputGroupText={mobileCode}
                                            inputGroupTextPosition="left"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <FormField name="address" label={trans('Address')} />
                                    </div>
                                    <div className="col-md-6">
                                        <FormField name="state" label={trans('State')} />
                                    </div>
                                    <div className="col-md-6">
                                        <FormField name="zip" label={trans('Zip Code')} />
                                    </div>
                                    <div className="col-md-6">
                                        <FormField name="city" label={trans('City')} />
                                    </div>
                                </div>
                         
                                    <SubmitBtn isSubmitting={loading} title="Submit" />
                      
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    );
}
