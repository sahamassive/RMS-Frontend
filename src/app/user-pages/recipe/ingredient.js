import React, { Component, useEffect, useState } from "react";
import "./style.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { baseUrl, resturant_id } from "../constant/global";
import Swal from "sweetalert2";

function Ingredient() {
  const [name, setName] = useState();
  const [unit, setUnit] = useState();
  const [unitPrice, setUnitPrice] = useState();

  const insert = () => {
    axios
      .post(`${baseUrl}/api/ingredient-insert`, {
        resturant_id: resturant_id,
        ingredient: name,
        unit: unit,
        unit_price: unitPrice,
      })
      .then((response) => {
        Swal.fire({
          title: response.data.msg,
          icon: "success",
          confirmButtonText: "OK",
        });
      });
  };
  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">Create New Ingredeint</h4>
              <a className="btn-style btn btn-info" href="/catalogue/category">
                <i className="bi bi-list-columns-reverse"></i>All category
              </a>
            </div>
            <div className="col-sm-12 background">
              <div>
                <div className="input_field two_part">
                  <div className="wid">
                    <Form.Label className="level-style">
                      Ingredient name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingredient Name"
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    ></Form.Control>
                  </div>
                  <div className="wid">
                    <Form.Label className="level-style">Unit</Form.Label>
                    <select
                      className="select2"
                      onChange={(event) => {
                        setUnit(event.target.value);
                      }}
                    >
                      <option value="">Select Section</option>
                      <option value="Gm">Gm</option>
                      <option value="L">Liter</option>
                      <option value="Ps">Ps</option>
                    </select>
                  </div>
                </div>
                <div className="input_field two_part">
                  <div className="wid">
                    <Form.Label className="level-style">Unit Price</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Unit Price"
                      onChange={(event) => {
                        setUnitPrice(event.target.value);
                      }}
                    ></Form.Control>
                  </div>
                </div>
                <a className="btn btn-success top-space2" onClick={insert}>
                  <i className="bi bi-save-fill"></i>Insert
                </a>
                <br></br>
                <br></br> <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Ingredient;
