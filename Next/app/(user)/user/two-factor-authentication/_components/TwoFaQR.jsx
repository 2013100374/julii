"use client";

import useUtility from "@/app/_hooks/useUtility";
import { FormGroup, FormLabel } from "@/app/_forms/FormsStore";
import Image from 'next/image';
import Skeleton from "react-loading-skeleton";

export default function TwoFaQR({ twoFaData, copyToClipboard }) {
    const { trans } = useUtility();

    return (
        <div className="col-md-6">
            <div className="card custom--card">
                <div className="card-header">
                    <h5 className="card-title">{trans('Add Your Account')}</h5>
                </div>

                <div className="card-body">
                    <h6 className="mb-3">
                        {trans('Use the QR code or setup key on your Google Authenticator app to add your account.')}
                    </h6>
                    {twoFaData?.qr_code_url ? (
                        <div className="mb-2 mx-auto text-center">
                            <Image
                                className="mx-auto"
                                src={twoFaData?.qr_code_url}
                                alt="QR"
                                width={200}
                                height={200}
                            />
                        </div>
                    ) : (
                        <div className="mb-2 mx-auto text-center">
                            <Skeleton width={200} height={200} />
                        </div>
                    )

                    }

                    <FormGroup>
                        <FormLabel label='Setup Key' />
                        <div className="input-group">
                            <input type="text" name="key" value={twoFaData?.secret || ''} className="form-control form--control" readOnly />
                            <button type="button" className="input-group-text" onClick={copyToClipboard}> <i className="las la-copy"></i> </button>
                        </div>
                    </FormGroup>

                    <label><i className="las la-info-circle"></i> {trans('Help')}</label>
                    <p>{trans('Google Authenticator is a multifactor app for mobile devices. It generates timed codes used during the 2-step verification process. To use Google Authenticator, install the Google Authenticator application on your mobile device.')} <a className="text--base" href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en" target="blank" rel="noopener noreferrer">{trans('Download')}</a></p>
                </div>
            </div>
        </div>
    )
}
