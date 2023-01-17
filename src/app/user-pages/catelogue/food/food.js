import React, { Component, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "../style.css";
import $ from "jquery";
import "datatables.net";
import axios, { all } from "axios";
import { baseUrl } from "../../constant/global";

function Food() {
  const [allData, setAllData] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios.get(`${baseUrl}/api/foods`).then((response) => {
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
              <h4 className="card-title">All Food</h4>
              <a
                className="btn-style btn btn-info"
                href="/catalogue/create-food"
              >
                <i className="bi bi-plus-square"></i>New Food
              </a>
            </div>
            <div className="table-responsive">
              {allData ? (
                <table id="example" className="table table-striped table-style">
                  <thead>
                    <tr>
                      <th>item Name</th>
                      <th>Image</th>
                      <th>Description</th>
                      <th>Section</th>
                      <th>Category</th>

                      <th>Brand</th>

                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData.map((data) => (
                      <tr>
                        <td>{data.name}</td>
                        <td>
                          <img
                            src={`${baseUrl}/foods/small/${data.image}`}
                            width="80px"
                            height="50px"
                          />
                        </td>
                        <td>{data.description}</td>
                        <td>{data.section_name}</td>
                        <td>{data.category_name}</td>
                        <td>{data.brand_name}</td>

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

export default Food;
