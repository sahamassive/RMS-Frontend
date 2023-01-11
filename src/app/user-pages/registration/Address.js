import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';

function Address() { 
    const [address1, setAddress1] = useState();
    const [address2, setAddress2] = useState();
    const [country, setCountry] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [zipCode, setZipCode] = useState();

    return (
        <div className='background'>
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
                    />
                </div>
                <div className="wid">
                    <Form.Label className="level-style">State</Form.Label>
                    <select
                    onChange={(event) => {
                        setState(event.target.value);
                    }}
                    />
                </div>
            </div> 
            <div className="input_field two_part">
                <div className="wid">
                    <Form.Label className="level-style">City</Form.Label>
                    <select
                    onChange={(event) => {
                        setCity(event.target.value);
                    }}
                    />
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
            <p className='btn-style2'>
                <button className='btn btn-secondary'>Previous</button> <button className='btn btn-info'>Next</button>
            </p>
        </div>
    );
}

export default Address;