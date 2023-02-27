import React, { Component, useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./style.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";
import { check } from "../constant/check";
function AllEmployee() {
  const [allData, setAllData] = useState("");
  const [admin, setAdmin] = useState("");
  const [waiter, setWaiter] = useState("");
  const [manager, setManager] = useState("");
  const [deliveryMan, setDeliveryMan] = useState("");
  const [cleaner, setCleaner] = useState("");
  const [chef, setChef] = useState("");

  useEffect(() => {
    axios.get(`${baseUrl}/api/get-all-employee`).then((response) => {
      setAdmin(response.data.admin);
      setWaiter(response.data.waiter);
      setManager(response.data.manager);
      setDeliveryMan(response.data.delivery_man);
      setCleaner(response.data.cleaner);
      setChef(response.data.chef);
    });
  }, [])

  const getEmployee = (filter) => {
    axios.get(`${baseUrl}/api/get-employee/${filter}`).then((response) => {
      setAllData(response.data);
      //console.log(allData);
    });
  };

  $.DataTable = require("datatables.net");
  $(document).ready(function () {
    $("#allEmployee").DataTable();
  });

  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">Employee List</h4>
              <a className="btn-style btn btn-info" href="/hr/add-employee">
                <i className="bi bi-plus-square"></i>New Registration
              </a>
            </div>
            <div className="btn_section btn_style">
              <button
                onClick={() => {
                  getEmployee("waiter");
                }}
                className="btn btn-primary gap"
              >
                <i className="bi bi-plus-square"></i>Waiter
              </button>
              <button
                onClick={() => {
                  getEmployee("chef");
                }}
                className="btn btn-info gap"
              >
                <i className="bi bi-person-bounding-box"></i>Chef
              </button>
              <button
                onClick={() => {
                  getEmployee("manager");
                }}
                className="btn btn-success gap"
              >
                <i className="bi bi-cash-stack"></i>Manager
              </button>
              <button
                onClick={() => {
                  getEmployee("delivery_men");
                }}
                className="btn btn-warning gap"
              >
                <i className="bi bi-person-workspace"></i>Delivery Men
              </button>
              <button
                onClick={() => {
                  getEmployee("cleaner");
                }}
                className="btn btn-light gap"
              >
                <i className="bi bi-person-workspace"></i>Cleaner
              </button>
            </div>
            <br></br>
            <div className="card-section">
              <div className="single-card">
                Waiters
                <br></br>
                <strong>
                  <i className="bi bi-people-fill"></i> {admin}
                </strong>
              </div>
              <div className="single-card">
                Chef
                <br></br>
                <strong>
                  <i className="bi bi-people-fill"></i> {chef}
                </strong>
              </div>
              <div className="single-card">
                Manager
                <br></br>
                <strong>
                  <i className="bi bi-people-fill"></i> {manager}
                </strong>
              </div>
              <div className="single-card">
                Delivery Man
                <br></br>
                <strong>
                  <i className="bi bi-people-fill"></i> {deliveryMan}
                </strong>
              </div>
              <div className="single-card">
                Cleaner
                <br></br>
                <strong>
                  <i className="bi bi-people-fill"></i> {cleaner}
                </strong>
              </div>
              <div className="single-card">
                Waiter
                <br></br>
                <strong>
                  <i className="bi bi-people-fill"></i> {waiter}
                </strong>
              </div>
            </div>
            <div className="table-responsive table-style">
              {allData ? (
                <table
                  id="allEmployee"
                  className="table table-striped table-style"
                >
                  <thead>
                    <tr>
                      <th> Name</th>
                      <th> Phone</th>
                      <th> Email </th>
                      <th> Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData.map((data) => (
                      <tr>
                        <td>{data.first_name}</td>
                        <td>{data.phone}</td>
                        <td>{data.email}</td>
                        <td>
                          <img
                            src={`${baseUrl}/employee/small/${data.image}`}
                            width="80px"
                            height="50px"
                          />
                        </td>
                        <td>
                          <a
                            className="btn btn-danger"
                            href={`/catalogue/edit-section/${data.id}`}
                          >
                            <i className="bi bi-pencil-square"></i>Edit
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllEmployee;
