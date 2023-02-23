import React, { useState, useEffect } from "react";
import "./style.css";
import $ from "jquery";
import "datatables.net";
import { baseUrl, axios } from "../constant/global";
import { check } from "../constant/check";

function Booking() {
  const [allData, setAllData] = useState();
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios.get(`${baseUrl}/api/bookings`).then((response) => {
      setAllData(response.data);
    });
  };
  $.DataTable = require("datatables.net");
  $(document).ready(function () {
    $("#example").DataTable();
  });

  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">All bookings:</h4>
              <a className="btn-style btn btn-info" href="/booking/new-booking">
                <i class="bi bi-plus-square"></i>New Booking
              </a>
            </div>
            <div className="table-responsive">
              {allData ? (
                <table id="example" className="table table-striped table-style">
                  <thead>
                    <tr>
                      <th>Booking Date</th>
                      <th>People</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Type</th>
                      <th>Table No</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData.map((data) => (
                      <tr>
                        <td>{data.booking_date}</td>

                        <td>{data.people}</td>
                        <td>{data.name}</td>
                        <td>{data.phone}</td>
                        <td>{data.type}</td>
                        <td>{data.table}</td>
                        <td>{data.start_time}</td>
                        <td>{data.end_time}</td>
                        <td>
                          <a
                            className="btn btn-danger"
                            href={`/catalogue/edit-brand/${data.id}`}
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

export default Booking;
