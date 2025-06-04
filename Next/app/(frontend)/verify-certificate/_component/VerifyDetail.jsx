'use client';
import useUtility from '@/app/_hooks/useUtility'
import ENDPOINTS from '@/lib/endpoints';
import { request, showDateTime } from '@/lib/helpers';
import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton';
import successImage from '@/public/images/success.png';

export default function VerifyDetail({ secret }) {

  const { trans, gs } = useUtility();
  const [certificateData, setCertificateData] = useState();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    async function verifyCertificate() {
      setLoading(true);
      try {
        const data = await request.get(`${ENDPOINTS.VERIFY_CERTIFICATE}/${secret}`);

        setCertificateData(data?.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching certificate data:", error)
      }
    }
    verifyCertificate()
  }, [secret])
  return (
    <section className="instructor py-5">
      <div className="container">
        <div className="verify-success">
          <div className="flex-align gap-3 gap-sm-4 verify-success-top">
            <div className="verify-success-image">
              <Image src={successImage.src} alt='image'/>
            </div>
            <div className="verify-success-content">
              <h5 className="title">{trans('Verified Certificate')}</h5>
              <p className="desc">{trans('Your certificate has been successfully verified.')}</p>
            </div>
          </div>
          {
            loading ? <Skeleton height={70} count={6} /> :
              <div className="verify-success-list">
                <div className="verify-success-item">
                  <span className="title">{trans('The Certificate was issued by:')}</span>
                  <h6 className="value">{gs('site_name')}</h6>
                </div>
                <div className="verify-success-item">
                  <span className="title">{trans('Name of Recipient')}</span>
                  <h6 className="value">{certificateData?.user?.firstname + ' ' + certificateData?.user?.lastname}</h6>
                </div>
                <div className="verify-success-item">
                  <span className="title">{trans('Course Name')}</span>
                  <h6 className="value">{trans(certificateData?.course?.title)}</h6>
                </div>
                <div className="verify-success-item">
                  <span className="title">{trans('Course Instructor')}</span>
                  <h6 className="value">{certificateData?.course?.instructor?.firstname} {certificateData?.course?.instructor?.lastname}</h6>
                </div>
                <div className="verify-success-item">
                  <span className="title">{trans('Course Completion Date')}</span>
                  <h6 className="value">{showDateTime(certificateData?.course_complete
                    ?.created_at, 'DD MMM YYYY')}</h6>
                </div>
                <div className="verify-success-item">
                  <span className="title">{trans('Certificate Issue Date')}</span>
                  <h6 className="value">{showDateTime(certificateData?.get_certificate_user?.created_at, 'DD MMM YYYY')}</h6>
                </div>
                <div className="verify-success-item">
                  <span className="title">{trans('Certificate Id')}</span>
                  <h6 className="value">{secret}</h6>
                </div>
              </div>
          }
        </div>
      </div>
    </section>

  )
}
