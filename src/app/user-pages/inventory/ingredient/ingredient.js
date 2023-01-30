import React, { Component, useEffect, useState } from "react";
import "../style.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { baseUrl, resturant_id } from "../../constant/global";
import Swal from "sweetalert2";

function Ingredient() {
  const [name, setName] = useState();

  const insert = () => {
    axios
      .post(`${baseUrl}/api/ingredient-insert`, {
        resturant_id: resturant_id,
        ingredient: name,
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
              <a className="btn-style btn btn-info" href='/inventory/ingredient-list'>
                <i className="bi bi-list-columns-reverse"></i>All Ingredients
              </a>
            </div>
            <div className="col-sm-12 background">
              <div>
                <div className="input_field two_part">
                  <div className="wid">
                    <Form.Label className="label-style">
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
                </div>
                <a className="btn btn-primary top-space" onClick={insert}>
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
