import React, { Component, useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./style.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";

function ItemList() {
  const [allData, setAllData] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios.get(`${baseUrl}/api/items/${restaurant_id}`).then((response) => {
      setAllData(response.data);
    });
  };

  const statusChange = (id) => {
    axios.get(`${baseUrl}/api/brand-status/${id}`).then((response) => {
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
    $("#example").DataTable();
  });

  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">All Item</h4>
              <a
                className="btn-style btn btn-info"
                href="/catalogue/create-brand"
              >
                <i className="bi bi-plus-square"></i>New Item
              </a>
            </div>
            <div className="table-responsive">
              {allData ? (
                <table id="example" className="table table-striped table-style">
                  <thead>
                    <tr>
                      <th>Food Name</th>
                      <th>Basic Price</th>
                      <th>Selling Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData.map((data) => (
                      <tr>
                        <td>{data.item_name}</td>

                        <td>{data.basic_price}</td>
                        <td>{data.selling_price}</td>

                        <td>
                          <a
                            className="btn btn-danger"
                            href={`/item/edit/${data.id}`}
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
export default ItemList;
