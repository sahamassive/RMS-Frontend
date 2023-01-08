import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import '../style.css';

function NewDepartment() {
    const [departmentName, setDepartmentName] = useState();
    const [description, setDescription] = useState();

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
                            <div>
                                <div className="input_field">
                                    <div className="wid">
                                        <Form.Label className="level-style">Department name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Department name"
                                            onChange={(event) => {
                                                setDepartmentName(event.target.value);
                                            }}
                                        ></Form.Control>
                                    </div>
                                </div>
                                <div className="input_field">
                                    <Form.Group>
                                        <Form.Label className="level-style">Description</Form.Label>
                                        <Form.Control
                                            className="area"
                                            as="textarea"
                                            placeholder="Description"
                                            rows={6}
                                            onChange={(event) => {
                                                setDescription(event.target.value);
                                            }}
                                        ></Form.Control>
                                    </Form.Group>
                                </div>
                                <a className="btn btn-success top-space2">
                                    <i className="bi bi-save-fill"></i>Insert
                                </a>{" "}
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

export default NewDepartment;