import React, { Component, useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import './style.css';

function CustomerOrder() {
    const [allData, setAllData] = useState([]);
    useEffect(() => {
        const url = "";
        fetch(url)
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                setAllData(response.data)
        })
    }, []);
    return (
        <div>
            <div className="top-section">
                <h1>Your Cart</h1>
                <h3>Check Out Now and Enjoy Your Food</h3>
            </div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="section_01">
                            <div className="">
                                <h4 className="card-title">Your Cart Items:</h4>
                            </div>
                            <div>
                                <a href="/" className="btn btn-outline-success right-side2"><i className="bi bi-house-door-fill"></i>Back To Home</a>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="col-md-12 section-border">
                                <div className="table-style table-responsive">
                                    <table className="table table-hover table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th>Product Title</th>
                                                <th>Unit Price</th>
                                                <th>Quantity</th>
                                                <th>Total Price</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><img className="img-style" src={require('../../../assets/images/product_images_2/thumb_image12.jpg')}></img></td>
                                                <td>Dinner Rice package</td>
                                                <td>$120</td>
                                                <td>
                                                    <button className="icon-plus"><i className="bi bi-plus"></i></button>
                                                    1
                                                    <button className="icon-minus"><i className="bi bi-dash"></i></button>
                                                </td>
                                                <td>$120</td>
                                                <td><button className="icon-delete"><i className="bi bi-x-circle"></i></button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 section_01">
                            <div className="col-md-4 block_01">
                                <h4>Shipping Method:</h4>
                                <input type="radio" value="home-delivery" name="shipping-method" /> Home Delivery<br></br>
                                <input type="radio" value="Female" name="shipping-method" /> Pickup
                                <br></br>
                                <div className="section_01 section-border">
                                    <div className="badge">
                                        <Form.Label>Order Date:</Form.Label><br></br>
                                        <Form.Label>
                                            { new Date().toLocaleString("en-US", { day: '2-digit' }) }-
                                            { new Date().toLocaleString("en-US", { month: "long" }) }-
                                            { new Date().getFullYear() }
                                        </Form.Label>
                                    </div>
                                    <div className="right-side badge">
                                        <Form.Label>Order Time:</Form.Label><br></br>
                                        <Form.Label>
                                            { new Date().toLocaleTimeString("en-US") }
                                        </Form.Label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 block_01">
                                <h4>Coupon Code</h4>
                                <p>Enter your coupon code if you have one.</p>
                                <div className="input_field">
                                    <div className="wid">
                                        <Form.Label className="level-style"> Enter your coupon code </Form.Label>
                                        <Form.Control name="coupon" type="text" placeholder="Enter your coupon code" />
                                    </div>
                                </div>
                                <button className="btn btn-warning btn-se"><i className="bi bi-back"></i>Apply Coupon</button>
                            </div>
                            <div className="col-md-4 block_01">
                                <h4>Cart Totals</h4>
                                <div className="table-style table-responsive">
                                    <table className="table table-bordered table-hover">
                                        <tbody>
                                            <tr>
                                                <td>Subtotal</td>
                                                <td>695</td>
                                            </tr>
                                            <tr>
                                                <td>VAT(n%)</td>
                                                <td>104.25</td>
                                            </tr>
                                            <tr>
                                                <td>Discount</td>
                                                <td>0</td>
                                            </tr>
                                            <tr>
                                                <td>Service Charge</td>
                                                <td>0.00</td>
                                            </tr>
                                            <tr>
                                                <td>Grand Total</td>
                                                <td>799.25</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <button className="btn btn-warning btn-se"><i className="bi bi-credit-card"></i>Proceed to Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerOrder;