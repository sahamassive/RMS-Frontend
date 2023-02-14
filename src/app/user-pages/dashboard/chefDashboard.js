import React, { Component, useEffect, useState } from "react";
import "./style.css";
import $ from "jquery";
import "datatables.net";
import { baseUrl, restaurant_id, branch_id, axios, Swal, Form } from "../constant/global";

function ChefDashboard() {
    const [allData, setAllData] = useState();
    const [recentOrder, setRecentOrder] = useState();
    const [recentId, setRecentId] = useState();
    const [yesterday, setYesterday] = useState();
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        axios.get(`${baseUrl}/api/chef-inventory/C-02034260217`).then((response) => {
            setAllData(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get(`${baseUrl}/api/order/recent-order`).then((response) => {
            //console.log(response.data.id);
            setRecentOrder(response.data.data);
            setRecentId(response.data.id);
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

    const yesterdayData = () => {
        axios.get(`${baseUrl}/api/chef-inventory/C-02034260217/yesterday`).then((response) => {
            setYesterday(response.data);
        });
    }

    $.DataTable = require("datatables.net");
    $(document).ready(function () {
        $("#inventory").DataTable();
    });

    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="btn-section">
                            <h4 className="card-title">Dashboard</h4>
                        </div>
                        <div className="col-sm-12 background">
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
                                <a href="" className="btn btn-danger">
                                    <i className="bi bi-alarm"></i>Today
                                </a>
                                <button onClick={yesterdayData} className="btn btn-warning">
                                    <i className="bi bi-arrow-left-right"></i>Yesterday
                                </button>
                                <a href="" className="btn btn-success">
                                    <i className="bi bi-question-square-fill"></i>Last 7 days
                                </a>
                                <a href="" className="btn btn-warning">
                                    <i className="bi bi-arrow-90deg-up"></i>Last month
                                </a>
                            </div>
                            <br></br>
                            <div className="table-responsive">
                                <table className="table table-hover table-bordered">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChefDashboard;