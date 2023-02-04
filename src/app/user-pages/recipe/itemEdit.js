import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";

function EditItem() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [name, setName] = useState();

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/item-edit/${params.id}`)
      .then((res) => {
        setName(res.data.item_name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  const update = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);

    axios
      .post(`${baseUrl}/api/item-update/${params.id}`, formData)
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
              <h4 className="card-title">Brand section</h4>
              <a className="btn-style btn btn-info" href="/item/list">
                <i className="bi bi-card-list"></i>All Item
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

export default EditItem;
