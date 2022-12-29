import React, { Component, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios, { all } from "axios";
import "./style.css";
import $ from "jquery";
import "datatables.net";
const baseUrl = "http://127.0.0.1:8000";

function Section() {
  const [allData, setAllData] = useState("");
  useEffect(() => {
    axios.get(`${baseUrl}/api/sections`).then((response) => {
      setAllData(response.data);
    });
  }, []);
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
              <h4 className="card-title">All section</h4>
              <a
                className="btn-style btn btn-info"
                href="/catalogue/create-section"
              >
                <i className="bi bi-plus"></i>New Section
              </a>
            </div>
            <div className="table-responsive">
              {allData ? (
                <table id="example" className="table table-striped table-style">
                  <thead>
                    <tr>
                      <th>Category Name</th>
                      <th>Description</th>
                      <th>Discount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData.map((data) => (
                      <tr>
                        <td>{data.name}</td>
                        <td>{data.description}</td>
                        <td>{data.status}</td>
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

export default Section;
