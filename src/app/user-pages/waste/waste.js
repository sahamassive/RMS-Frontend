import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./style.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";
import { check } from "../constant/check";

import Modal from "@mui/material/Modal";
import { Redirect } from "react-router-dom";
const token = sessionStorage.getItem("token");
const loginType = sessionStorage.getItem("loginType");

function Waste() {
  const [allData, setAllData] = useState([]);
  const [modalStatus, setModalStatus] = React.useState(false);
  const [detailsData, setDetailsData] = useState();
  const [total, setTotal] = useState();
  const [amount, setAmount] = useState();

  const modalOpen = (employee_id) => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    axios
      .get(`${baseUrl}/api/details-wastes/${employee_id}`)
      .then((response) => {
        setDetailsData(response.data);
        let sum = 0;
        let totalAmount = 0;
        response.data.forEach((element) => {
          sum = sum + parseInt(element.price);
          totalAmount = totalAmount + parseInt(element.amount);
        });
        setTotal(sum);
        setAmount(totalAmount);
        //console.log(response.data);
      });
    setModalStatus(true);
  };

  const modalClose = () => setModalStatus(false);

  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    axios.get(`${baseUrl}/api/wastes`).then((response) => {
      setAllData(response.data);
    });
  }, []);

  $.DataTable = require("datatables.net");
  $(document).ready(function () {
    $("#waste").DataTable();
  });
  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">All wastage</h4>
              <a className="btn-style btn btn-info" href="/waste/new-waste">
                <i className="bi bi-plus-square"></i>New wasteage
              </a>
            </div>
            <div className="table-responsive table-style table-background">
              {allData ? (
                <table id="branchs" className="table table-striped table-style">
                  <thead>
                    <tr>
                      <th>SI.</th>
                      <th>Image</th>
                      <th>Food Name</th>
                      <th>Reason</th>
                      <th>Employee</th>
                      <th>Amount</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData.map((data, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={`${baseUrl}/foods/small/${data.image}`}
                            width="50rem"
                            alt={data.iamge}
                          ></img>
                        </td>
                        <td>{data.name}</td>
                        <td>{data.reason}</td>
                        <td>
                          <button
                            onClick={() => {
                              modalOpen(data.employee_id);
                            }}
                            className="btn btn-outline-dark"
                          >
                            {data.employee_id}
                          </button>
                        </td>
                        <td>{data.amount}</td>
                        <td>{data.price}</td>
                        <td>
                          <a
                            className="btn btn-warning"
                            href={`/waste/edit-waste/${data.id}`}
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
      <Modal
        open={modalStatus}
        onClose={modalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="emp-modal">
          {detailsData ? (
            <div>
              <div className="btn-section">
                <img
                  className="img-resize"
                  width="100rem"
                  src={`${baseUrl}/employee/medium/${detailsData[0].image}`}
                  alt={detailsData[0].iamge}
                ></img>
                <div className="emp-style">
                  <h3>
                    {detailsData[0].first_name} {detailsData[0].last_name}
                  </h3>
                  <p>{detailsData[0].employee_type}</p>
                </div>
                <div className="close-btn">
                  <a onClick={modalClose}>
                    <i className="bi bi-x-square"></i>
                  </a>
                </div>
              </div>

              <div>
                <div className="table-responsive table-background">
                  <table
                    id="branchs"
                    className="table table-striped table-hover"
                  >
                    <thead>
                      <tr>
                        <th>SI.</th>
                        <th>Image</th>
                        <th>Food Name</th>
                        <th>Date</th>
                        <th>Reason</th>
                        <th>Amount</th>
                        <th>Expected Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detailsData.map((data, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            <img
                              src={`${baseUrl}/foods/small/${data.food_image}`}
                              width="50rem"
                              alt={data.food_iamge}
                            ></img>
                          </td>
                          <td>{data.name}</td>
                          <td>
                            {new Date(data.created_at).toLocaleString("en-US", {
                              day: "2-digit",
                            })}
                            -
                            {new Date(data.created_at).toLocaleString("en-US", {
                              month: "long",
                            })}
                            -{new Date(data.created_at).getFullYear()}
                            <br></br>
                            {new Date(data.created_at).toLocaleTimeString(
                              "en-US"
                            )}
                          </td>
                          <td>{data.reason}</td>
                          <td>{data.amount}</td>
                          <td>{data.price}</td>
                          <td>
                            <a
                              className="btn btn-warning"
                              href={`/waste/edit-waste/${data.id}`}
                            >
                              <i className="bi bi-pencil-square"></i>Edit
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="table-style5 table-responsive">
                    <table className="table table-bordered table-hover">
                      <tbody>
                        <tr>
                          <td>Total Wasted Amount</td>
                          <td>{amount ? amount : null}</td>
                        </tr>
                        <tr>
                          <td>Total wasted Price</td>
                          <td>{total ? total : null}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Modal>
    </div>
  );
}
export default Waste;
