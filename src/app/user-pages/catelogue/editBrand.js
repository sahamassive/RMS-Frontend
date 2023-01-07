import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { baseUrl } from "../constant/global";

function EditBrand() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [preview, setPrview] = useState();

  const changeHandler = (event) => {
    setImage(event.target.files[0]);
    setPrview(URL.createObjectURL(event.target.files[0]));
  };
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/brand-edit/${params.id}`)

      .then((res) => {
        console.log(res.data);
        setImage(res.data.logo);
        setName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  const update = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);

    formData.append("image", image);
    axios
      .post(`${baseUrl}/api/brand-update/${params.id}`, formData)
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
            <Form onSubmit={update}>
              <label className="label-style">Brand name</label>
              <Form.Control
                className="col-sm-6"
                type="text"
                value={name}
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
                <img
                  src={preview ? preview : `${baseUrl}/${image}`}
                  width="80px"
                  height="50px"
                />
              </div>
              <button className="btn btn-success top-space2">
                <i className="bi bi-save-fill"></i>Update
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

export default EditBrand;
