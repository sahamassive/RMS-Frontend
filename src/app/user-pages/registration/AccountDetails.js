import profile from '../../../assets/images/profile/profile.jpg';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AccountDetails() {
    const [image, setImage] = useState();
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [nid, setNid] = useState();
    const [gender, setGender] = useState();
    const [dob, setDob] = useState();
    const [type, setType] = useState();
    const [preview, setPrview] = useState();

    const changeHandler = (event) => {
        setImage(event.target.files[0]);
        setPrview(URL.createObjectURL(event.target.files[0]));
    };
    
    return (
        <div className='background'>
            <div className="input_field two_part">
                <div>
                    <img className="profile2" src={ preview ? preview : profile }></img>
                </div>
                <div>
                    <Form.Group controlId="formFileMultiple" className="mb-3 search_box2">
                        <Form.Control
                            type="file"
                            onChange={changeHandler}
                            multiple
                        />
                    </Form.Group>
                </div>
            </div>
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
            <div className="input_field">
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
            </div>
            <div className="input_field two_part">
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
                <div className="wid">
                    <Form.Label className="level-style">NID</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="NID"
                        onChange={(event) => {
                            setNid(event.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="input_field two_part">
                <div className="wid">
                    <Form.Label className="level-style">Select gender</Form.Label>
                    <select
                    onChange={(event) => {
                        setGender(event.target.value);
                    }}
                    >
                        <option value="">Select here</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="wid">
                    <Form.Label className="level-style">Date Of birth</Form.Label>
                    <Form.Control
                        name="birth"
                        id="birth"
                        type="date"
                        placeholder="Date Of birth"
                        onChange={(event) => {
                            setDob(event.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="input_field">
                <div className="wid">
                    <Form.Label className="level-style">Select employee type</Form.Label>
                    <select
                    onChange={(event) => {
                        setType(event.target.value);
                    }}
                    >
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
            <p className='btn-style2'> <a className='btn btn-info'>Next</a></p>
        
            {/*<Link to={{ 
                pathname: '/hr/add-employee',
                state: [{
                    fname: fname,
                    lname: lname
                }]
            }}></Link>*/}
        </div>
    );
};

export default AccountDetails;