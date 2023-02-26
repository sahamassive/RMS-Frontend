import React, { Component, useState } from "react";
import "../login.css";
import {
  baseUrl,
  restaurant_id,
  axios,
  Swal,
  Form,
} from "../../constant/global";

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
            sessionStorage.setItem("emp_id", data.emp_id);
            if (type == "Chef") {
              window.location.href = "/chef/dashboard";
            } else if (type == "Waiter") {
              window.location.href = "/waiter/dashboard";
            } else {
              window.location.href = "/dashboard";
            }
          } else {
            sessionStorage.setItem("authenticated", false);
            window.location.href = "/employee/login";

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
    <div className="background-log">
        <div className="col-md-12 section-04">
          <div className="col-md-2"></div>
          <div className="col-md-3">
            <img
              className="logo"
              src={require("../../../../assets/images/logo.png")}
              alt=""
            ></img>
            <p className="company_name">
              <span className="res">Restaurant</span> FOOD
            </p>
            <select
              id="field-style-2"
              onChange={(event) => {
                setType(event.target.value);
              }}
            >
              <option value="">Select Section</option>
              <option value="Chef">Chef</option>
              <option value="Waiter">Waiter</option>
              <option value="Manager">Manager</option>
              <option value="Super-Admin">Super Admin</option>
              <option value="Admin">Admin</option>
            </select>
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
            <button
              className="btn btn-warning space"
              type="submit"
              onClick={loginEmployee}
            >
              Sign in <i className="bi bi-box-arrow-in-right"></i>
            </button>
            <a href="" className="forget">
              Forget Password?
            </a>
          </div>
          <div className="col-md-5">
            <img
              className="right-pic"
              src={require("../../../../assets/images/login-page.jpg")}
              alt=""
            ></img>
          </div>
          <div className="col-md-2"></div>
        </div>
    </div>
  );
}
export default Login;
