import Form from 'react-bootstrap/Form';
import React from 'react';

function Address() { 
    return (
        <div className='background'>
            <div className="input_field">
                <Form.Control name="address1" type="textarea" placeholder="Address line 1" />
            </div>
            <div className="input_field">
                <Form.Control name="address2" type="textarea" placeholder="Address line 2" />
            </div>
            <div className="input_field">
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
            <p className='btn-style2'><button className='btn btn-secondary'>Previous</button> <button className='btn btn-info'>Next</button></p>
        </div>
    );
}

export default Address;