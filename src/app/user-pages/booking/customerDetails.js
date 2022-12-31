import React from "react";
import Form from 'react-bootstrap/Form';

function CustomerDetails() {
    return (
        <div>
        <div className="input_field two_part">
            <div className="wid">
                <Form.Label className="level-style">First name</Form.Label>
                <Form.Control type="text" placeholder="First name" />
            </div>
            <div className="wid">
                <Form.Label className="level-style">Last name</Form.Label>
                <Form.Control type="text" placeholder="Last name" />
            </div>
        </div>
        <div className="input_field two_part">
            <div className="wid">
                <Form.Label className="level-style">E-mail</Form.Label>
                <Form.Control type="email" placeholder="E-mail" />
            </div>
            <div className="wid">
                <Form.Label className="level-style">Contact no.</Form.Label>
                <Form.Control type="text" placeholder="Phone" />
            </div>
        </div>
        <div className="input_field">
            <div className="wid">
                <Form.Label className="level-style">Address line 1</Form.Label>
                <Form.Control className="wid" name="address1" type="text" placeholder="Address line 1" />
            </div>
        </div>
        <div className="input_field">
            <div className="wid">
                <Form.Label className="level-style">Address line 2</Form.Label>
                <Form.Control className="wid" name="address2" type="text" placeholder="Address line 2" />
            </div>
        </div>
        <div className="input_field two_part">
            <div className="wid">
                <Form.Label className="level-style">Country</Form.Label>
                <select>
                    <option>Select here</option>
                    <option value="chef">Chef</option>
                </select>
            </div>
            <div className="wid">
                <Form.Label className="level-style">City</Form.Label>
                <select>
                    <option selected>Select here</option>
                    <option value="chef">Chef</option>
                </select>
            </div>
        </div>
        <div className="input_field two_part">
            <div className="wid">
                <Form.Label className="level-style">State</Form.Label>
                <select>
                    <option selected>State</option>
                    <option value="male">Male</option>
                </select>
            </div>
            <div className="wid">
                <Form.Label className="level-style">ZIP code</Form.Label>
                <Form.Control type="number" placeholder="Zip Code" />
            </div>
        </div>
        <a className="btn btn-warning top-space"><i className="bi bi-save-fill"></i>Insert</a> <br></br>
        <br></br> <br></br>
    </div>
    );
}

export default CustomerDetails;