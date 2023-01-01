import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000";

function EditBrand() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [name, setName] = useState();

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/brand-edit/${params.id}`)

      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  const update = () => {
    console.log(name);
    axios
      .post(`${baseUrl}/api/brand-update/${params.id}`, {
        brand_name: name,
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
              <h4 className="card-title">Brand section</h4>
              <a className="btn-style btn btn-info" href="/catalogue/brand">
                <i className="bi bi-card-list"></i>All Brand
              </a>
            </div>
            <label className="label-style">Brand name</label>
            <Form.Control
              className="col-sm-6"
              type="text"
              placeholder={data ? data.name : null}
              onChange={(event) => {
                setName(event.target.value);
              }}
            ></Form.Control>
            <button className="btn btn-success top-space" onClick={update}>
              <i className="bi bi-save-fill"></i>Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBrand;
