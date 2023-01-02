import React, { Component, useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./style.css";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000";

function Restaurant() {
    const [allData, setAllData] = useState("");

    useEffect(() => {
      axios.get(`${baseUrl}/api/categories`).then((response) => {
        setAllData(response.data);
        console.log(allData);
      });
    }, []);
  
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
              <div className="table-responsive table-style">
                {allData ? (
                  <table id="restaurant" className="table table-striped table-style">
                    <thead>
                      <tr>
                        <th>Restaurant Name</th>
                        <th>Description</th>
                        <th>Discount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allData.map((data) => (
                        <tr>
                          <td>{data.category_name}</td>
                          <td>{data.description}</td>
                          <td>{data.category_discount}</td>
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

export default Restaurant;