import React, { Component, useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "../style.css";
import axios from "axios";
import { baseUrl } from "../../constant/global";
import Swal from "sweetalert2";

function AllBranch() {
  const [allData, setAllData] = useState("");

  useEffect(() => {
    axios.get(`${baseUrl}/api/branchs`).then((response) => {
      setAllData(response.data);
      console.log(allData);
    });
  }, []);

  const getData = () => {
    axios.get(`${baseUrl}/api/branchs`).then((response) => {
      setAllData(response.data);
    });
  };

  const statusChange = (id) => {
    axios.get(`${baseUrl}/api/branch-status/${id}`).then((response) => {
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
    $("#branchs").DataTable();
  });

  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">All Branch</h4>
              <a className="btn-style btn btn-info" href="/branch/new-branch">
                <i className="bi bi-plus-square"></i>New Branch
              </a>
            </div>
            <div className="table-responsive table-style table-background">
              {allData ? (
                <table id="branchs" className="table table-striped table-style">
                  <thead>
                    <tr>
                      <th>SI.</th>
                      <th>Restaurant Name</th>
                      <th>Phone</th>
                      <th>Status</th>
                      <th>City</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData.map((data, indx) => (
                      <tr>
                        <td>{indx + 1}</td>
                        <td>{data.restaurant_name}</td>
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
                        <td>{data.city}</td>
                        <td>
                          <a
                            className="btn btn-warning"
                            href={`/branch/edit-branch/${data.id}`}
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

export default AllBranch;
