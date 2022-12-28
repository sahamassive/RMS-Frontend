import Form from 'react-bootstrap/Form';
import React from 'react';

function Address() { 
    return (
        <div className='background'>
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
            <p className='btn-style2'>
                <button className='btn btn-secondary'>Previous</button> <button className='btn btn-info'>Next</button>
            </p>
        </div>
    );
}

export default Address;