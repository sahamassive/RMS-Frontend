import Form from 'react-bootstrap/Form';
import React from 'react';

function Password() {
    return (
        <div className='background'>
            <div className="input_field">
                <div className="wid">
                    <Form.Label className="level-style">Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" />
                </div>
            </div>
            <div className="input_field">
                <div className="wid">
                    <Form.Label className="level-style">Confirm Password</Form.Label>
                    <Form.Control name="cpassword" type="password" placeholder="Confirm Password" />
                </div>
            </div>
            <p className='btn-style2'><button className='btn btn-secondary'>Previous</button> <button
                    className='btn btn-info'>Next</button></p>
        </div>
    );
}

export default Password;