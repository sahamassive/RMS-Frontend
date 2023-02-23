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
const token = sessionStorage.getItem("token");

function CreateSection() {
  const [name, setName] = useState();
  const insert = () => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios
      .post(`${baseUrl}/api/section-insert`, {
        section_name: name,
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
              <h4 className="card-title">Create New food section</h4>
              <a className="btn-style btn btn-info" href="/catalogue/section">
                <i class="bi bi-card-list"></i>All Section
              </a>
            </div>
            <div className="input-field">
              <Form.Label className="label-style">Section name</Form.Label>
              <Form.Control
                className=""
                type="text"
                placeholder="Section name"
                onChange={(event) => {
                  setName(event.target.value);
                  console.log(name);
                }}
              ></Form.Control>
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
