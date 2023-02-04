import React, { Component, useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./style.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";

function BasicPrice() {
  const [allData, setAllData] = useState("");
  const [price, setPrice] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios
      .get(`${baseUrl}/api/basic-price/${restaurant_id}`)
      .then((response) => {
        setAllData(response.data);
      });
  };

  const updatePrice = (id, index) => {
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
                href="/catalogue/create-brand"
              >
                <i className="bi bi-plus-square"></i>New Brand
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
                            className=""
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
