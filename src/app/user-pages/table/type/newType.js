import React, { useEffect, useState } from "react";
import "../style.css";
import {
  baseUrl,
  restaurant_id,
  axios,
  Swal,
  Form,
} from "../../constant/global";
import { check } from "../../constant/check";

function NewTableType() {
  const [type, setType] = useState();

  const insert = () => {
    axios
      .post(`${baseUrl}/api/table-type-insert`, {
        type: type,
        restaurant_id: restaurant_id,
      })
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
              <h4 className="card-title">Create New Type</h4>
              <a
                className="btn-style btn btn-info"
                href="/table/table-type-list"
              >
                <i className="bi bi-list-columns-reverse"></i>All Table Type
              </a>
            </div>
            <div className="col-sm-12 background">
              <div>
                <div className="input_field two_part">
                  <div className="wid">
                    <Form.Label className="label-style">Table Type</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Table type"
                      onChange={(event) => {
                        setType(event.target.value);
                      }}
                    ></Form.Control>
                  </div>
                </div>
                <a className="btn btn-primary top-space" onClick={insert}>
                  <i className="bi bi-save-fill"></i>Insert
                </a>
                <br></br>
                <br></br> <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewTableType;
