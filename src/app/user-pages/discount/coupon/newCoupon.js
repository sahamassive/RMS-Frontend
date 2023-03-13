import React, { useEffect, useState } from "react";
import "../style.css";
import {
  baseUrl,
  restaurant_id,
  axios,
  Swal,
  Form,
} from "../../constant/global";
import { check } from "../../constant/check";
import { useValidation } from "../../constant/useValidation"; 
const token = sessionStorage.getItem("token");

function NewCoupon() {
  const [couponCode, setCouponCode] = useState();
  const [discountAmount, setDiscountAmount] = useState();
  const [startingDate, setStartingDate] = useState();
  const [startingTime, setStartingTime] = useState();
  const [endingDate, setEndingDate] = useState();
  const [quantity, setQuantity] = useState();
  const [endingTime, setEndingTime] = useState();
  const [branchId, setBranchId] = useState();

  const { values, handleChange, errors, validate } = useValidation({
    coupon: "",
    number: "",
    user: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });

  const Insert = async (event) => {
    event.preventDefault();

    const isValid = validate();

    if (isValid) { 
    const formData = new FormData();

    formData.append("coupon_code", couponCode);
    formData.append("restaurant_id", restaurant_id);
    formData.append("branch_id", 1);
    formData.append("quantity", quantity);
    formData.append("discount_amount", discountAmount);
    formData.append("starting_date", startingDate);
    formData.append("starting_time", startingTime);
    formData.append("ending_date", endingDate);
    formData.append("ending_time", endingTime);
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    await axios
      .post(`${baseUrl}/api/coupon-insert`, formData)
      .then((response) => {
        Swal.fire({
          title: response.data.msg,
          icon: "success",
          confirmButtonText: "OK",
        });
      }); 
    }
  };

  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">Create New Coupon</h4>
              <a
                className="btn-style btn btn-info"
                href="/discount/coupon/all-coupon"
              >
                <i className="bi bi-card-list"></i> All Coupon
              </a>
            </div>
            <div className="col-sm-12 background">
              <div className="input_field two_part">
                <div className="wid">
                  <Form.Label className="label-style">
                    Coupon/Promo Code/Voucher
                  </Form.Label>
                  <Form.Control
                    onChange={(event) => {
                      setCouponCode(event.target.value);
                    }}
                    type="text"
                    name="coupon"
                    onBlur={handleChange}
                    placeholder="coupon/voucher/promo code..."
                  ></Form.Control>
                  {errors.coupon && (
                    <span className="error">{errors.coupon}</span>
                  )}
                </div>
                <div className="wid">
                  <Form.Label className="label-style">
                    Discount amount
                  </Form.Label>
                  <Form.Control
                    onChange={(event) => {
                      setDiscountAmount(event.target.value);
                    }}
                    name="number"
                    onBlur={handleChange}
                    type="number"
                    placeholder="Discount Amount"
                  ></Form.Control>
                  {errors.number && (
                    <span className="error">{errors.number}</span>
                  )}
                </div>
                <div className="wid">
                  <Form.Label className="label-style">
                    Coupon Users Quantity
                  </Form.Label>
                  <Form.Control
                    onChange={(event) => {
                      setQuantity(event.target.value);
                    }}
                    name="user"
                    onBlur={handleChange}
                    type="number"
                    placeholder="How many users can use this coupon"
                  ></Form.Control>
                  {errors.user && (
                    <span className="error">{errors.user}</span>
                  )}
                </div>
              </div>
              <div className="input_field two_part">
                <div className="wid">
                  <Form.Label className="label-style">Starting Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    onBlur={handleChange}
                    placeholder="coupon/voucher/promo code..."
                    onChange={(event) => {
                      setStartingDate(event.target.value);
                    }}
                  ></Form.Control>
                  {errors.startDate && (
                    <span className="error">{errors.startDate}</span>
                  )}
                </div>
                <div className="wid">
                  <Form.Label className="label-style">Starting time</Form.Label>
                  <Form.Control
                    type="time"
                    name="startTime"
                    onBlur={handleChange}
                    placeholder="coupon/voucher/promo code..."
                    onChange={(event) => {
                      setStartingTime(event.target.value);
                    }}
                  ></Form.Control>
                  {errors.startTime && (
                    <span className="error">{errors.startTime}</span>
                  )}
                </div>
              </div>
              <div className="input_field two_part">
                <div className="wid">
                  <Form.Label className="label-style">Ending Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    onBlur={handleChange}
                    placeholder="coupon/voucher/promo code..."
                    onChange={(event) => {
                      setEndingDate(event.target.value);
                    }}
                  ></Form.Control>
                  {errors.endDate && (
                    <span className="error">{errors.endDate}</span>
                  )}
                </div>
                <div className="wid">
                  <Form.Label className="label-style">Ending time</Form.Label>
                  <Form.Control
                    type="time"
                    name="endTime"
                    onBlur={handleChange}
                    placeholder="coupon/voucher/promo code..."
                    onChange={(event) => {
                      setEndingTime(event.target.value);
                    }}
                  ></Form.Control>
                  {errors.endTime && (
                    <span className="error">{errors.endTime}</span>
                  )}
                </div>
              </div>
              <button onClick={Insert} className="btn btn-warning top-space">
                <i className="bi bi-save-fill"></i>Insert
              </button>
              <br></br>
              <br></br>
              <br></br>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewCoupon;
