import React, { Component, useEffect, useState } from "react";
import "./style.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000";
function CreateBrand() {
  const [name, setName] = useState();
  const [logo, setLogo] = useState();
  const insert = () => {
    axios
      .post(`${baseUrl}/api/brand-insert`, {
        brand_name: name,
      })
      .then((response) => {
        alert(response.data.msg);
        console.log(response);
      });
  };
  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">Create New Brand</h4>
              <a className="btn-style btn btn-info" href="/catalogue/brand">
                <i className="bi bi-list-columns-reverse"></i> All Brand
              </a>
            </div>
            <label className="label-style">Brand name</label>
            <Form.Control
              className=""
              type="text"
              placeholder="Brand name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            ></Form.Control>
            <lavel className="label-style">Brand LOGO</lavel>
            <div className=" section-03 ">
              <Form.Group
                controlId="formFileMultiple"
                className="mb-3 search_box2"
              >
                <Form.Control
                  type="file"
                  name="file"
                  onChange={(e) =>
                    setLogo(URL.createObjectURL(e.target.files[0]))
                  }
                />
              </Form.Group>
              <img src={logo} width="80px" height="50px" />
            </div>
            <button className="btn btn-warning top-space" onClick={insert}>
              <i className="bi bi-save-fill"></i>Insert
            </button>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateBrand;
