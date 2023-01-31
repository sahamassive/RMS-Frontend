import React, { Component, useEffect, useState } from "react";
import "../style.css";
import {baseUrl, restaurant_id, axios, Swal, Form} from "../../constant/global";

function NewInvoive() {
    const [invoiceId, setInvoiceId] = useState();

    const generateID = (id) => {
        let x = 'INV-' + Math.floor((Math.random() * 500) + 100) + '-' + Math.floor((Math.random() * 99) + 10) + '-' + Math.floor((Math.random() * 999) + 500);
        setInvoiceId(x);
    }

    const Insert = async (event) => {

    }
    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="btn-section">
                            <h4 className="card-title">Create New Invoive</h4>
                            <a className="btn-style btn btn-primary" href="/catalogue/category">
                                <i className="bi bi-list-columns-reverse"></i>All Invoices
                            </a>
                        </div>
                        <div className="col-sm-12 background">
                            <div>
                                <div className="input_field two_part">
                                    <div className="wid">
                                        <Form.Label className="label-style">
                                            Supplier name/Company name
                                        </Form.Label>
                                        <select>
                                            <option>Select from here...</option>
                                        </select>
                                    </div>
                                    <div className="wid">
                                        <Form.Label className="label-style">Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            onChange={(event) => {
                                                generateID();
                                            }}
                                        ></Form.Control>
                                    </div>
                                </div>
                                <div className="input_field two_part">
                                <div className="wid">
                                    <Form.Label className="label-style">
                                        Invoice ID
                                    </Form.Label>
                                        <Form.Control id="id-style"
                                            value={invoiceId ? invoiceId : null}
                                            type="text"
                                            readOnly
                                ></Form.Control>
                                </div>
                                </div>
                                <button className="btn btn-warning top-space" onClick={Insert}>
                                    <i className="bi bi-save-fill"></i>Insert
                                </button>
                        
                                <br></br> <br></br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default NewInvoive;