import React, { Component, useState } from "react";
import "../login.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../../constant/global";

function Login() {
    const [type, setType] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginEmployee = async (e) => {
    if (type == null) {
        Swal.fire({
        title: "Plese Select Login Type",
        icon: "warning",
        confirmButtonText: "OK",
    });
    } else {
        e.preventDefault();

        const formData = new FormData();
        formData.append("type", type);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("device_name", "web");

    await axios
        .post(`${baseUrl}/api/login-dashboard`, formData)
        .then(({ data }) => {
            if (data.message == "Login") {
                sessionStorage.setItem("loginType", data.type);
                sessionStorage.setItem("token", data.token);
                window.location.href = "/dashboard";
            } else {
                sessionStorage.setItem("authenticated", false);
                window.location.href = "/customer/login";

            Swal.fire({
                title: "login attempt failed",
                icon: "warning",
                confirmButtonText: "OK",
            });
        }
    })
        .catch(function (error) {
            sessionStorage.setItem("authenticated", false);
        });
    }
};

    return (
        <div className="background-2">
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
                            name="username"
                            type="text"
                            placeholder="Email Address or username"
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                        <Form.Control
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                        <a href="" className="forget">
                            Forget Password?
                        </a>
                        <button
                        className="btn btn-warning space"
                        type="submit"
                        onClick={loginEmployee}
                    >
                        Sign in <i className="bi bi-box-arrow-in-right"></i>
                        </button>
                        <br></br>
                        <p className="new-sec">Not have an account?<a href="/customer/register"> SignUp</a></p>
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
export default Login;
