import React, { useEffect, useState } from "react";
import '../style.css';
import { Form } from "react-bootstrap";
import { baseUrl, resturant_id } from "../../constant/global";
import axios from "axios";
import Swal from 'sweetalert2';

function NewCoupon() {
    const [foodName, setFoodName] = useState();
    const [food, setFood] = useState();
    const [branchId, setBranchId] = useState();
    
    const Insert = () => {

    }

    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="btn-section">
                            <h4 className="card-title">Create New Coupon</h4>
                            <a className="btn-style btn btn-info" href="/waste/all"><i className="bi bi-card-list"></i> All
                                Coupon</a>
                        </div>
                        <div className="col-sm-12 background">
                            <div className='input_field two_part'>
                                <div className="wid">
                                    <Form.Label className="label-style">Coupon/Promo Code/Voucher</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="coupon/voucher/promo code..."
                                    ></Form.Control>
                                </div>
                                <div className="wid">
                                <Form.Label className="label-style">Discount amount</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Discount Amount"
                                ></Form.Control>
                            </div>
                            </div>
                            <div className='input_field two_part'>
                                <div className="wid">
                                    <Form.Label className="label-style">Starting Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="coupon/voucher/promo code..."
                                    ></Form.Control>
                                </div>
                                <div className="wid">
                                    <Form.Label className="label-style">Starting time</Form.Label>
                                    <Form.Control
                                        type="time"
                                        placeholder="coupon/voucher/promo code..."
                                    ></Form.Control>
                                </div>
                            </div>
                            <div className='input_field two_part'>
                                <div className="wid">
                                    <Form.Label className="label-style">Ending Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="coupon/voucher/promo code..."
                                    ></Form.Control>
                                </div>
                                <div className="wid">
                                    <Form.Label className="label-style">Ending time</Form.Label>
                                    <Form.Control
                                        type="time"
                                        placeholder="coupon/voucher/promo code..."
                                    ></Form.Control>
                                </div>
                            </div>
                            <button onClick={Insert} className="btn btn-warning top-space"><i
                                className="bi bi-save-fill"></i>Insert</button>
                            <br></br>
                            <br></br>
                            <br></br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewCoupon;