import React, { Component, useEffect, useState } from "react";
import "./style.css";
import $ from "jquery";
import "datatables.net";
import {
  baseUrl,
  restaurant_id,
  branch_id,
  axios,
  Swal,
  Form,
} from "../constant/global";
import ProgressBar from "react-bootstrap/ProgressBar";
const token = sessionStorage.getItem("token");
const loginType = sessionStorage.getItem("loginType");
const emp_id = sessionStorage.getItem("emp_id");

function AllCustomerOrder() {
  const [customersOrders, setCustomerOrders] = useState();
  const [id, setId] = useState();
  const emp_id = sessionStorage.getItem("emp_id");
  const [refresh, setRefresh] = useState(true);
  const [pendingShifts, setPendingShifts] = useState(0);

  if (loginType == "Customer") {
  } else {
    window.location.href = "/";
  }

  useEffect(() => {
    axios.get(`${baseUrl}/api/customer-order/${emp_id}`).then((response) => {
      setId(response.data.id);
      setCustomerOrders(response.data.data);
    });
    setRefresh(false);
  }, [refresh]);
  const progressBarStyle = {
    height: "30px",
    fontSize: "1em",
  };

  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">Dashboard</h4>
            </div>
            <div className="col-ms-12">
              {id ? (
                id.map((ids) => (
                  <div className="order_section background">
                    <p className="order-id2">
                      Order ID:{" "}
                      <button className="btn btn-outline-dark">
                        {ids.order_id}
                      </button>
                    </p>
                    <div className="table-responsive">
                      <table className="table-borderless wid">
                        <thead>
                          <tr className="order-id2 bg-coloring">
                            <th>Image</th>
                            <th style={{ width: "20rem" }}>Food Name</th>
                            <th>Status</th>
                            <th style={{ textAlign: "center" }}>Quantity</th>
                            <th>Price</th>
                            <th>Review</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customersOrders
                            ? customersOrders.map((data) =>
                                ids.order_id == data.order_id ? (
                                  <tr className="order-id2">
                                    <td>
                                      <img
                                        src={`${baseUrl}/foods/small/${data.image}`}
                                        width="80px"
                                        height="50px"
                                      />
                                    </td>
                                    <td>
                                      <span>{data.name}</span>
                                    </td>
                                    <td width={300}>
                                      {data.status == "pending" ? (
                                        <ProgressBar
                                          style={progressBarStyle}
                                          animated
                                          now={33}
                                          variant="success"
                                          label="Processing"
                                        />
                                      ) : null}
                                      {data.status == "running" ? (
                                        <ProgressBar
                                          style={progressBarStyle}
                                          animated
                                          variant="warning"
                                          now={66}
                                          label="Running"
                                        />
                                      ) : null}
                                      {data.status == "completed" ? (
                                        <ProgressBar
                                          style={progressBarStyle}
                                          animated
                                          variant="info"
                                          label="Completed"
                                          now={100}
                                        />
                                      ) : null}
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                      <span>{data.quantity}</span>
                                    </td>
                                    <td>
                                      <span>
                                        {data.price * data.quantity}(Tk.)
                                      </span>
                                    </td>
                                    <td>
                                      {" "}
                                      <a
                                        className="btn btn-danger"
                                        href={`/catalogue/food-review/${data.item_code}`}
                                      >
                                        <i className="bi bi-pencil-square"></i>
                                        Review
                                      </a>
                                    </td>
                                  </tr>
                                ) : null
                              )
                            : null}
                        </tbody>
                      </table>
                      <table className="tr-section-right">
                        <tr>
                          <th>vat</th>
                          <td>
                            <span>{ids.vat} (Tk.)</span>
                          </td>
                        </tr>
                        <tr>
                          <th>discount</th>
                          <td>
                            <span>{ids.discount ? ids.discount : 0} (Tk.)</span>
                          </td>
                        </tr>
                        <tr>
                          <th>Grand Total</th>
                          <td>
                            <span>{ids.grand_price} (Tk.)</span>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="background order-id">No Order found.</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllCustomerOrder;
