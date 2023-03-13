import React, { Component, useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./style.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";
import { check } from "../constant/check";

const token = sessionStorage.getItem("token");

function BasicPrice() {
  const [allData, setAllData] = useState("");
  const [price, setPrice] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios
      .get(`${baseUrl}/api/basic-price/${restaurant_id}`)
      .then((response) => {
        setAllData(response.data);
      });
  };

  const updatePrice = (id, index) => {
    if (price > allData[index].basic_price) {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

      axios
        .post(`${baseUrl}/api/updatePrice/${id}`, {
          selling_price: price,
          basic_price: allData[index].basic_price,
        })
        .then((response) => {
          Swal.fire({
            title: response.data.msg,
            icon: "success",
            confirmButtonText: "OK",
          });
          setPrice("");
          getData();
        });
    }
    else if (price == '') {
      Swal.fire({
        title: 'Please provide a price first',
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    else if (price <= 0) {
      Swal.fire({
        title: 'Selling Price must be greater 0',
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    else if (price < allData[index].basic_price) {
      Swal.fire({
        title: 'Selling Price must be greater than Basic Price',
        icon: "error",
        confirmButtonText: "OK",
      });
    }
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
              <h4 className="card-title">Food Price Set</h4>
              <a
                className="btn-style btn btn-info"
                href="/item/list"
              >
                <i className="bi bi-plus-square"></i>item List
              </a>
            </div>
            <div className="table-responsive">
              {allData ? (
                <table id="example" className="table table-striped table-style">
                  <thead>
                    <tr>
                      <th>S.L</th>
                      <th>Food Name</th>
                      <th>Basic Price</th>
                      <th>Selling Price</th>
                      <th>Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData.map((data, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{data.item_name}</td>

                        <td>{data.basic_price.toFixed(2)}</td>
                        <td>
                          <Form.Control
                            id="field-style"
                            type="number"
                            placeholder="Enter Price"
                            onChange={(event) => {
                              setPrice(event.target.value);
                            }}
                          ></Form.Control>
                        </td>

                        <td>
                          <button
                            className="btn btn-warning"
                            onClick={() => {
                              updatePrice(data.item_code, index);
                            }}
                          >
                            Update Price
                          </button>
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
export default BasicPrice;
