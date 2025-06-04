import DepositCalculation from "./DepositCalculation";
import { Field, Form, Formik } from "formik";
import SubmitBtn from "@/app/_partials/SubmitBtn";
import useDeposit from "../_hooks/useDeposit";
import useUtility from "@/app/_hooks/useUtility";
import { useEffect, useState } from "react";
import { getUser, notifyToast, request } from "@/lib/helpers";
import ENDPOINTS from "@/lib/endpoints";
import toast from "react-hot-toast";
import DepositInput from "./DepositInput";
import Skeleton from "react-loading-skeleton";

export default function DepositForm({
    depositLimit,
    amount,
    putAmount,
    processingChargeInfo,
    processingCharge,
    payable,
    selectDepositMethod,
    afterConvert,
    course,
    isLoading

}) {
    const { initialValues, handleSubmit, isSubmitting } = useDeposit();
    const { showAmount, trans } = useUtility();

    const [couponCode, setCouponCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [price, setPrice] = useState(0);
    const [useCoupon, setUseCoupon] = useState(false);
    const [depositAmount, setDepositAmount] = useState(0);


    const user = getUser();

    useEffect(() => {
        if (course) {
            let coursePrice = course?.discount_price > 0 ? course?.price - course?.discount_price : course?.price;
            setPrice(coursePrice)
            putAmount(coursePrice);
        }
    }, [course, putAmount]);


    useEffect(() => {
        if (course) {
            const afterDiscount = (price - discountPrice) || 0;
            putAmount(afterDiscount > 0 ? afterDiscount : 0);
        }
    }, [discountPrice, course, putAmount, price]);


    const changeAmount = (e) => {
        setDepositAmount(e.target.value);
    }


    useEffect(() => {
        if (!course) {
            putAmount(depositAmount);
        }
    }, [depositAmount, course, putAmount]);


    const applyCoupon = async (coupon_code, course_id, event = null) => {
        if (event) event.preventDefault();

        if (!course) return;

        if (!user) {
            toast.error('Please login to apply coupon');
            return;
        }

        if (!coupon_code) {
            toast.error('Please enter a coupon code');
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("coupon_code", coupon_code);
            formData.append("course_id", course_id);

            const response = await request.post(ENDPOINTS.APPLY_COUPON, formData);
            if (response.data?.status === 'error') {
                notifyToast(response.data);
                setUseCoupon(false);
                return;
            }
            const discountAmount = response?.data?.data?.amount || 0;

            setUseCoupon(true);

            setDiscountPrice(discountAmount);
        } catch (error) {
            console.error("Error applying coupon:", error);
        } finally {
            setLoading(false);

        }
    };

    const clearCoupon = () => {
        setDiscountPrice(0);
        setCouponCode('');
        setUseCoupon(false);
    };


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm }, amount, course, selectDepositMethod, couponCode)}
        >
            {() => (
                <Form>

                    {
                        course ? (
                            <div className="payment-system-list">
                                <div className="deposit-info">
                                    <div className="deposit-info__title">
                                        <h5>{trans('Price')}</h5>
                                    </div>
                                    <div className="deposit-info__input">
                                        <h5><span className="gateway-limit">{showAmount(price)}</span></h5>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="input-group">
                                        <Field name="coupon_code" className="form--control" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Enter your coupon" />

                                        {!useCoupon ? (
                                            <SubmitBtn
                                                isSubmitting={loading}
                                                type="button"
                                                onClick={(e) => applyCoupon(couponCode, course?.id, e)}
                                                className="btn btn--base"
                                                title="Apply"
                                            />
                                        ) : (
                                            <SubmitBtn
                                                isSubmitting={loading}
                                                type="button"
                                                onClick={clearCoupon}
                                                title="Cancel"
                                                className="btn btn--danger"
                                            />
                                        )}
                                    </div>
                                </div>

                                {discountPrice > 0 && (
                                    <>
                                        <div className="deposit-info">
                                            <div className="deposit-info__title">
                                                <p className="text">{trans('Discount')}</p>
                                            </div>
                                            <div className="deposit-info__input">
                                                <p className="text"><span className="gateway-limit">(-) {showAmount(discountPrice)}</span></p>
                                            </div>
                                        </div>

                                        <div className="deposit-info">
                                            <div className="deposit-info__title">
                                                <p className="text">{trans('Subtotal')}</p>
                                            </div>
                                            <div className="deposit-info__input">
                                                <p className="text"><span className="gateway-limit">{showAmount(amount)}</span></p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) :
                            isLoading ? <Skeleton height={80} /> :
                                <DepositInput amount={depositAmount} putAmount={changeAmount} />
                    }


                    <hr />
                    <DepositCalculation
                        depositLimit={depositLimit}
                        processingChargeInfo={processingChargeInfo}
                        processingCharge={processingCharge}
                        payable={payable}
                        selectDepositMethod={selectDepositMethod}
                        afterConvert={afterConvert}
                        course={course}
                    />


                    <SubmitBtn isSubmitting={isSubmitting} title={course ? 'Purchase Now' : 'Deposit Now'} /> :



                </Form>
            )
            }
        </Formik >
    );
}
