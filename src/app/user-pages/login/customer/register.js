import React, { Component, useState } from "react";
import "../login.css";
import {
  baseUrl,
  restaurant_id,
  axios,
  Swal,
  Form,
} from "../../constant/global";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import GoogleLogin from "react-google-login";

function Register() {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [cpassword, setCPassword] = useState();
  const [phone, setPhone] = useState();

  const responseGoogle = (response) => {
    // Send the response data to your server-side code for authentication
    fetch(`${baseUrl}/api/login/google`, {
      method: "POST",
      body: JSON.stringify({ id_token: response.tokenId }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      // Handle the server response
      console.log(res);
    });
  };
  const Insert = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("restaurant_id", restaurant_id);
    formData.append("password", password);
    formData.append("phone", phone);

    if (password == cpassword) {
      axios
        .post(`${baseUrl}/api/register-customer`, formData)
        .then((response) => {
          Swal.fire({
            title: response.data.msg,
            icon: "success",
            confirmButtonText: "OK",
          });
        });
    } else {
      Swal.fire({
        title: "Password does not match",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="background-3">
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
                <h3 className="sign-in">Sign Up</h3>

                  <form action="#" className="signin-form">
                    <Form.Control
                      name="name"
                      type="text"
                      placeholder="Full Name"
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                    <PhoneInput
                      id="phone-style"
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
                        setCPassword(event.target.value);
                      }}
                    />
                    <br></br>
                    <div className="form-group">
                      <button
                        onClick={Insert}
                        type="submit"
                        className="btn-class btn btn-warning btn-block"
                      >
                        Sign Up <i className="bi bi-box-arrow-in-right"></i>
                      </button>
                      <p>Or</p>
                      <div className="two_part">
                        <GoogleLogin
                          clientId="3317537055-gn0cvsnkdusjari6lu0r4281a85g8j37.apps.googleusercontent.com"
                          buttonText="Login with Google"
                          onSuccess={responseGoogle}
                          onFailure={responseGoogle}
                          cookiePolicy={"single_host_origin"}
                        />
                      </div>
                    </div>
                  </form>
                  <p className="text-center">
                    Already a member?{" "}
                    <a data-toggle="tab" href="/customer/login">
                      Sign In
                    </a>
                  </p>
                  <div className="d-grid gap-2">
                    <a
                      href="/"
                      className="btn btn-outline-success"
                      type="button"
                    >
                      Back To Home
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Register;
