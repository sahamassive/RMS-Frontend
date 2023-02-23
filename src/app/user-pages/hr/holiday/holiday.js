import React, { Component, useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "../style.css";
import {
  baseUrl,
  restaurant_id,
  axios,
  Swal,
  Form,
} from "../../constant/global";
import { check } from "../../constant/check";
function Holiday() {
  const [allData, setAllData] = useState("");

  useEffect(() => {
    axios.get(`${baseUrl}/api/categories`).then((response) => {
      setAllData(response.data);
      console.log(allData);
    });
  }, []);

  $.DataTable = require("datatables.net");
  $(document).ready(function () {
    $("#department").DataTable();
  });

  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Holidays:</h4>
            <div className="btn_section btn_style">
              <a href="/hr/holidays" className="btn btn-primary gap">
                <i className="bi bi-list"></i>All holidays
              </a>
              <a href="/hr/new-holiday" className="btn btn-info gap">
                <i className="bi bi-plus-square"></i>New holiday
              </a>
              <a href="" className="btn btn-success gap">
                <i className="bi bi-arrow-90deg-left"></i>Govt. holiday
              </a>
              <a href="" className="btn btn-warning gap">
                <i className="bi bi-calendar2-day"></i>Company holiday
              </a>
            </div>
            <br></br>
            <div className="table-responsive table-style">
              {allData ? (
                <table
                  id="department"
                  className="table table-striped table-style"
                >
                  <thead>
                    <tr>
                      <th>SI</th>
                      <th>Holiday Name</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Number of Days</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData.map((data) => (
                      <tr>
                        <td>{data.category_name}</td>
                        <td>{data.description}</td>
                        <td>{data.category_discount}</td>
                        <td>{data.category_discount}</td>
                        <td>{data.category_discount}</td>
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

export default Holiday;
