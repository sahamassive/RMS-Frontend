import React, { useState } from "react";
import "../style.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { baseUrl } from "../../constant/global";

function CreateSection() {
  const [name, setName] = useState();
  const insert = () => {
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
              <label className="label-style">Section name</label>
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
