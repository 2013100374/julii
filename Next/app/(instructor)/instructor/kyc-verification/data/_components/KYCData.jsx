"use client";
import useKYCDetails from "../_hooks/useKYCDetails";
import useUtility from "@/app/_hooks/useUtility";

export default function KYCData() {
    const { kycData, downloadFile } = useKYCDetails();
    const { trans } = useUtility();
    return (
        <>
            <div className="col-lg-12">
                <div className="card custom--card">
                    <div className="card-header">
                        <h5 className="card-title">{trans('KYC Documents')}</h5>
                    </div>
                    <div className="card-body">
                        {kycData ? (
                            Object.entries(kycData?.kyc_data ?? {}).length > 0 ? (
                                <ul className="list-group">
                                    {Object.entries(kycData?.kyc_data ?? {}).map(([key, val]) => 
                                        val?.value && (
                                            <li key={key} className="list-group-item d-flex justify-content-between align-items-center">
                                                {trans(val.name)}
                                                <span>
                                                    {val.type === 'checkbox' ? 
                                                        val.value.join(', ') : 
                                                        val.type === 'file' ? 
                                                            <a href='#' onClick={() => downloadFile(val.value)}><i className="la la-file"></i> {trans('Attachment')} </a> : 
                                                            <p>{val.value}</p>
                                                    }
                                                </span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            ) : (
                                <div className="text-center">
                                    <p>{trans('No data found')}</p>
                                </div>
                            )
                        ) : (
                            <div className="text-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
