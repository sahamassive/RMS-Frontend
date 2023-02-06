import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../style.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../../constant/global";

function EditSection() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [name, setName] = useState();

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/section-edit/${params.id}`)

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
      .post(`${baseUrl}/api/section-update/${params.id}`, {
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
                <i className="bi bi-card-list"></i>All Section
              </a>
            </div>
            <label className="label-style">Section name</label>
            <Form.Control
              className="col-sm-6"
              type="text"
              placeholder={data ? data.name : null}
              onChange={(event) => {
                setName(event.target.value);
              }}
            ></Form.Control>
            <br></br>
            <button className="btn btn-success" onClick={update}>
              <i className="bi bi-save-fill"></i>Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditSection;
