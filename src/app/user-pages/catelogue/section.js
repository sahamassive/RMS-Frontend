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
    getData();
  }, []);
  const getData = () => {
    axios.get(`${baseUrl}/api/sections`).then((response) => {
      setAllData(response.data);
    });
  };

  const statusChange = (id) => {
    axios.get(`${baseUrl}/api/section-status/${id}`).then((response) => {
      alert(response.data.msg);
      getData();
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
                      <th>Section Name</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData.map((data) => (
                      <tr>
                        <td>{data.name}</td>
                        <td>{data.description}</td>
                        <td>
                          {data.status == 0 ? (
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                statusChange(data.id);
                              }}
                            >
                              Deactive
                            </button>
                          ) : (
                            <button
                              className="btn btn-warning"
                              onClick={() => {
                                statusChange(data.id);
                              }}
                            >
                              Active
                            </button>
                          )}
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

export default Section;
