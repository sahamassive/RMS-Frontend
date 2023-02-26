import React, { Component, useState } from "react";
import "../login.css";
import {
  baseUrl,
  restaurant_id,
  axios,
  Swal,
  Form,
} from "../../constant/global";
import ReCAPTCHA from "react-google-recaptcha";

function Login(props) {
  const [emailOrPhone, setEmailOrPhone] = useState();
  const [password, setPassword] = useState();

  const [isVerified, setIsVerified] = useState(false);

  const handleVerification = (response) => {
    fetch(`${baseUrl}/api/verify-recaptcha`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recaptchaResponse: response,
      }),
    }).then((res) => {
      if (res.ok) {
        setIsVerified(true);
      }
    });
  };

  const loginCustomer = async (event) => {
    if (isVerified) {
      event.preventDefault();

      const formData = new FormData();
      formData.append("setEmailOrPhone", emailOrPhone);
      formData.append("password", password);
      formData.append("device_name", "web");

      await axios
        .post(`${baseUrl}/api/customer/login-dashboard`, formData)
        .then(({ data }) => {
          if (data.message == "success") {
            sessionStorage.setItem("loginType", data.type);
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("emp_id", data.customer_id);
            window.location.pathname == "/customer/login"
              ? (window.location.href = "/customer/dashboard")
              : Swal.fire({
                  title: "Login Successful. You can checkout now...",
                  icon: "success",
                  confirmButtonText: "OK",
                });
            props.setLoginModalStatus(false);
          } else {
            sessionStorage.setItem("authenticated", false);
            window.location.href = "/customer/login";

            Swal.fire({
              title: "login attempt failed",
              icon: "warning",
              confirmButtonText: "OK",
            });
          }
          setIsVerified(false);
        })
        .catch(function (error) {
          sessionStorage.setItem("authenticated", false);
        });
    } else {
      Swal.fire({
        title: "Please verify that you are not a robot.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div
      className={
        window.location.pathname == "/customer/login" ? "background-2" : null
      }
    >
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div className="wrap d-md-flex">
                <div className="img">
                  <img
                    className="right-pic-2"
                    src={require("../../../../assets/images/loginCS.jpg")}
                    alt=""
                  ></img>
                </div>
                <div className="login-wrap p-4 p-md-5">
                  <div className="d-flex">
                    <div className="w-100">
                      <h3 className="mb-4">Sign In</h3>
                    </div>
                    <div className="w-100">
                      <p className="social-media d-flex justify-content-end">
                        <a
                          href="#"
                          className="social-icon d-flex align-items-center justify-content-center"
                        >
                          <span className="bi bi-facebook"></span>
                        </a>
                        <a
                          href="#"
                          className="social-icon d-flex align-items-center justify-content-center"
                        >
                          <span className="bi bi-google"></span>
                        </a>
                      </p>
                    </div>
                  </div>
                  <form action="#" className="signin-form">
                    <div className="form-group mb-3">
                      <label className="label" for="name">
                        Email/Phone
                      </label>
                      <Form.Control
                        type="text"
                        placeholder="Email/Username"
                        onChange={(event) => {
                          setEmailOrPhone(event.target.value);
                        }}
                      ></Form.Control>
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" for="password">
                        Password
                      </label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}
                      ></Form.Control>
                    </div>
                    <div className="form-group">
                      <ReCAPTCHA
                        sitekey="6LcK5pgkAAAAAE_BWdgl4fkoGGKI7a2rDHUZyplN"
                        onChange={handleVerification}
                        debug={true}
                      />
                    </div>

                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn-class btn btn-warning btn-block"
                        onClick={loginCustomer}
                      >
                        Sign In <i className="bi bi-box-arrow-in-right"></i>
                      </button>
                    </div>
                    <div className="form-group d-md-flex">
                      <div className="w-50 text-left"></div>
                      <div className="w-50 text-md-right">
                        <a href="#">Forgot Password</a>
                      </div>
                    </div>
                  </form>
                  <p className="text-center">
                    Not a member?{" "}
                    <a data-toggle="tab" href="/customer/register">
                      Sign Up
                    </a>
                  </p>
                  {window.location.pathname == "/customer/login" ? (
                    <div className="d-grid gap-2">
                      <a
                        href="/"
                        className="btn btn-outline-success"
                        type="button"
                      >
                        Back To Home
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Login;
