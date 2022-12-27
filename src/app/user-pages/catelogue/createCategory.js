import React, { Component, useEffect, useState } from "react";
import "./style.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000";

function CreateCategory() {
  const [name, setName] = useState();
  const insert = () => {
    axios
      .post(`${baseUrl}/api/category-insert`, {
        category_name: name,
      })
      .then((response) => {
        alert(response.data.msg);
      });
  };
  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">Create New Category</h4>
              <a className="btn-style btn btn-info" href="/catalogue/category">
                <i className="bi bi-list-columns-reverse"></i>All category
              </a>
            </div>
            <label className="label-style">Category name</label>
            <Form.Control
              className="col-sm-6"
              type="text"
              placeholder="Category name"
              onChange={(event) => {
                setName(event.target.value);
                console.log(name);
              }}
            ></Form.Control>
            <a className="btn btn-success top-space" onClick={insert}>
              <i className="bi bi-save-fill"></i>Insert
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateCategory;
