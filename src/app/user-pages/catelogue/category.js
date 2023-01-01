import React, { Component, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import $ from "jquery";
import "datatables.net";
import "./style.css";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000";

function Category() {
  const [allData, setAllData] = useState("");

  useEffect(() => {
    axios.get(`${baseUrl}/api/categories`).then((response) => {
      setAllData(response.data);
      console.log(allData);
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
              <h4 className="card-title">All Category</h4>
              <a
                className="btn-style btn btn-info"
                href="/catalogue/create-category"
              >
                <i className="bi bi-plus"></i>New Category
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
export default Category;
