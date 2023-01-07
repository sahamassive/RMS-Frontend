import React, { Component, useEffect, useState } from "react";
import "./style.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { baseUrl } from "../constant/global";
function CreateBrand() {
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [preview, setPrview] = useState();

  const changeHandler = (event) => {
    setImage(event.target.files[0]);
    setPrview(URL.createObjectURL(event.target.files[0]));
  };
  const insert = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);

    formData.append("image", image);
    await axios
      .post(`${baseUrl}/api/brand-insert`, formData)
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
            <Form onSubmit={insert}>
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
                  <Form.Control type="file" onChange={changeHandler} />
                </Form.Group>
                <img src={preview} width="80px" height="50px" />
              </div>
              <button className="btn btn-warning top-space2">
                <i className="bi bi-save-fill"></i>Insert
              </button>
            </Form>
            <br></br>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateBrand;
