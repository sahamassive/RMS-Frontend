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
import { useValidation } from "../../constant/useValidation"; 

function NewDepartment() {
  const [departmentName, setDepartmentName] = useState();
  const [description, setDescription] = useState();

  const { values, handleChange, errors, validate } = useValidation({
    department: "",
    description: "",
  });

  const insert = async (e) => {
    e.preventDefault();

    const isValid = validate();
    
    if (isValid) {
      const formData = new FormData();
      formData.append("name", departmentName);
      formData.append("description", description);

      await axios
        .post(`${baseUrl}/api/department-insert`, formData)
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
              <h4 className="card-title">Create New Department</h4>
              <a className="btn-style btn btn-info" href="/hr/department">
                <i className="bi bi-list-columns-reverse"></i>All Department
              </a>
            </div>
            <div className="col-sm-12 background">
              <Form onSubmit={insert}>
                <div>
                  <div className="input_field">
                    <div className="wid">
                      <Form.Label className="label-style">
                        Department name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="department"
                        onBlur={handleChange}
                        placeholder="Department name"
                        onChange={(event) => {
                          setDepartmentName(event.target.value);
                        }}
                      ></Form.Control>
                      {errors.department && (
                        <span className="error">{errors.department}</span>
                      )}
                    </div>
                  </div>
                  <div className="input_field">
                    <Form.Group>
                      <Form.Label className="label-style">
                        Description
                      </Form.Label>
                      <Form.Control
                        name="description"
                        onBlur={handleChange}
                        className="area"
                        as="textarea"
                        placeholder="Description"
                        rows={6}
                        onChange={(event) => {
                          setDescription(event.target.value);
                        }}
                      ></Form.Control>
                      {errors.description && (
                        <span className="error">{errors.description}</span>
                      )}
                    </Form.Group>
                  </div>
                  <button className="btn btn-success top-space2">
                    <i className="bi bi-save-fill"></i>Insert
                  </button>
                  <br></br>
                  <br></br> <br></br>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewDepartment;
