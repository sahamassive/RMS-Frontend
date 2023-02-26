import React, { Component, useEffect, useState } from "react";
import "./style.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";

function ChangePassword() {
    const token = sessionStorage.getItem("token");
    const type = sessionStorage.getItem("loginType");
    const emp_id = sessionStorage.getItem("emp_id");
    const [password, setPassword] = useState();
    const [cpassword, setCpassword] = useState();
    const [ppassword, setPpassword] = useState();

    if (type) {

    }
    else {
      window.location.href = "/";
    }

    const Change = (event) => {
        event.preventDefault();

        if (password == cpassword) {
            axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
            axios
                .post(`${baseUrl}/api/change-password/${type}/${emp_id}`, {
                    'password': password,
                    'ppassword': ppassword
                })
                .then((response) => {
                    Swal.fire({
                        title: response.data.msg,
                        icon: response.data.icon,
                        confirmButtonText: "OK",
                    });
            })
        }
        else {
            Swal.fire({
                title: "Password & Confirm Password do not match...",
                icon: 'error',
                confirmButtonText: "OK",
            });
        }
    }

    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="btn-section">
                            <h4 className="card-title">Change Password:</h4>
                            <a className="btn-style btn btn-info" href="/user/profile">
                                <i class="bi bi-arrow-90deg-left"></i> Return
                            </a>
                        </div>
                        <div>
                            <div className="col-md-12 background">
                                <div className="input_field">
                                    <div className="wid">
                                        <Form.Label className="label-style">
                                            Previous Password
                                        </Form.Label>
                                        <Form.Control
                                            name="password"
                                            type="password"
                                            placeholder="Previous Password"
                                            onChange={(event) => {
                                                setPpassword(event.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="input_field">
                                    <div className="wid">
                                        <Form.Label className="label-style">
                                            Password
                                        </Form.Label>
                                        <Form.Control
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                            onChange={(event) => {
                                                setPassword(event.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="input_field">
                                    <div className="wid">
                                        <Form.Label className="label-style">
                                            Confirm Password
                                        </Form.Label>
                                        <Form.Control
                                            name="cpassword"
                                            type="password"
                                            placeholder="Confirm Password"
                                            onChange={(event) => {
                                                setCpassword(event.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="d-grid gap-2 col-6 mx-auto">
                                <button
                                  className="btn btn-warning top-space"
                                  onClick={Change}
                                >
                                  <i className="bi bi-key-fill"></i>Change Password
                                </button>
                                <br></br>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;