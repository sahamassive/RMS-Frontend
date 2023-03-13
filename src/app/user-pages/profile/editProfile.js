import React, { Component, useEffect, useState } from "react";
import "./style.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";
import profile from "../../../assets/images/profile/profile.jpg";
import countrydata from "./../Country/Countrydata.json";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useValidation } from "../constant/useValidation"; 

function EditProfile() {
    const type = sessionStorage.getItem("loginType");
    const emp_id = sessionStorage.getItem("emp_id");
    const [preview, setPrview] = useState();
    const token = sessionStorage.getItem("token");
    const [image, setImage] = useState();
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [dob, setDob] = useState();
    const [address, setAddress] = useState();
    const [zipCode, setZipCode] = useState();
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");


    if (type) {
        
    }
    else {
      window.location.href = "/";
    }

    const changeHandler = (event) => {
        setImage(event.target.files[0]);
        setPrview(URL.createObjectURL(event.target.files[0]));
    };

    const changeCountry = (event) => {
        setSelectedCountry(event.target.value);
        setSelectedState("");
        setSelectedCity("");
    };

    useEffect(() => {
        axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    
        axios.get(`${baseUrl}/api/profile/${type}/${emp_id}`).then((response) => {
            //console.log(response.data);
            setImage(response.data.image);
            setFname(response.data.first_name);
            setLname(response.data.last_name);
            setEmail(response.data.email);
            setPhone(response.data.phone);
            setAddress(response.data.address);
            setSelectedCountry(response.data.country);
            setSelectedState(response.data.state);
            setSelectedCity(response.data.city);
            setZipCode(response.data.zip_code);
            setDob(response.data.birth_date);
        });
    }, []);

    const Update = (event) => { 
        event.preventDefault();

        axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

        const formData = new FormData();
        formData.append("image", image);
        formData.append("first_name", fname);
        formData.append("last_name", lname);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("country", selectedCountry);
        formData.append("city", selectedCity);
        formData.append("state", selectedState);
        formData.append("zip_code", zipCode);
        formData.append("birth_date", dob);

        axios
            .post(`${baseUrl}/api/edit-profile/${type}/${emp_id}`, formData)
            .then((response) => { 
                Swal.fire({
                    title: response.data.msg,
                    icon: "success",
                    confirmButtonText: "OK",
                });
            })
    }
    
    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="btn-section">
                            <h4 className="card-title">Edit Profile Information:</h4>
                            <a className="btn-style btn btn-info" href="/user/profile">
                                <i class="bi bi-arrow-90deg-left"></i> Return
                            </a>
                        </div>
                        <div className="background col-sm-12">
                            <div className="background">
                                <div className="input_field two_part">
                                    <div>
                                        <img
                                            className="profile2"
                                            src={preview ? preview : `${baseUrl}/employee/small/${image}`}
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
                                            value={fname}
                                            type="text"
                                            placeholder="First name"
                                            onChange={(event) => {
                                                setFname(event.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="wid">
                                        <Form.Label className="label-style">
                                            Last name
                                        </Form.Label>
                                        <Form.Control
                                            value={lname}
                                            type="text"
                                            placeholder="Last name"
                                            onChange={(event) => {
                                                setLname(event.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="input_field two_part">
                                    <div className="wid">
                                        <Form.Label className="label-style">
                                            E-mail
                                        </Form.Label>
                                        <Form.Control
                                            value={email}
                                            type="email"
                                            placeholder="E-mail"
                                            onChange={(event) => {
                                                setEmail(event.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="wid">
                                        <Form.Label className="label-style">
                                            Contact no.
                                        </Form.Label>
                                        <div className="border-23 form-control">
                                            <PhoneInput
                                       
                                          id="phone-in"
                                        international
                                        countryCallingCodeEditable={false}
                                        defaultCountry="BD"
                                        onChange={setPhone}
                                      />
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="background">
                                <div className="input_field">
                                    <div className="wid">
                                        <Form.Label className="label-style">
                                            Address
                                        </Form.Label>
                                        <Form.Control
                                            value={address}
                                            className="wid"
                                            name="address"
                                            type="text"
                                            placeholder="Address"
                                            onChange={(event) => {
                                                setAddress(event.target.value);
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
                                            onChange={ changeCountry }
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
                                </div>
                                <div className="input_field two_part">
                                    <div className="wid">
                                        <Form.Label className="label-style">
                                            ZIP code
                                        </Form.Label>
                                        <Form.Control
                                            value={zipCode}
                                            type="number"
                                            placeholder="Zip Code"
                                            onChange={(event) => {
                                                setZipCode(event.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="wid">
                                        <Form.Label className="label-style">
                                            Date Of birth
                                        </Form.Label>
                                        <Form.Control
                                            value={dob}
                                            name="birth"
                                            id="birth"
                                            type="date"
                                            placeholder="Date Of birth"
                                            onChange={(event) => {
                                                setDob(event.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="d-grid gap-2 col-6 mx-auto">
                            <button
                              className="btn btn-warning top-space"
                              onClick={Update}
                            >
                              <i className="bi bi-save-fill"></i>Insert
                            </button>
                            <br></br>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;