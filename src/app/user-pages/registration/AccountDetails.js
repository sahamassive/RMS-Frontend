import profile from '../../../assets/images/profile/profile.jpg';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { Link } from 'react-router-dom';

function AccountDetails() {
    return (
        <div className='background'>
            <div className="input_field two_part">
                <div>
                    <img className="profile2" src={ profile }></img>
                </div>
                <div>
                    <Form.Group controlId="formFileMultiple" className="mb-3 search_box2">
                        <Form.Control type="file" multiple />
                    </Form.Group>
                </div>
            </div>
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
            <div className="input_field">
                <div className="wid">
                    <Form.Label className="level-style">E-mail</Form.Label>
                    <Form.Control type="email" placeholder="E-mail" />
                </div>
            </div>
            <div className="input_field two_part">
                <div className="wid">
                    <Form.Label className="level-style">Contact no.</Form.Label>
                    <Form.Control type="text" placeholder="Phone" />
                </div>
                <div className="wid">
                    <Form.Label className="level-style">NID</Form.Label>
                    <Form.Control type="number" placeholder="NID" />
                </div>
            </div>
            <div className="input_field two_part">
                <div className="wid">
                    <Form.Label className="level-style">Select gender</Form.Label>
                    <select>
                        <option value="">Select here</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="wid">
                    <Form.Label className="level-style">Date Of birth</Form.Label>
                    <Form.Control name="birth" id="birth" type="date" placeholder="Date Of birth" />
                </div>
            </div>
            <div className="input_field">
                <div className="wid">
                    <Form.Label className="level-style">Select employee type</Form.Label>
                    <select>
                        <option value="">Select here</option>
                        <option value="admin">Admin</option>
                        <option value="sub-admin">Sub-Admin</option>
                        <option value="chef">Chef</option>
                        <option value="waiter">Waiter</option>
                        <option value="sales & marketing">Sales & Marketing</option>
                        <option value="manager">Manager</option>
                        <option value="cleaner">Cleaner</option>
                    </select>
                </div>
            </div>
            <p className='btn-style2'> <a onClick=" " className='btn btn-info'>Next</a></p>
        </div>
    );
};

export default AccountDetails;