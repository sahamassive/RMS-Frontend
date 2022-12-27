import React from "react";
import Form from 'react-bootstrap/Form';

function CustomerDetails() {
    return (
        <div className="background">
        <div className="input_field two_part" >
        <Form.Control type="text" placeholder="First name" />    
        <Form.Control type="text" placeholder="Last name" />   
            </div> 
            <div className="input_field two_part">
                <Form.Control type="email" placeholder="E-mail" /> 
                <Form.Control type="text" placeholder="Phone" />    
            </div> 
            <div className="input_field">
                <Form.Control className="wid" name="address1" type="text" placeholder="Address line 1" />
            </div> 
            <div className="input_field">
                <Form.Control className="wid" name="address2" type="text" placeholder="Address line 2" />
            </div>
            <div className="input_field two_part">
            <select>
            <option>Country</option>
            <option value="chef">Chef</option>
            </select>
                <select>
                    <option selected>City</option>
                    <option value="chef">Chef</option>
                </select>
            </div>
            <div className="input_field two_part">
                <select>
                    <option selected>State</option>
                    <option value="male">Male</option>
                </select>
                <Form.Control type="number" placeholder="Zip Code" />
            </div>
            <a className="btn btn-warning top-space"><i className="bi bi-save-fill"></i>Insert</a> <br></br>
            <br></br> <br></br>
        </div>
    );
}

export default CustomerDetails;