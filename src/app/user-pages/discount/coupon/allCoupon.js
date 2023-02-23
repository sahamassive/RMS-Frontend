import $ from "jquery";
import "datatables.net";
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
const token = sessionStorage.getItem("token");

function AllCoupon() {
  const [allData, setAllData] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    axios.get(`${baseUrl}/api/coupons`).then((response) => {
      setAllData(response.data);
    });
  };
  const statusChange = (id) => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios.get(`${baseUrl}/api/coupon-status/${id}`).then((response) => {
      Swal.fire({
        title: response.data.msg,
        icon: "success",
        confirmButtonText: "OK",
      });
      getData();
    });
  };

  $.DataTable = require("datatables.net");
  $(document).ready(function () {
    $("#restaurant").DataTable();
  });
  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">All Discounts</h4>
              <a
                className="btn-style btn btn-info"
                href="/discount/coupon/new-coupon"
              >
                <i className="bi bi-plus-square"></i>New Coupon
              </a>
            </div>
            <div className="background table-responsive table-style table-background">
              {allData ? (
                <table
                  id="restaurant"
                  className="table table-striped table-style"
                >
                  <thead>
                    <tr>
                      <th>SI.</th>
                      <th>Coupon Code</th>
                      <th>Discount Amount</th>
                      <th>Quantity</th>
                      <th>Status</th>
                      <th>Start</th>
                      <th>End</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData.map((data, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{data.coupon_code}</td>
                        <td>$ {data.discount_amount}</td>
                        <td>{data.quantity}</td>
                        <td>
                          <button
                            className={
                              data.status ? "btn btn-success" : "btn btn-danger"
                            }
                            onClick={() => {
                              statusChange(data.id);
                            }}
                          >
                            {data.status ? "Active" : "Not Active"}
                          </button>
                        </td>
                        <td>
                          {new Date(data.starting_date).toLocaleString(
                            "en-US",
                            { day: "2-digit" }
                          )}
                          -
                          {new Date(data.starting_date).toLocaleString(
                            "en-US",
                            { month: "long" }
                          )}
                          -{new Date(data.starting_date).getFullYear()}
                          <br></br>
                          {data.starting_time.toLocaleString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })}
                        </td>
                        <td>
                          {new Date(data.ending_date).toLocaleString("en-US", {
                            day: "2-digit",
                          })}
                          -
                          {new Date(data.ending_date).toLocaleString("en-US", {
                            month: "long",
                          })}
                          -{new Date(data.ending_date).getFullYear()}
                          <br></br>
                          {data.ending_time.toLocaleString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })}
                        </td>
                        <td>
                          <a
                            className="btn btn-warning"
                            href={`/discount/coupon/edit-coupon/${data.id}`}
                          >
                            <i className="bi bi-pencil-square"></i>Edit
                          </a>
                        </td>
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

export default AllCoupon;
