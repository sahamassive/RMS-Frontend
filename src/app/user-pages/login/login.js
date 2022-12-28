import React, { Component } from 'react'; 
import Form from 'react-bootstrap/Form';
import './login.css';

function Login(){
    return (
        <div className='background'>
            <form>
                <div className='border-style'>
                <div className='section-04'>
                <div className='col-md-2'></div>
                <div className='col-md-4'>
                    <img className="logo" src={ require('../../../assets/images/logo.png') } alt=""></img>
                    <p className="company_name">
                        <span className="res">Restaurant</span> FOOD</p>
                    <Form.Control name="username" type="text" placeholder="Email Address" />
                    <Form.Control name="password" type="password" placeholder="Password" />
                    <button className='btn btn-warning space' type='submit'>Sign in <i className="bi bi-box-arrow-in-right"></i></button>
                    <a href='' className="forget">Forget Password?</a>
                </div>
                <div className='col-md-9'>
                    <img className="right-pic" src={ require('../../../assets/images/login-page.jpg') } alt=""></img>
                </div>
            </div>
                </div>
            </form>
        </div>
    );
}
export default Login;