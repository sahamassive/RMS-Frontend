import React, { Component, useEffect, useState } from "react";

import StarRatingComponent from "react-star-rating-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

import "../style.css";
import $ from "jquery";
import "datatables.net";
import {
  baseUrl,
  restaurant_id,
  axios,
  Swal,
  Form,
} from "../../constant/global";
import PageTitle from "../../constant/title";
import { useParams } from "react-router-dom";

const token = sessionStorage.getItem("token");
const emp_id = sessionStorage.getItem("emp_id");

function Review() {
  const [rating, setRating] = useState(0);
  const [food, setFood] = useState();
  const [comment, setComment] = useState();

  const params = useParams();

  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios
      .get(`${baseUrl}/api/food-item/${params.id}`)

      .then((res) => {
        console.log(res.data);
        setFood(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);
  const onStarClick = (nextValue) => {
    if (nextValue === rating) {
      // Toggle off if the same star is clicked twice
      setRating(0);
    } else {
      setRating(nextValue);
    }
  };
  const submitReview = () => {
    if (rating > 0) {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

      axios
        .post(`${baseUrl}/api/submit-review`, {
          restaurant_id: restaurant_id,
          item_code: params.id,
          rating: rating,
          comment: comment,
          customer_id: emp_id,
        })

        .then((res) => {
          Swal.fire({
            title: res.data.msg,
            icon: "success",
            confirmButtonText: "OK",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        title: "Please Give Star",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="two_part">
              <div>
                {food ? (
                  <div>
                    <h4 className="card-title"> {food.name}</h4>

                    <img src={`${baseUrl}/foods/small/${food.image}`} />
                  </div>
                ) : null}
              </div>
              <div className="section-444 wid">
                <Form.Label className="label-style">Give Your Star</Form.Label>
                <br></br>
                <StarRatingComponent
                  name="rating"
                  value={rating}
                  onStarClick={onStarClick}
                  starCount={5}
                  starColor="#ffb400"
                  emptyStarColor="#ddd"
                  renderStarIcon={(index, value) => {
                    return (
                      <span>
                        {index <= value ? (
                          <FontAwesomeIcon icon={faStar} />
                        ) : (
                          <FontAwesomeIcon icon={faStar} className="far" />
                        )}
                      </span>
                    );
                  }}
                  renderStarIconHalf={() => {
                    return (
                      <span>
                        <FontAwesomeIcon icon={faStarHalf} />
                      </span>
                    );
                  }}
                  starDimension="180px" // Set the star size to 40px
                />
                <br></br>
                <div className="wid">
                  <Form.Label className="label-style">Comment</Form.Label>
                  <Form.Control
                    className="area"
                    as="textarea"
                    placeholder="Write Something..."
                    rows={6}
                    onChange={(event) => {
                      setComment(event.target.value);
                    }}
                  ></Form.Control>
                  <br></br>
                  <button className="btn btn-warning" onClick={submitReview}>
                    <i className="bi bi-save-fill"></i>Submit Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
