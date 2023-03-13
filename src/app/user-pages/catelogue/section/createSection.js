import React, { useState } from "react";
import "../style.css";
import {
  baseUrl,
  restaurant_id,
  axios,
  Swal,
  Form,
} from "../../constant/global";
import { check } from "../../constant/check";
import PageTitle from "../../constant/title";
import { useValidation } from "../../constant/useValidation";
const token = sessionStorage.getItem("token");

function CreateSection() {
  const [name, setName] = useState();

  const { values, handleChange, errors, validate } = useValidation({
    name: "",
  });

  const insert = (event) => {
    event.preventDefault();

    const isValid = validate();

    if (isValid) {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

      axios
        .post(`${baseUrl}/api/section-insert`, {
          section_name: name,
        })
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
      <PageTitle />
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">Create New food section</h4>
              <a className="btn-style btn btn-info" href="/catalogue/section">
                <i class="bi bi-card-list"></i>All Section
              </a>
            </div>
            <div className="input-field">
              <Form.Label className="label-style">Section name</Form.Label>
              <Form.Control
                name="name"
                onBlur={handleChange}
                className=""
                type="text"
                placeholder="Section name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              ></Form.Control>
              {errors.name && (
                <span className="error">{errors.name}</span>
              )}
            </div>
            <br></br>
            <button className="btn btn-success" onClick={insert}>
              <i className="bi bi-save-fill"></i>Insert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateSection;
