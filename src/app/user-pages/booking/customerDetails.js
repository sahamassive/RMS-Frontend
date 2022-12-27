import React from "react";
import Form from 'react-bootstrap/Form';
import Address from "../registration/Address";

function CustomerDetails() {
    return (
        <div>
        <div className="input_field two_part" >
        <Form.Control type="text" placeholder="First name" />    
        <Form.Control type="text" placeholder="Last name" />   
            </div> 
            <div className="input_field two_part">
                <Form.Control type="email" placeholder="E-mail" /> 
                <Form.Control type="text" placeholder="Phone" />    
            </div> 
            <Address/>
        </div>
    );
}

export default CustomerDetails;