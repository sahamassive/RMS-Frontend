import React, { Component, useEffect, useState } from "react";
import "./style.css";
import $ from "jquery";
import "datatables.net";
import { baseUrl, restaurant_id, branch_id, axios, Swal, Form } from "../constant/global";

function ChefDashboard() {
    const [allData, setAllData] = useState();
    const [recentOrder, setRecentOrder] = useState();
    const [recentId, setRecentId] = useState();
    const [refresh, setRefresh] = useState(true);
    const [attendOrder, setAttendOrder] = useState();

    useEffect(() => {
        axios.get(`${baseUrl}/api/order/recent-order`).then((response) => {
            setRecentOrder(response.data.data);
            setRecentId(response.data.id);
        });
        setRefresh(false);
    }, [refresh]);

    useEffect(() => {
        axios.get(`${baseUrl}/api/chef-inventory/C-02034260217/today`).then((response) => {
            setAllData(response.data);
        });
        setRefresh(false);
    }, [refresh]);

    useEffect(() => {
        axios.get(`${baseUrl}/api/chef-attend-order/C-02034260217/today`).then((response) => {
            setAttendOrder(response.data);
        });
        setRefresh(false);
    }, [refresh]);

    const ConfirmItem = (order_id, item_code, quantity) => {
        axios
            .get(`${baseUrl}/api/chef-order/C-02034260217/${order_id}/${item_code}/${quantity}`)
            .then((response) => {
                if (response.data.msg) {
                    Swal.fire({
                        title: response.data.msg,
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                }
                else {
                    Swal.fire({
                        title: 'You need more ' + response.data + ' for this item',
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            })
        setRefresh(true);
    }

    const filterSet = (fil) => { 
        axios.get(`${baseUrl}/api/chef-inventory/C-02034260217/${fil}`).then((response) => {
            setAllData(response.data);
        });
    }

    const attendOrderFilter = (fil) => { 
        axios.get(`${baseUrl}/api/chef-attend-order/C-02034260217/${fil}`).then((response) => {
            setAttendOrder(response.data);
        });
    }

    const completeOrder = (order_id, item_code) => {
        axios
            .get(`${baseUrl}/api/chef-attend-order-status/${order_id}/${item_code}`)
            .then((response) => {
                Swal.fire({
                    title: response.data.msg,
                    icon: "success",
                    confirmButtonText: "OK",
                });
            });
        setRefresh(true);
    }

    $.DataTable = require("datatables.net");
    $(document).ready(function () {
        $("#chefInventory").DataTable();
    });

    // $(document).ready(function () {
    //     $("#chefAttendedInventory").DataTable();
    // });

    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="btn-section">
                            <h4 className="card-title">Dashboard</h4>
                        </div>
                        <div className="col-sm-12 background">
                            <br></br>
                            <h4 className="card-title">Running Order:</h4>
                            <div className="two_part">
                                <button
                                    onClick={() => {
                                        attendOrderFilter('today')
                                    }}
                                    className="btn btn-danger">
                                    <i className="bi bi-alarm"></i>Today
                                </button>
                                <button
                                    onClick={() => {
                                        attendOrderFilter('yesterday')
                                    }}
                                    className="btn btn-warning">
                                    <i className="bi bi-arrow-left-right"></i>Yesterday
                                </button>
                                <button
                                    onClick={() => {
                                        attendOrderFilter('week')
                                    }}
                                    className="btn btn-success">
                                    <i className="bi bi-question-square-fill"></i>Last 7 days
                                </button>
                                <button
                                    onClick={() => {
                                        attendOrderFilter('month')
                                    }}
                                    className="btn btn-warning">
                                    <i className="bi bi-arrow-90deg-up"></i>Last month
                                </button>
                            </div>
                            <br></br>
                            <div className="table-responsive table-style table-background">
                                <table id="chefAttendedInventory" className="table table-hover table-striped table-style">
                                    <thead>
                                        <tr>
                                            <th>SL.</th>
                                            <th>KOT</th>
                                            <th>Image</th>
                                            <th>Food Name</th>
                                            <th>Quantity</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {attendOrder ?
                                            attendOrder.map((data, index) =>
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{data.kot}</td>
                                                    <td>
                                                        <img
                                                            src={`${baseUrl}/foods/small/${data.image}`}
                                                            width="80px"
                                                            height="50px"
                                                        />
                                                    </td>
                                                    <td>{data.name}</td>
                                                    <td>{data.quantity}</td>
                                                    <td>{data.status}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => {
                                                                completeOrder(data.order_id, data.item_code);
                                                            }}
                                                            className="btn btn-dark">Complete</button>
                                                    </td>
                                                </tr>
                                            )
                                            : null}
                                    </tbody>
                                </table>
                                <br></br>
                                <br></br>
                            </div>
                        </div>
                        <div className="col-sm-12 background">
                            <h4 className="card-title">Pending Order:</h4>
                            <div className="container">
                                <div className="row">
                                    {recentId ? recentId.map((id) => (
                                        <div className="col col-md-4 section-border">
                                            <p className="order-id">Order ID: <strong>{id.order_id}</strong></p>
                                            <div className="row">
                                                {recentOrder ?
                                                    recentOrder.map((data) => (
                                                        id.order_id == data.order_id ?
                                                            <div className="col">
                                                                <div className="item-border">
                                                                    <div className="two_part">
                                                                        <img
                                                                            className="food-image"
                                                                            src={`${baseUrl}/foods/small/${data.image}`}
                                                                            alt={data.name}
                                                                        ></img>
                                                                        <p className="img-level cart-height">
                                                                            {data.name}
                                                                        </p>
                                                                    </div>
                                                                    <p className="img-level cart-height">
                                                                        Quantity: <strong>{data.quantity} </strong>
                                                                        <br></br>
                                                                        <span>Status: {data.order_status}</span>
                                                                    </p>
                                                                    <button
                                                                        className="btn btn-block btn-primary"
                                                                        onClick={() =>
                                                                            ConfirmItem(id.order_id, data.item_code, data.quantity)
                                                                        }
                                                                    >
                                                                        <i className="bi bi-check2-square"></i>Confirm
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-block btn-danger"
                                                                    >
                                                                        <i className="bi bi-x-circle"></i>Cancel
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            : null
                                                    ))
                                                    : null}
                                            </div>
                                        </div>
                                    ))
                                        : null}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 background">
                            <br></br>
                            <h4 className="card-title">Today's taken inventory item:</h4>
                            <div className="two_part">
                                <button
                                    onClick={() => {
                                        filterSet('today')
                                    }}
                                    className="btn btn-danger">
                                    <i className="bi bi-alarm"></i>Today
                                </button>
                                <button
                                    onClick={() => {
                                        filterSet('yesterday')
                                    }}
                                    className="btn btn-warning">
                                    <i className="bi bi-arrow-left-right"></i>Yesterday
                                </button>
                                <button
                                    onClick={() => {
                                        filterSet('week')
                                    }}
                                    className="btn btn-success">
                                    <i className="bi bi-question-square-fill"></i>Last 7 days
                                </button>
                                <button
                                    onClick={() => {
                                        filterSet('month')
                                    }}
                                    className="btn btn-warning">
                                    <i className="bi bi-arrow-90deg-up"></i>Last month
                                </button>
                            </div>
                            <br></br>
                            <div className="table-responsive table-style table-background">
                                <table id="chefInventory" className="table table-hover table-striped table-style">
                                    <thead>
                                        <tr>
                                            <th>SL.</th>
                                            <th>Date</th>
                                            <th>Item Name</th>
                                            <th>Total Quantity</th>
                                            <th>Used Quantity</th>
                                            <th>In Hand</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allData ?
                                            allData.map((data, index) =>
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        {new Date(data.created_at).toLocaleString("en-US", { day: "2-digit" })}-
                                                        {new Date(data.created_at).toLocaleString("en-US", { month: "long" })}-
                                                        {new Date(data.created_at).getFullYear()}
                                                        <br></br>
                                                        {new Date(data.created_at).toLocaleTimeString("en-US")}
                                                    </td>
                                                    <td>{data.ingredient}</td>
                                                    <td>
                                                        {data.quantity}
                                                        {data.unit === 'Kg' ? "Gm" : null}
                                                        {data.unit === 'L' ? "Gm" : null}
                                                        {data.unit === 'Ps' ? data.unit : null}
                                                        {data.unit === 'Gm' ? data.unit : null}
                                                    </td>
                                                    <td>
                                                        {data.used_quantity}
                                                        {data.unit === 'Kg' ? "Gm" : null}
                                                        {data.unit === 'L' ? "Gm" : null}
                                                        {data.unit === 'Ps' ? data.unit : null}
                                                        {data.unit === 'Gm' ? data.unit : null}
                                                    </td>
                                                    <td>
                                                        {data.quantity - data.used_quantity}
                                                        {data.unit === 'Kg' ? "Gm" : null}
                                                        {data.unit === 'L' ? "Gm" : null}
                                                        {data.unit === 'Ps' ? data.unit : null}
                                                        {data.unit === 'Gm' ? data.unit : null}
                                                    </td>
                                                </tr>
                                            )
                                            : null}
                                    </tbody>
                                </table>
                                <br></br>
                                <br></br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChefDashboard;