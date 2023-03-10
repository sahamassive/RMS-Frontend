import React, { Component, useEffect, useState } from "react";
import "../style.css";
import {
  baseUrl,
  restaurant_id,
  axios,
  Swal,
  Form,
} from "../../constant/global";
import { useValidation } from "../../constant/useValidation";
import { check } from "../../constant/check";
const token = sessionStorage.getItem("token");

function CreateBrand() {
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [preview, setPrview] = useState();

  const { values, handleChange, errors, validate } = useValidation({
    name: "",
    image: "",
  });

  const changeHandler = (event) => {
    setImage(event.target.files[0]);
    setPrview(URL.createObjectURL(event.target.files[0]));
  };
  const insert = async (e) => {
    e.preventDefault();

    const isValid = validate();

    if (isValid) {
      const formData = new FormData();

      formData.append("name", name);
  
      formData.append("image", image);
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  
      await axios
        .post(`${baseUrl}/api/brand-insert`, formData)
        .then((response) => {
          Swal.fire({
            title: response.data.msg,
            icon: "success",
            confirmButtonText: "OK",
          });
        });
    }
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
              <div className="wid">
              <label className="label-style">Brand name</label>
              <Form.Control
                className=""
                name="name"
                onBlur={handleChange}
                type="text"
                placeholder="Brand name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              ></Form.Control>
              </div>
              {errors.name && (
                <span className="error">{errors.name}</span>
              )}
              <br></br>
              <lavel className="label-style">Brand LOGO</lavel>
              <div className="section-03 wid">
                <Form.Group
                  controlId="formFileMultiple"
                  className="mb-3 search_box2"
                >
                  <Form.Control
                    name="image"
                    className="search_box2"
                    type="file"
                    onChange={changeHandler}
                    onChangeCapture={handleChange}
                  />
                </Form.Group>
                <br></br>
                {errors.image && (
                  <span className="error">{errors.image}</span>
                )}
                <img className="img" src={preview} width="80px" height="50px" />
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
