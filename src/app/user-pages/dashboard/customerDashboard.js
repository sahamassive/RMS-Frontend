import React, { Component, useEffect, useState } from "react";
import "./style.css";
import $ from "jquery";
import "datatables.net";
import { baseUrl, restaurant_id, branch_id, axios, Swal, Form } from "../constant/global";

function CustomerDashboard() {
    const [customersOrders, setCustomerOrders] = useState();
    const [id, setId] = useState();
    const emp_id = sessionStorage.getItem("customer_id");
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        axios
            .get(`${baseUrl}/api/customer-order/${emp_id}`)
            .then((response) => { 
                setId(response.data.id)
                setCustomerOrders(response.data.data);
            })
        setRefresh(false)
    },[refresh])

    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="btn-section">
                            <h4 className="card-title">Dashboard</h4>
                        </div>
                        <div className="col-ms-12">
                            {id ?
                                id.map((ids) => (
                                    <div className="order_section background">
                                        <p className="order-id2">Order ID: <button className="btn btn-outline-dark">{ids.order_id}</button></p>
                                        <div className="table-responsive">
                                            <table className="table-borderless wid">
                                                <thead>
                                                    <tr className="order-id2 bg-coloring">
                                                        <th>Image</th>
                                                        <th>Food Name</th>
                                                        <th>Status</th>
                                                        <th>Quantity</th>
                                                        <th>Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {customersOrders ?
                                                        customersOrders.map((data) => (
                                                            ids.order_id == data.order_id ?
                                                                <tr className="order-id2">
                                                                    <td>
                                                                        <img
                                                                            src={`${baseUrl}/foods/small/${data.image}`}
                                                                            width="80px"
                                                                            height="50px"
                                                                        />
                                                                    </td>
                                                                    <td><span>{data.name}</span></td>
                                                                    <td>
                                                                        {data.status == "pending" ? (<button className="btn btn-primary" disabled>{data.status}</button>) : null}
                                                                        {data.status == "running" ? (<button className="btn btn-dark" disabled>{data.status}</button>) : null}
                                                                        {data.status == "completed" ? (<button className="btn btn-danger" disabled>{data.status}</button>) : null}
                                                                    </td>
                                                                    <td><span>{data.quantity}</span></td>
                                                                    <td><span>{data.grand_price}(Tk.)</span></td>
                                                                </tr>
                                                                : null
                                                        ))
                                                        : null}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))
                                :
                                <h1 className="background order-id">No Order found.</h1>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerDashboard;