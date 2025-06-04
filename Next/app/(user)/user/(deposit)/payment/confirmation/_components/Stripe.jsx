import FormField from '@/app/_forms/FormField';
import useUtility from '@/app/_hooks/useUtility';
import SubmitBtn from '@/app/_partials/SubmitBtn';
import ENDPOINTS from '@/lib/endpoints';
import '@/public/js/card.min.js';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import useCardPayment from '../_hooks/useCardPayment';;
import CourseDetailCard from './CourseDetailCard';

export default function Stripe({ data, deposit, course }) {
    const { trans } = useUtility();
    const { handleSubmit, loading } = useCardPayment(ENDPOINTS.IPN.stripe);


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


    const initialValues = {
        cardNumber: '',
        cardExpiry: '',
        cardCVC: '',
        name: '',
        is_web: 1,
        trx: data?.track
    };

    return (
        <div className="row gy-3">
            <div className={`col-md-12 ${course && 'col-lg-8'}`}>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <div className="card custom--card">
                        <div className="card-header">
                            <h5 className='mb-0'>{trans('Stripe')}</h5>
                        </div>
                        <div className="card-body">
                            <div className="card-wrapper mb-3"></div>

                            <Form className="disableSubmission appPayment" id="payment-form">

                                <div className="row">
                                    <div className="col-md-6">
                                        <FormField
                                            name="name"
                                            label={trans('Name on Card')}
                                            required
                                            inputGroup={true}
                                            inputGroupTextPosition="right"
                                            inputGroupText={<i className="las la-user"></i>}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <FormField
                                            name="cardNumber"
                                            label={trans('Card Number')}
                                            type="text"
                                            required
                                            inputGroup={true}
                                            inputGroupTextPosition="right"
                                            inputGroupText={<i className="las la-credit-card"></i>}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <FormField
                                            name="cardExpiry"
                                            label={trans('Expiration Date')}
                                            type="tel"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <FormField
                                            name="cardCVC"
                                            label={trans('CVC')}
                                            type="tel"
                                            required
                                        />
                                    </div>
                                </div>
                                <SubmitBtn isSubmitting={loading} title="Submit" />
                            </Form>
                        </div>
                    </div>
                </Formik>
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
