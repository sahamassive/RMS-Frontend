import React, { Component, useState } from "react";
import "../login.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../../constant/global";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState();

    return (
        <div className="background-3">
            <form>
                <div className="col-md-12 section-04">
                    <div className="col-md-2"></div>
                    <div className="col-md-5">
                        <img
                            className="right-pic-2"
                            src={require("../../../../assets/images/loginCS.jpg")}
                            alt=""
                        ></img>
                    </div>
                    <div className="col-md-3 input-sec">
                        <img
                            className="logo2"
                            src={require("../../../../assets/images/logo.png")}
                            alt=""
                        ></img>
                        <p className="company_name">
                            <span className="res">Restaurant</span> FOOD
                        </p>
                        <Form.Control
                            name="name"
                            type="text"
                            placeholder="Full Name"
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                        
                        <PhoneInput
                            className="form-control phone-style"
                            international
                            countryCallingCodeEditable={false}
                            defaultCountry="BD"
                            value={phone}
                            onChange={setPhone}
                        />
                        
                        <Form.Control
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                        <Form.Control
                            name="cpassword"
                            type="password"
                            placeholder="Confirm Password"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                        <button
                            className="btn btn-warning space"
                            type="Register"
                        >
                            Sign Up <i className="bi bi-box-arrow-in-right"></i>
                        </button>
                        <br></br>
                        <p className="new-sec">Already have an account?<a href="/customer/login"> SignIn</a></p>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div class="d-grid gap-2">
                            <a href="/" class="btn btn-outline-success" type="button">Back To Home</a>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </form>
        </div>
    );
}
export default Register;
