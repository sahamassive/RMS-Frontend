import React, { useState } from 'react';
import './EmployeeRegistration.css';
import AccountDetails from './AccountDetails';
import Form from 'react-bootstrap/Form';
import Address from './Address';
import Others from './Others';
import Password from './Password';
import { Link, useLocation } from 'react-router-dom';


function EmployeeRegistration() { 
    const [accountDetails, setAccountDetails] = useState(true);
    const [address, setAddress] = useState(false);
    const [password, setPassword] = useState(false);
    const [others, setOthers] = useState(false);
    const { state } = useLocation();
    
    const AccountDetails2 = () => {
        setAccountDetails(true);
        setAddress(false);
        setOthers(false);
        setPassword(false);
    }
    
    const Address2 = () => {
        setAccountDetails(false);
        setAddress(true);
        setPassword(false);
        setOthers(false);
    }

    const Password2 = () => {
        setPassword(true);
        setAddress(false);
        setOthers(false);
        setAccountDetails(false);
    }

    const Others2 = () => {
        setOthers(true);
        setAddress(false);
        setPassword(false);
        setAccountDetails(false);
    }
    const insert = async (e) => {
        e.preventDefault();
        console.log(state.fname);
        console.log(state.lname);

        const formData = new FormData();
        // formData.append("image", image);
        // formData.append("first_name", fname);
        // formData.append("last_name", lname);
        // formData.append("email", email);
        // formData.append("phone", phone);
        // formData.append("NID", nid);
        // formData.append("gender", gender);
        // formData.append("dob", dob);
        // formData.append("type", type);
        // formData.append("address1", address1);
        // formData.append("address2", address2);
        // formData.append("country", country);
        // formData.append("city", city);
        // formData.append("state", state);
        // formData.append("zipCode", zipCode);
        // formData.append("password", password);
        // formData.append("salary", salary);
        // formData.append("joining", joining);

        // await axios
        //     .post(`${baseUrl}/api/food-insert`, formData)
        //     .then((response) => {
        //         alert(response.data.msg);
        //         console.log(response);
        //     });
    };
    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h2> New Employee Registration:</h2>
                        <div className="card-body">
                            <Form method='post'>
                                <div className='two_part'>
                                    <div className="col-sm-3 background">
                                        <p className="text_style space"><span className="text_style"><i
                                                    className="bi bi-folder2-open icon-space"></i>Account
                                                Setting</span><br></br>Personal Information</p>
                                        <Link onClick={AccountDetails2}>
                                        <p className={ accountDetails ? "btn_style_active icon2" : "btn_style_inactive icon2" }>
                                            <i className="bi bi-person-fill icon-space"></i>Account Details</p>
                                        </Link>
                                        <Link onClick={Address2}>
                                        <p className={ address ? "btn_style_active icon2" : "btn_style_inactive icon2" }><i
                                                className="bi bi-geo-alt-fill icon-space"></i>Address</p>
                                        </Link>
                                        <Link onClick={Password2}>
                                        <p className={ password ? "btn_style_active icon2" : "btn_style_inactive icon2" }><i
                                                className="bi bi-lock-fill icon-space"></i>Password</p>
                                        </Link>
                                        <Link onClick={Others2}>
                                        <p className={ others ? "btn_style_active icon2" : "btn_style_inactive icon2" }><i
                                                className="bi bi-motherboard-fill icon-space"></i>Others</p>
                                        </Link>
                                    </div>
                                    <div className="col-sm-9 background">
                                        <div className="col-sm-6">
                                            <h4 className='space left-space'><i
                                                    className='bi bi-info-square-fill icon-space'></i>Personal Information</h4>
                                        </div>
                                        <div>
                                            {accountDetails ?
                                            <AccountDetails /> : null}
                                            {address ?
                                            <Address /> : null}
                                            {password ?
                                            <Password /> : null}
                                            {others?
                                                <Others /> : null}
                                            {others?
                                                <p className='btn-style2'><button type="submit"  onClick={insert} className="btn btn-warning"><i
                                                className="bi bi-save-fill"></i>Insert</button></p> : null}
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default EmployeeRegistration;