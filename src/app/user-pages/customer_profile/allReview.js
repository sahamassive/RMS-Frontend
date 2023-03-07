import React, { Component, useEffect, useState } from "react";
import "./style.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";
import StarRatingComponent from "react-star-rating-component";
import profile from "../../../assets/images/profile/profile.jpg";
import countrydata from "./../Country/Countrydata.json";
const token = sessionStorage.getItem("token");
const loginType = sessionStorage.getItem("loginType");
const emp_id = sessionStorage.getItem("emp_id");

function AllReview() {
  const [review, setReview] = useState();
  if (loginType == "Customer") {
  } else {
    window.location.href = "/";
  }

  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios.get(`${baseUrl}/api/get-review/${emp_id}`).then((response) => {
      console.log(response.data);
      setReview(response.data);
    });
  }, []);

  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">All Brand</h4>
              <a
                className="btn-style btn btn-info"
                href="/catalogue/create-brand"
              >
                <i className="bi bi-plus-square"></i>New Brand
              </a>
            </div>
            <div className="table-responsive">
              {review ? (
                <table id="example" className="table table-striped table-style">
                  <thead>
                    <tr>
                      <th>Brand Name</th>
                      <th>logo</th>
                      <th>Rating</th>
                      <th>Review</th>
                    </tr>
                  </thead>
                  <tbody>
                    {review.map((data) => (
                      <tr>
                        <td>{data.name}</td>

                        <td>
                          <img
                            src={`${baseUrl}/foods/small/${data.image}`}
                            width="80px"
                            height="50px"
                          />
                        </td>
                        <td>
                          {" "}
                          <StarRatingComponent
                            name="rating"
                            value={data.rating}
                            starCount={5}
                            starColor="#ffb400"
                            emptyStarColor="#ddd"
                            editing={false}
                            readOnly={true}
                          />
                        </td>

                        <td>{data.comment.substring(0, 50)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
              <br></br>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllReview;
