import useUtility from "@/app/_hooks/useUtility";
import { getCourseImage } from "@/lib/helpers";
import React from "react";
import { Image } from "react-bootstrap";

export default function CourseDetailCard({ course, deposit }) {
  const { trans, showAmount, gs } = useUtility();

  return (
    <div className="custom--card card">
      <div className="card-header">
        <h5 className="card-title mb-0">{trans("Course Details")}</h5>
      </div>
      <div className="card-body">
        <div className="course-thumb-wrapper">
        <div className="course-thumb">
          <Image
            className="fit-image"
            src={getCourseImage(course?.image_path, course?.image)}
            alt="course-image"
          />
        </div>
        <h6>
          {trans("Title")}: {course?.title}
        </h6>
        </div>

        <ul className="course-payment-details">
          <li>
            <span className="title">{trans("Price")}</span>
            <span className="divide">:</span>
            <span className="value">
              {showAmount(course?.price, false)} {gs("cur_text")}
            </span>
          </li>
          {course?.discount_price > 0 || deposit?.course_purchase?.coupon_id ? (
            <>
              <li>
                <span className="title">{trans("Discount")}</span>
                <span className="divide">:</span>
                <span className="value">
                  {showAmount(course?.discount_price, false)} {gs("cur_text")}
                </span>
              </li>
              <li>
                <span className="title">{trans("After Discount")}</span>
                <span className="divide">:</span>
                <span className="value">
                  {showAmount(deposit?.amount, false)} {gs("cur_text")}
                </span>
              </li>
            </>
          ) : (
            ""
          )}
          <li>
            <span className="title">{trans("Charge")}</span>
            <span className="divide">:</span>
            <span className="value">
              {showAmount(deposit?.charge, false)} {gs("cur_text")}
            </span>
          </li>

          {gs("cur_text") != deposit.method_currency && (
            <li>
              <span className="title">{trans("Conversion Rate")}</span>
              <span className="divide">:</span>
              <span className="value">
                1 {gs("cur_text")} = {showAmount(deposit?.rate, false)}{" "}
                {deposit && deposit.method_currency}
              </span>
            </li>
          )}
          <li>
            <span className="title">{trans("Payable Amount")}</span>
            <span className="divide">:</span>
            <span className="value">
              {showAmount(deposit?.final_amount, false)}{" "}
              {deposit && deposit.method_currency}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
