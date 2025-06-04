import CourseDetailCard from "./CourseDetailCard";

export default function NMI({ data, deposit, course }) {

    return (
        <>
            <div className="row  gy-3">
                <div className={`col-md-12 ${course && 'col-lg-8'}`}>
                    <div className="card custom--card">
                        <div className="card-header">
                            <h5 className='mb-0'>NMI</h5>
                        </div>
                        <div className="card-body">
                            <form role="form" method="POST" action={data?.url}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label className="form-label">Card Number</label>
                                        <div className="input-group">
                                            <input type="tel" className="form-control form--control" name="billing-cc-number" autocomplete="off" required autofocus />
                                            <span className="input-group-text"><i className="las la-credit-card"></i></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col-md-6">
                                        <label className="form-label">Expiration Date</label>
                                        <input type="tel" className="form-control form--control" name="billing-cc-exp" placeholder="e.g. MM/YY" autocomplete="off" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">CVC Code</label>
                                        <input type="tel" className="form-control form--control" name="billing-cc-cvv" autocomplete="off" required />
                                    </div>
                                </div>
                                <br />
                                <button className="btn btn--base w-100" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                {
                    course &&
                    <div className="col-md-12 col-lg-4">
                        <CourseDetailCard course={course} deposit={deposit} />
                    </div>
                }
            </div>
        </>
    )
}
