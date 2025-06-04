"use client";

import { Field, Formik } from "formik";
import SubmitBtn from "@/app/_partials/SubmitBtn";
import useProfile from '../_hooks/useProfile';
import { FormField, FormGroup } from "@/app/_forms/FormsStore";
import useUtility from "@/app/_hooks/useUtility";
import { useState } from "react";
import { Image } from "react-bootstrap";
import { getProfileImage, getUser } from "@/lib/helpers";

export default function ProfileForm() {
    const { initialValues, validationSchema, handleSubmit, user } = useProfile();
    const { trans } = useUtility();

    const [previewImage, setPreviewImage] = useState("")

    const handleImageChange = (file) => {
        if (file) {
            const fileURL = URL.createObjectURL(file)
            setPreviewImage(fileURL)
        }
    }

    return (
        <>
            <h5>{trans(`Profile Setting`)}</h5>
            <div className="dashboard-main__wrapper">
                <div className="edit-account">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, handleSubmit, setFieldValue }) => (
                            <form onSubmit={handleSubmit} className="edit-account__form">
                                <div className="row">


                                    <div className="col-xl-12">
                                        <label htmlFor="course-image" className="form--label">
                                            {trans(`Profile image`)}
                                        </label>
                                        <div className="course-image-upload mb-2">
                                            <div className="course-image-upload__thumb">
                                                <Image
                                                    className="file-input-img fit-image"
                                                    src={previewImage || getProfileImage(user?.profile_path, user?.profile_image)}
                                                    alt="image"
                                                />
                                            </div>
                                            <div className="course-image-upload__content">
                                                <label className="course-image-upload__btn" htmlFor="course-image">
                                                    <span className="icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image-up">
                                                            <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21">
                                                            </path>
                                                            <path d="m14 19.5 3-3 3 3"></path>
                                                            <path d="M17 22v-5.5"></path>
                                                            <circle cx="9" cy="9" r="2">
                                                            </circle>
                                                        </svg>
                                                    </span>
                                                    <span className="text">{trans(`Upload Profile Image`)}</span>
                                                    <Field
                                                        accept="image/*"
                                                        name="image"
                                                        onChange={(e) => {
                                                            handleImageChange(e.target.files[0])
                                                            setFieldValue("profile_image", e.target.files[0])
                                                        }}
                                                        className="file-input"
                                                        type="file"
                                                        id="course-image"
                                                    />
                                                </label>

                                                <small className="form--note mt-3">
                                                    {trans(`For best results, use a square image with a`)}
                                                    <strong> 1:1</strong> {trans(`aspect ratio`)}.
                                                    {trans(`Supported formats`)}: .JPG, .JPEG, .PNG.
                                                </small>

                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-sm-6">
                                        <FormField
                                            name="firstname"
                                            label={trans('First Name')}
                                            placeholder="First Name"
                                            required
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <FormField
                                            name="lastname"
                                            label={trans('Last Name')}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <FormField
                                            name="email"
                                            label={trans('E-mail Address')}
                                            readOnly
                                            required
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <FormField
                                            name="mobile"
                                            label={trans('Mobile Number')}
                                            readOnly
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <FormField
                                            name="address"
                                            label={trans('Address')}
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <FormField
                                            name="state"
                                            label={trans('State')}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <FormField
                                            name="zip"
                                            label={trans('Zip Code')}
                                        />
                                    </div>
                                    <div className="col-sm-4">
                                        <FormField
                                            name="city"
                                            label={trans('City')}
                                        />
                                    </div>
                                    <div className="col-sm-4">
                                        <FormField
                                            name="country"
                                            label={trans('Country')}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form--label" htmlFor="biography">{trans('Biography')}</label>
                                            <Field as="textarea" className='form--control' id="biography" name="biography" ></Field>

                                        </div>
                                    </div>
                                </div>
                                <div className="edit-account__button">
                                    <SubmitBtn isSubmitting={isSubmitting} className="btn btn--base btn--shadow" title={trans('Submit')} />
                                </div>

                            </form>
                        )}
                    </Formik>
                </div>
            </div>

        </>
    )
}
