import '@/public/js/card.min.js';
import { useEffect } from 'react';
import CourseDetailCard from './CourseDetailCard';
export default function Checkout({ data, deposit, course }) {
    useEffect(() => {
        new Card({
            form: '#payment-form',
            container: '.card-wrapper',
            formSelectors: {
                numberInput: 'input[name="cardNumber"]',
                expiryInput: 'input[name="cardExpiry"]',
                cvcInput: 'input[name="cardCVC"]',
                nameInput: 'input[name="name"]'
            }
        });
    }, []);

    return (
        <div className="row gy-3">
            <div className={`col-md-12 ${course && 'col-lg-8'}`}>

                <div className="dashboard-body">
                    <div className="card custom--card">
                        <div className="card-header">
                            <h5 className='mb-0'>Checkout</h5>
                        </div>
                        <div className="card-body">
                            <div className="card-wrapper mb-3"></div>
                            <form role="form" className="disableSubmission appPayment" id="payment-form">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label className="form-label">Name on Card</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control form--control" name="name" required autoFocus />
                                            <span className="input-group-text"><i className="las la-font"></i></span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Card Number</label>
                                        <div className="input-group">
                                            <input type="tel" className="form-control form--control" name="cardNumber" required autoFocus />
                                            <span className="input-group-text"><i className="las la-credit-card"></i></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col-md-6">
                                        <label className="form-label">Expiration Date</label>
                                        <input type="tel" className="form-control form--control" name="cardExpiry" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">CVC Code</label>
                                        <input type="tel" className="form-control form--control" name="cardCVC" required />
                                    </div>
                                </div>
                                <br />
                                <button className="btn btn--base w-100" type="submit">Submit</button>
                            </form>
                        </div>
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
    );
}
