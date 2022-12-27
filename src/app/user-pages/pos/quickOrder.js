import React, { Component, useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import './style.css';


function QuickOrder() {
    const [allData, setAllData] = useState([]);
    useEffect(() => {
        const url = "";
        fetch(url)
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                setAllData(response.data)
        })
    },[]);
    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="section_01">
                            <div className="col-md-7">
                                <h4 className="card-title">Quick Order:</h4>
                            </div>
                            <div className="col-md-5 inner-addon right-addon">
                                <Form.Control type="text" placeholder="Search"></Form.Control>
                            </div>
                        </div>
                        <div>
                            <table className="table table-hover table-bordered">
                                <thead></thead>
                                <tbody></tbody>
                            </table>
                        </div>
                        <div className="input_field section-01">
                            <select className="select2">
                                <option value="">Select order type</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <select className="select2">
                                <option value="">Select waiter</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <select className="select2">
                                <option value="">Select table</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div>
                            <br></br>
                            <table className="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Variernt</th>
                                        <th>Unit Price</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td><i className="bi bi-plus"></i> <i className="bi bi-minus"></i></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuickOrder;