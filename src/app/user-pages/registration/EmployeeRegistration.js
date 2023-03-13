import React, { useEffect, useState } from "react";
import "./EmployeeRegistration.css";
import profile from "../../../assets/images/profile/profile.jpg";
import { Link, useLocation } from "react-router-dom";
import countrydata from "./../Country/Countrydata.json";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";
import { check } from "../constant/check";
import { useValidation } from "../constant/useValidation";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
const token = sessionStorage.getItem("token");

function EmployeeRegistration() {
  const [accountDetails, setAccountDetails] = useState(true);
  const [address, setAddress] = useState(false);
  const [passwordView, setPasswordView] = useState(false);
  const [others, setOthers] = useState(false);

  const [image, setImage] = useState();
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [nid, setNid] = useState();
  const [gender, setGender] = useState();
  const [dob, setDob] = useState();
  const [type, setType] = useState();
  const [preview, setPrview] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();

  const [zipCode, setZipCode] = useState();

  const [password, setPassword] = useState();
  const [cpassword, setCpassword] = useState();
  const [salary, setSalary] = useState();
  const [joining, setJoining] = useState();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const { values, handleChange, errors, validate } = useValidation({
 
  });

  const changeHandler = (event) => {
    setImage(event.target.files[0]);
    setPrview(URL.createObjectURL(event.target.files[0]));
  };

  const AccountDetails2 = () => {
    const { values, handleChange, errors, validate } = useValidation({
      name: "",
      email: "",
      phone: "",
      nid: "",
      gender: "",
      type: "",
    });
    const isValid = validate();
    if (isValid) {
      setAccountDetails(true);
      setAddress(false);
      setOthers(false);
      setPassword(false);
      //setAddress(true);
    }
  };

  const AddressView = () => {
    //if (isValid || address) {
      setAccountDetails(false);
      setAddress(true);
      setPasswordView(false);
      setOthers(false);
      //setPasswordView(true);
    //}
  };

  const Password2 = () => {
    //if (isValid || passwordView) {
      setPasswordView(true);
      setAddress(false);
      setOthers(false);
      setAccountDetails(false);
    //}
  };

  const Others2 = () => {
    //if (isValid) {
      setOthers(true);
      setAddress(false);
      setPasswordView(false);
      setAccountDetails(false);
    //}
  };

  const insert = async (e) => {
    e.preventDefault();

    const isValid = validate();

    if (isValid) {
      const formData = new FormData();
      formData.append("restaurant_id", restaurant_id);
      formData.append("image", image);
      formData.append("first_name", fname);
      formData.append("last_name", lname);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("nid", nid);
      formData.append("gender", gender);
      formData.append("dob", dob);
      formData.append("type", type);
      formData.append("address1", address1);
      formData.append("country", selectedCountry);
      formData.append("city", selectedCity);
      formData.append("state", selectedState);
      formData.append("zipCode", zipCode);
      formData.append("password", password);
      formData.append("salary", salary);
      formData.append("joining", joining);
      if (password == cpassword) {
        axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
        await axios
          .post(`${baseUrl}/api/employee-insert`, formData)
          .then((response) => {
            Swal.fire({
              title: response.data.msg,
              icon: "success",
              confirmButtonText: "OK",
            });
          });
      } else {
        alert(`password doesn't match`);
      }
    }
  };
  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">New Employee Registration:</h4>
              <a className="btn-style btn btn-info" href="/hr/all-employee">
                <i class="bi bi-card-list"></i>All Employee
              </a>
            </div>
            <div className="two_part">
              <div className="col-sm-3 background">
                <p className="text_style space">
                  <span className="text_style">
                    <i className="bi bi-folder2-open icon-space"></i>Account
                    Setting
                  </span>
                  <br></br>Personal Information
                </p>
                <Link onClick={AccountDetails2}>
                  <p
                    className={
                      accountDetails
                        ? "btn_style_active icon2"
                        : "btn_style_inactive icon2"
                    }
                  >
                    <i className="bi bi-person-fill icon-space"></i>Account
                    Details
                  </p>
                </Link>
                <Link onClick={AddressView}>
                  <p
                    className={
                      address
                        ? "btn_style_active icon2"
                        : "btn_style_inactive icon2"
                    }
                  >
                    <i className="bi bi-geo-alt-fill icon-space"></i>Address
                  </p>
                </Link>
                <Link onClick={Password2}>
                  <p
                    className={
                      passwordView
                        ? "btn_style_active icon2"
                        : "btn_style_inactive icon2"
                    }
                  >
                    <i className="bi bi-lock-fill icon-space"></i>Password
                  </p>
                </Link>
                <Link onClick={Others2}>
                  <p
                    className={
                      others
                        ? "btn_style_active icon2"
                        : "btn_style_inactive icon2"
                    }
                  >
                    <i className="bi bi-motherboard-fill icon-space"></i>
                    Others
                  </p>
                </Link>
              </div>
              <div className="col-sm-9">
                <Form onSubmit={insert}>
                  {accountDetails ? (
                    <div className="background">
                      <div className="input_field two_part">
                        <div>
                          <img
                            className="profile2"
                            src={preview ? preview : profile}
                          ></img>
                        </div>
                        <div>
                          <Form.Group
                            controlId="formFileMultiple"
                            className="mb-3 search_box2"
                          >
                            <Form.Control
                              type="file"
                              onChange={changeHandler}
                              multiple
                            />
                          </Form.Group>
                        </div>
                      </div>
                      <div className="input_field two_part">
                        <div className="wid">
                          <Form.Label className="label-style">
                            First name
                          </Form.Label>
                          <Form.Control
                            name="fname"
                            type="text"
                            value={fname ? fname : null}
                            onBlur={handleChange}
                            placeholder="First name"
                            onChange={(event) => {
                              setFname(event.target.value);
                            }}
                          />
                          {errors.name && (
                            <span className="error">{errors.name}</span>
                          )}
                        </div>
                        <div className="wid">
                          <Form.Label className="label-style">
                            Last name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={lname ? lname : null}
                            placeholder="Last name"
                            onChange={(event) => {
                              setLname(event.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="input_field">
                        <div className="wid">
                          <Form.Label className="label-style">
                            E-mail
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={email ? email : null}
                            placeholder="E-mail"
                            onBlur={handleChange}
                            onChange={(event) => {
                              setEmail(event.target.value);
                            }}
                          />
                          {errors.email && (
                            <span className="error">{errors.email}</span>
                          )}
                        </div>
                      </div>
                      <div className="input_field two_part">
                        <div className="wid">
                          <Form.Label className="label-style">
                            Contact no.
                          </Form.Label>
                          <div className="border-23 form-control">
                            <PhoneInput
                              value={phone? phone : null}
                            name="phone"
                            onBlur={handleChange}
                            id="phone-in"
                            international
                            countryCallingCodeEditable={false}
                            defaultCountry="BD"
                            onChange={setPhone}
                        />
                        </div>
                          {errors.phone && (
                            <span className="error">{errors.phone}</span>
                          )}
                        </div>
                        <div className="wid">
                          <Form.Label className="label-style">NID</Form.Label>
                          <Form.Control
                            name="nid"
                            value={nid ? nid : null}
                            type="number"
                            onBlur={handleChange}
                            placeholder="NID"
                            onChange={(event) => {
                              setNid(event.target.value);
                            }}
                          />
                          {errors.nid && (
                            <span className="error">{errors.nid}</span>
                          )}
                        </div>
                      </div>
                      <div className="input_field two_part">
                        <div className="wid">
                          <Form.Label className="label-style">
                            Select gender
                          </Form.Label>
                          <select
                            name="gender"
                            value={gender ? gender : null}
                            onBlur={handleChange}
                            onChange={(event) => {
                              setGender(event.target.value);
                            }}
                          >
                            <option value="">Select here</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                          {errors.gender && (
                            <span className="error">{errors.gender}</span>
                          )}
                        </div>
                        <div className="wid">
                          <Form.Label className="label-style">
                            Date Of birth
                          </Form.Label>
                          <Form.Control
                            name="birth"
                            value={dob ? dob : null}
                            id="birth"
                            type="date"
                            placeholder="Date Of birth"
                            onChange={(event) => {
                              setDob(event.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="input_field">
                        <div className="wid">
                          <Form.Label className="label-style">
                            Select employee type
                          </Form.Label>
                          {window.location.pathname ===
                          "/super-admin/employee/registration" ? (
                              <select
                                name="type"
                                value={type ? type : null}
                                onBlur={handleChange}
                                onChange={(event) => {
                                setType(event.target.value);
                              }}
                            >
                              <option value="">Select here</option>
                              <option value="super-admin">Super Admin</option>
                              <option value="admin">Admin</option>
                              <option value="sub-admin">Sub-Admin</option>
                              <option value="chef">Chef</option>
                              <option value="waiter">Waiter</option>
                              <option value="delivery-men">Delivery Men</option>
                              <option value="sales & marketing">
                                Sales & Marketing
                              </option>
                              <option value="manager">Manager</option>
                              <option value="cleaner">Cleaner</option>
                              </select>
                          ) : (
                              <select
                              value={type ? type : null}
                              name="type"
                              onBlur={handleChange}
                              onChange={(event) => {
                                setType(event.target.value);
                              }}
                            >
                              <option value="">Select here</option>
                              <option value="chef">Chef</option>
                              <option value="waiter">Waiter</option>
                              <option value="delivery-men">Delivery Men</option>
                              <option value="sales & marketing">
                                Sales & Marketing
                              </option>
                              <option value="manager">Manager</option>
                              <option value="cleaner">Cleaner</option>
                            </select>
                          )}
                          {errors.type && (
                            <span className="error">{errors.type}</span>
                          )}
                        </div>
                      </div>
                      <p className="btn-style2">
                        <Link onClick={AddressView} className="btn btn-info">
                          Next
                        </Link>
                      </p>
                    </div>
                  ) : null}
                  {address ? (
                    <div className="background">
                      <div className="input_field">
                        <div className="wid">
                          <Form.Label className="label-style">
                            Address line 1
                          </Form.Label>
                          <Form.Control
                            value={ address1 ? address1 : null}
                            className="wid"
                            name="address1"
                            type="text"
                            onBlur={handleChange}
                            placeholder="Address line 1"
                            onChange={(event) => {
                              setAddress1(event.target.value);
                            }}
                          />
                          {errors.address1 && (
                            <span className="error">{errors.address1}</span>
                          )}
                        </div>
                      </div>
                      <div className="input_field">
                        <div className="wid">
                          <Form.Label className="label-style">
                            Address line 2
                          </Form.Label>
                          <Form.Control
                          value={ address2 ? address2 : null}
                            className="wid"
                            name="address2"
                            type="text"
                            placeholder="Address line 2"
                            onChange={(event) => {
                              setAddress2(event.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="input_field two_part">
                        <div className="wid">
                          <Form.Label className="label-style">
                            Country
                          </Form.Label>
                          <select
                            value={selectedCountry}
                            onChange={(event) =>
                              setSelectedCountry(event.target.value)
                            }
                          >
                            <option value="">Select a country</option>
                            {countrydata.map((country) => (
                              <option key={country.name} value={country.name}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="wid">
                          <Form.Label className="label-style">State</Form.Label>

                          <select
                            value={selectedState}
                            onChange={(event) =>
                              setSelectedState(event.target.value)
                            }
                            disabled={!selectedCountry}
                          >
                            <option value="">Select a state</option>
                            {selectedCountry &&
                              countrydata
                                .find(
                                  (country) => country.name === selectedCountry
                                )
                                .states.map((state) => (
                                  <option key={state.name} value={state.name}>
                                    {state.name}
                                  </option>
                                ))}
                          </select>
                        </div>
                      </div>
                      <div className="input_field two_part">
                        <div className="wid">
                          <Form.Label className="label-style">City</Form.Label>
                          <select
                            id="city"
                            value={selectedCity}
                            onChange={(event) =>
                              setSelectedCity(event.target.value)
                            }
                            disabled={!selectedState}
                          >
                            <option value="">Select a city</option>
                            {selectedState &&
                              countrydata
                                .find(
                                  (country) => country.name === selectedCountry
                                )
                                .states.find(
                                  (state) => state.name === selectedState
                                )
                                .cities.map((city) => (
                                  <option key={city.id} value={city.name}>
                                    {city.name}
                                  </option>
                                ))}
                          </select>
                        </div>
                        <div className="wid">
                          <Form.Label className="label-style">
                            ZIP code
                          </Form.Label>
                          <Form.Control
                            value={zipCode ? zipCode : null}
                            type="number"
                            placeholder="Zip Code"
                            onChange={(event) => {
                              setZipCode(event.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <p className="btn-style2">
                        <button
                          onClick={AccountDetails2}
                          className="btn btn-secondary"
                        >
                          Previous
                        </button>{" "}
                        <button onClick={Password2} className="btn btn-info">
                          Next
                        </button>
                      </p>
                    </div>
                  ) : null}
                  {passwordView ? (
                    <div className="background">
                      <div className="input_field">
                        <div className="wid">
                          <Form.Label className="label-style">
                            Password
                          </Form.Label>
                          <Form.Control
                            name="password"
                            type="password"
                            onBlur={handleChange}
                            placeholder="Password"
                            onChange={(event) => {
                              setPassword(event.target.value);
                            }}
                          />
                          {errors.password && (
                            <span className="error">{errors.password}</span>
                          )}
                        </div>
                      </div>
                      <div className="input_field">
                        <div className="wid">
                          <Form.Label className="label-style">
                            Confirm Password
                          </Form.Label>
                          <Form.Control
                            name="password"
                            type="password"
                            onBlur={handleChange}
                            placeholder="Confirm Password"
                            onChange={(event) => {
                              setCpassword(event.target.value);
                            }}
                          />
                          {errors.password && (
                            <span className="error">{errors.password}</span>
                          )}
                        </div>
                      </div>
                      <p className="btn-style2">
                        <button
                          onClick={AddressView}
                          className="btn btn-secondary"
                        >
                          Previous
                        </button>{" "}
                        <button onClick={Others2} className="btn btn-info">
                          Next
                        </button>
                      </p>
                    </div>
                  ) : null}
                  {others ? (
                    <div className="background">
                      <div className="input_field">
                        <div className="wid">
                          <Form.Label className="label-style">
                            Salary
                          </Form.Label>
                          <Form.Control
                            value={salary ? salary : null}
                            name="salary"
                            type="number"
                            placeholder="Salary"
                            onBlur={handleChange}
                            onChange={(event) => {
                              setSalary(event.target.value);
                            }}
                          />
                          {errors.salary && (
                            <span className="error">{errors.salary}</span>
                          )}
                        </div>
                      </div>
                      <div className="input_field">
                        <div className="wid">
                          <Form.Label className="label-style">
                            Date Of joining
                          </Form.Label>
                          <Form.Control
                            value={joining ? joining : null }
                            name="joining"
                            type="date"
                            placeholder="Date Of joining"
                            onChange={(event) => {
                              setJoining(event.target.value);
                            }}
                          />
                        </div>
                        <p className="btn-style3">
                          <button
                            onClick={Password2}
                            className="btn btn-secondary"
                          >
                            Previous
                          </button>{" "}
                          <button className="btn btn-warning">
                            <i className="bi bi-save-fill"></i>Insert
                          </button>
                        </p>
                        <br></br>
                        <br></br>
                      </div>
                    </div>
                  ) : null}
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeRegistration;