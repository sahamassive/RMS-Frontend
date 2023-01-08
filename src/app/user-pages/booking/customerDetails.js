import React, { useState } from "react";
import Form from 'react-bootstrap/Form';

function CustomerDetails() {
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [address1, setAddress1] = useState();
    const [address2, setAddress2] = useState();
    const [country, setCountry] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [zipCode, setZipCode] = useState();

    return (
        <div>
        <div className="input_field two_part">
        <div className="wid">
            <Form.Label className="level-style">First name</Form.Label>
            <Form.Control
                type="text"
                placeholder="First name"
                onChange={(event) => {
                    setFname(event.target.value);
                }}
            />
        </div>
        <div className="wid">
            <Form.Label className="level-style">Last name</Form.Label>
            <Form.Control
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
                <Form.Label className="level-style">E-mail</Form.Label>
                <Form.Control
                type="email"
                placeholder="E-mail"
                onChange={(event) => {
                    setEmail(event.target.value);
                }}
            />
            </div>
            <div className="wid">
                <Form.Label className="level-style">Contact no.</Form.Label>
                <Form.Control
                type="text"
                placeholder="Phone"
                onChange={(event) => {
                    setPhone(event.target.value);
                }}
            />
            </div>
        </div>
            <div className="input_field">
                <div className="wid">
                    <Form.Label className="level-style">Address line 1</Form.Label>
                    <Form.Control
                        className="wid"
                        name="address1"
                        type="text"
                        placeholder="Address line 1"
                        onChange={(event) => {
                            setAddress1(event.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="input_field">
                <div className="wid">
                    <Form.Label className="level-style">Address line 2</Form.Label>
                    <Form.Control
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
                    <Form.Label className="level-style">Country</Form.Label>
                    <select
                    onChange={(event) => {
                        setCountry(event.target.value);
                    }}
                    >
                        <option>Select here</option>
                        <option value="chef">Chef</option>
                    </select>
                </div>
                <div className="wid">
                    <Form.Label className="level-style">City</Form.Label>
                    <select
                    onChange={(event) => {
                        setCity(event.target.value);
                    }}
                    >
                        <option value="">Select here</option>
                        <option value="chef">Chef</option>
                    </select>
                </div>
            </div>
            <div className="input_field two_part">
                <div className="wid">
                    <Form.Label className="level-style">State</Form.Label>
                    <select
                    onChange={(event) => {
                        setState(event.target.value);
                    }}
                    >
                        <option selected>State</option>
                        <option value="male">Male</option>
                    </select>
                </div>
                <div className="wid">
                    <Form.Label className="level-style">ZIP code</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Zip Code"
                        onChange={(event) => {
                            setZipCode(event.target.value);
                        }}
                    />
                </div>
            </div>
        <a className="btn btn-warning top-space"><i className="bi bi-save-fill"></i>Insert</a> <br></br>
        <br></br> <br></br>
        </div>
    );
}

export default CustomerDetails;