import React, { Component, useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./style.css";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000";

function Restaurant() {
    const [allData, setAllData] = useState("");

    useEffect(() => {
      axios.get(`${baseUrl}/api/restaurants`).then((response) => {
        setAllData(response.data);
        console.log(allData);
      });
    }, []);
  
    const getData = () => {
      axios.get(`${baseUrl}/api/restaurants`).then((response) => {
        setAllData(response.data);
      });
    };
  
  
    const statusChange = (id) => {
      axios.get(`${baseUrl}/api/restaurant-status/${id}`).then((response) => {
        alert(response.data.msg);
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
                  <table id="restaurant" className="table table-striped table-style">
                    <thead>
                      <tr>
                        <th>SI.</th>
                        <th>Restaurant Name</th>
                        <th>Logo</th>
                        <th>Phone</th>
                        <th>E-mail</th>
                        <th>Status</th>
                        <th>City</th>
                        <th>Area</th>
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
                          <td>{data.email}</td>
                          <td>
                            <button
                              className={data.status ? "btn btn-success" : "btn btn-danger"}
                              onClick={() => {
                                statusChange(data.id);
                              }}
                            >
                              {data.status ? "Active" : "Not Active"}
                            </button></td>
                          <td>{data.city}</td>
                          <td>{data.area}</td>
                          <td>
                            <a
                              className="btn btn-warning"
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
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Restaurant;