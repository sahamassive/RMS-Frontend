import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import '../style.css';

function NewEmployeeLeave() {
    const [employeeName, setEmployeeName] = useState();
    const [employeeType, setEmployeeType] = useState();
    const [startingTime, setStartingTime] = useState();
    const [endingTime, setEndingTime] = useState();
    const [reason, setReason] = useState();

    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                    <div className="btn-section">
                    <h4 className="card-title">New Employee Leave:</h4>
                    <a className="btn-style btn btn-info" href="/hr/leave"><i class="bi bi-card-list"></i> All Leave</a>
                    </div>
                        <div className='background'>
                            <div className='col-sm-12 background'>
                                <div className='input_field two_part'>
                                    <div className="wid">
                                        <Form.Label className="level-style">Employee name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Employee name"
                                            onChange={(event) => {
                                                setEmployeeName(event.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="wid">
                                    <Form.Label className="level-style">Select employee type</Form.Label>
                                        <select
                                        onChange={(event) => {
                                            setEmployeeType(event.target.value);
                                        }}
                                        >
                                            <option value="">Select here</option>
                                            <option value="admin">Admin</option>
                                            <option value="sub-admin">Sub-Admin</option>
                                            <option value="chef">Chef</option>
                                            <option value="waiter">Waiter</option>
                                            <option value="sales & marketing">Sales & Marketing</option>
                                            <option value="manager">Manager</option>
                                            <option value="cleaner">Cleaner</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='input_field two_part'>
                                    <div className="wid">
                                        <Form.Label className="level-style">Start Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            placeholder="Amount"
                                            onChange={(event) => {
                                                setStartingTime(event.target.value);
                                            }}
                                        ></Form.Control>
                                    </div>
                                    <div className="wid">
                                        <Form.Label className="level-style">End Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            placeholder="Price"
                                            onChange={(event) => {
                                                setEndingTime(event.target.value);
                                            }}
                                        ></Form.Control>
                                    </div>
                                </div>
                                <div className="input_field">
                                    <Form.Group>
                                        <Form.Label className="level-style">Reason of Leave</Form.Label>
                                        <Form.Control
                                            className="area"
                                            as="textarea"
                                            placeholder="Reason of Leave"
                                            rows={3}
                                            onChange={(event) => {
                                                setReason(event.target.value);
                                            }}
                                        />
                                    </Form.Group>
                                </div>
                                <a className="btn btn-warning top-space2"><i
                                        className="bi bi-save-fill"></i>Insert</a><br></br><br></br>
                                <br></br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewEmployeeLeave;