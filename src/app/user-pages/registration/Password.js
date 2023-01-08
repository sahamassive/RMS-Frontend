import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';

function Password() {
    const [password, setPassword] = useState();
    const [cpassword, setCpassword] = useState();

    return (
        <div className='background'>
            <div className="input_field">
                <div className="wid">
                    <Form.Label className="level-style">Password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="input_field">
                <div className="wid">
                    <Form.Label className="level-style">Confirm Password</Form.Label>
                    <Form.Control
                        name="cpassword"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(event) => {
                            setCpassword(event.target.value);
                        }}
                    />
                </div>
            </div>
            <p className='btn-style2'><button className='btn btn-secondary'>Previous</button> <button
                    className='btn btn-info'>Next</button></p>
        </div>
    );
}

export default Password;