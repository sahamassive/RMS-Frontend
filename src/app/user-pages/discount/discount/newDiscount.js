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
const loginType = sessionStorage.getItem("loginType");

function NewDiscount() {
  const [foodName, setFoodName] = useState();
  const [discount, setDiscount] = useState();
  const [startingDate, setStartingDate] = useState();
  const [startingTime, setStartingTime] = useState();
  const [endingDate, setEndingDate] = useState();
  const [endingTime, setEndingTime] = useState();
  const [food, setFood] = useState();
  const [branchId, setBranchId] = useState();
  const token = sessionStorage.getItem("token");

  const { values, handleChange, errors, validate } = useValidation({
    food: "",
    number: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });

  useEffect(() => {
    axios
      .get(
        `${baseUrl}/api/quick-foods/${restaurant_id}/${
          branchId ? branchId : restaurant_id
        }`
      )
      .then((response) => {
        setFood(response.data);
        console.log(response.data);
      });
  }, []);

  const Insert = async (event) => {
    event.preventDefault();

    const isValid = validate();

    if (isValid) {
      const formData = new FormData();

      formData.append("food_id", foodName);
      formData.append("restaurant_id", restaurant_id);
      formData.append("branch_id", 1);
      formData.append("discount", discount);
      formData.append("starting_date", startingDate);
      formData.append("starting_time", startingTime);
      formData.append("ending_date", endingDate);
      formData.append("ending_time", endingTime);
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  
      await axios
        .post(`${baseUrl}/api/discount-insert`, formData)
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
              <h4 className="card-title">Create New Discount</h4>
              <a
                className="btn-style btn btn-info"
                href="/discount/all-discount"
              >
                <i className="bi bi-card-list"></i> All Discount
              </a>
            </div>
            <div className="col-sm-12 background">
              <div className="input_field two_part">
                <div className="wid">
                  <Form.Label className="label-style">Food name</Form.Label>
                  <select
                    name="food"
                    onBlur={handleChange}
                    onChange={(event) => {
                      setFoodName(event.target.value);
                    }}
                  >
                    <option value="">Select food...</option>
                    {food
                      ? food.map((data) => (
                          <option value={data.id}>{data.name}</option>
                        ))
                      : null}
                  </select>
                  {errors.food && (
                    <span className="error">{errors.food}</span>
                  )}
                </div>
                <div className="wid">
                  <Form.Label className="label-style">Discount(%)</Form.Label>
                  <Form.Control
                    type="number"
                    name="number"
                    onBlur={handleChange}
                    placeholder="%"
                    onChange={(event) => {
                      setDiscount(event.target.value);
                    }}
                  ></Form.Control>
                  {errors.number && (
                    <span className="error">{errors.number}</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewDiscount;
