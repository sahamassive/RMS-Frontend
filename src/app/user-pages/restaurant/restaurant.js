import React, { Component, useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./style.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";
import { check } from "../constant/check";

const token = sessionStorage.getItem("token");

function Restaurant() {
  const [allData, setAllData] = useState("");

  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    axios.get(`${baseUrl}/api/restaurants`).then((response) => {
      setAllData(response.data);
      console.log(allData);
    });
  }, []);

  const getData = () => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    axios.get(`${baseUrl}/api/restaurants`).then((response) => {
      setAllData(response.data);
    });
  };

  const statusChange = (id) => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    axios.get(`${baseUrl}/api/restaurant-status/${id}`).then((response) => {
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
              <h4 className="card-title">All Restaurant</h4>
              <a
                className="btn-style btn btn-info"
                href="/restaurant/new-restaurant"
              >
                <i className="bi bi-plus-square"></i>New Restaurant
              </a>
            </div>
            <div className="table-responsive table-style table-background">
              {allData ? (
                <table
                  id="restaurant"
                  className="table table-striped table-style"
                >
                  <thead>
                    <tr>
                      <th>SI.</th>
                      <th>Restaurant Name</th>
                      <th>Logo</th>
                      <th>Phone</th>
                      <th>Status</th>
                      <th>City</th>
                      <th>Outlate</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData.map((data) => (
                      <tr>
                        <td>{data.id}</td>
                        <td>{data.restaurant_name}</td>
                        <td>
                          <img
                            src={`${baseUrl}/restaurants/small/${data.logo}`}
                            width="50px"
                          />
                        </td>
                        <td>{data.phone}</td>
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
                        <td>{data.state}</td>
                        <td>
                          <a
                            className="btn btn-dark"
                            href={`/restaurant/branchs/${data.restaurant_id}`}
                          >
                            <i className="bi bi-bezier"></i>Branch
                          </a>
                        </td>
                        <td>
                          <a
                            className="btn btn-warning"
                            href={`/restaurant/edit-restaurant/${data.id}`}
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

export default Restaurant;
