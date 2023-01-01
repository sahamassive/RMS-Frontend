import React, { Component, useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./style.css";
import axios, { all } from "axios";

const baseUrl = "http://127.0.0.1:8000";

function Brand() {
  const [allData, setAllData] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios.get(`${baseUrl}/api/brands`).then((response) => {
      setAllData(response.data);
    });
  };

  const statusChange = (id) => {
    axios.get(`${baseUrl}/api/brand-status/${id}`).then((response) => {
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
              <h4 className="card-title">All Brand</h4>
              <a
                className="btn-style btn btn-info"
                href="/catalogue/create-brand"
              >
                <i className="bi bi-plus"></i>New Brand
              </a>
            </div>
            <div className="table-responsive">
              {allData ? (
                <table id="example" className="table table-striped table-style">
                  <thead>
                    <tr>
                      <th>Brand Name</th>

                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData.map((data) => (
                      <tr>
                        <td>{data.name}</td>

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Brand;
