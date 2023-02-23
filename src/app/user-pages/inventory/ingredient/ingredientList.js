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
const token = sessionStorage.getItem("token");

function IngredientList() {
  const [allData, setAllData] = useState("");

  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios
      .get(`${baseUrl}/api/ingredient-list/${restaurant_id}`)
      .then((response) => {
        setAllData(response.data);
        console.log(allData);
      });
  }, []);

  const getData = () => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios
      .get(`${baseUrl}/api/ingredient-list/${restaurant_id}`)
      .then((response) => {
        setAllData(response.data);
      });
  };

  const statusChange = (id) => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios.get(`${baseUrl}/api/ingredient-status/${id}`).then((response) => {
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
    $("#suppliers").DataTable();
  });

  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">All Suppliers</h4>
              <a
                className="btn-style btn btn-info"
                href="/inventory/new-supplier"
              >
                <i className="bi bi-plus-square"></i>New suppliers
              </a>
            </div>
            <div className="background table-responsive table-style table-background">
              {allData ? (
                <table
                  id="suppliers"
                  className="table table-striped table-style"
                >
                  <thead>
                    <tr>
                      <th>SI.</th>
                      <th>Ingredient Name</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData.map((data, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{data.ingredient}</td>
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
                        <td>
                          <a
                            className="btn btn-warning"
                            href={`/inventory/edit-ingredient/${data.id}`}
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

export default IngredientList;
