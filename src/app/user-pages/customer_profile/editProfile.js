import React, { Component, useEffect, useState } from "react";
import "./style.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";
import { useValidation } from "../constant/useValidation";
import profile from "../../../assets/images/profile/profile.jpg";
import countrydata from "./../Country/Countrydata.json";

function EditProfile() {
    const type = sessionStorage.getItem("loginType");
    const emp_id = sessionStorage.getItem("emp_id");
    const [preview, setPrview] = useState();
    const token = sessionStorage.getItem("token");
    const [image, setImage] = useState();
    const [name, setname] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [deliveryAddress, setDeliveryAddress] = useState();

    if (type) {
        
    }
    else {
      window.location.href = "/";
    }

    const changeHandler = (event) => {
        setImage(event.target.files[0]);
        setPrview(URL.createObjectURL(event.target.files[0]));
    };

    useEffect(() => {
        axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    
        axios.get(`${baseUrl}/api/profile/${type}/${emp_id}`).then((response) => {
            //console.log(response.data);
            setImage(response.data.image);
            setname(response.data.name);
            setEmail(response.data.email);
            setPhone(response.data.phone);
            setAddress(response.data.address);
            setDeliveryAddress(response.data.delivery_address);
        });
    }, []);

    const { values, handleChange, errors, validate } = useValidation({
        name: "",
        email: email ? email : "",
        phone: "",
        address: "",
        image: "",
        delivery: "",
      });

    const Update = (event) => { 
        event.preventDefault();

        const isValid = validate();

        if (isValid) {
            axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

            const formData = new FormData();
            formData.append("image", image);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("address", address);
            formData.append("delivery_address", deliveryAddress);
    
            axios
                .post(`${baseUrl}/api/edit-customer-profile/${type}/${emp_id}`, formData)
                .then((response) => { 
                    Swal.fire({
                        title: response.data.msg,
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                })  
        }
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
                                            src={image ? `${baseUrl}/customer/small/${image}` : profile}
                                        ></img>
                                    </div>
                                    <div>
                                        <Form.Group
                                            controlId="formFileMultiple"
                                            className="search_box2"
                                        >
                                            <Form.Control
                                            name="image"
                                            onChangeCapture={handleChange}
                                                type="file"
                                                onChange={changeHandler}
                                                multiple
                                            />
                                        </Form.Group>
                                        {errors.image && (
                                            <span className="error">{errors.image}</span>
                                          )}
                                    </div>
                                </div>
                                <div className="input_field two_part">
                                    <div className="wid">
                                        <Form.Label className="label-style">
                                            Full name
                                        </Form.Label>
                                        <Form.Control
                                            name="name"
                                            onBlur={handleChange}
                                            value={name}
                                            type="text"
                                            placeholder="Full name"
                                            onChange={(event) => {
                                                setname(event.target.value);
                                            }}
                                        />
                                        {errors.name && (
                                            <span className="error">{errors.name}</span>
                                          )}
                                    </div>
                                </div>
                                <div className="input_field two_part">
                                    <div className="wid">
                                        <Form.Label className="label-style">
                                            E-mail
                                        </Form.Label>
                                        <Form.Control
                                            name="email"
                                            onBlur={handleChange}
                                            value={email}
                                            type="email"
                                            placeholder="E-mail"
                                            onChange={(event) => {
                                                setEmail(event.target.value);
                                            }}
                                        />
                                        {errors.email && (
                                            <span className="error">{errors.email}</span>
                                          )}
                                    </div>
                                    <div className="wid">
                                        <Form.Label className="label-style">
                                            Contact no.
                                        </Form.Label>
                                        <Form.Control
                                            name="phone"
                                            onBlur={handleChange}
                                            value={phone}
                                            type="text"
                                            placeholder="Phone"
                                            onChange={(event) => {
                                                setPhone(event.target.value);
                                            }}
                                        />
                                        {errors.phone && (
                                            <span className="error">{errors.phone}</span>
                                          )}
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
                                            onBlur={handleChange}
                                            type="text"
                                            placeholder="Address"
                                            onChange={(event) => {
                                                setAddress(event.target.value);
                                            }}
                                        />
                                        {errors.address && (
                                            <span className="error">{errors.address}</span>
                                          )}
                                    </div>
                                </div>
                                <div className="input_field">
                                    <div className="wid">
                                        <Form.Label className="label-style">
                                            Delivery Address
                                        </Form.Label>
                                        <Form.Control
                                            value={deliveryAddress}
                                            className="wid"
                                            name="delivery"
                                            onBlur={handleChange}
                                            type="text"
                                            placeholder="Address"
                                            onChange={(event) => {
                                                setDeliveryAddress(event.target.value);
                                            }}
                                        />
                                        {errors.delivery && (
                                            <span className="error">{errors.delivery}</span>
                                          )}
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