import React, { Component, useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "../style.css";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000";

function Department() {
  const [allData, setAllData] = useState("");

  useEffect(() => {
    axios.get(`${baseUrl}/api/departments`).then((response) => {
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
            <h4 className="card-title">Department:</h4>
            <div className="btn_section btn_style">
              <a href="/hr/new-department" className="btn btn-primary gap">
                <i className="bi bi-plus-square"></i>New Department
              </a>
              <a href="" className="btn btn-info gap">
                <i className="bi bi-person-bounding-box"></i>HR
              </a>
              <a href="" className="btn btn-success gap">
                <i className="bi bi-cash-stack"></i>Accounts
              </a>
              <a href="" className="btn btn-warning gap">
                <i className="bi bi-person-workspace"></i>Sales & Marketing
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
                      <th>Department Name</th>
                      <th> Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData.map((data) => (
                      <tr>
                        <td>{data.name}</td>
                        <td>{data.description}</td>
                        <td>
                          <a
                            className="btn btn-danger"
                            href={`/catalogue/edit-food/${data.id}`}
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

export default Department;
