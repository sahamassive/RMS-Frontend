import $ from "jquery";
import "datatables.net";
import React, { useEffect, useState } from "react";
import './style.css';
import { Form } from "react-bootstrap";
import { baseUrl, resturant_id } from "../constant/global";
import axios, { all } from "axios";
import Swal from 'sweetalert2';


function AllOrder() {
    const [allData, setAllData] = useState("");
    const [id, setId] = useState();
    const [chef, setChef] = useState();
    const [status, setStatus] = useState();
    const allStatus = [
        {
            id: 1,
            status: "pending"
        },
        {
            id: 2,
            status: "running"
        },
        {
            id: 3,
            status: "completed"
        },
    ]

    useEffect(() => {
        axios.get(`${baseUrl}/api/orders`).then((response) => {
            console.log(response.data.id);
            setAllData(response.data.data);
            setId(response.data.id)
        
    });
    }, []);

    useEffect(() => {
        let filter = "chef";
        axios.get(`${baseUrl}/api/get-employee/${filter}`).then((response) => {
            setChef(response.data);
            console.log(allData);
        });
    }, []);

    const getData = () => {
        axios.get(`${baseUrl}/api/orders`).then((response) => {
        setAllData(response.data);
    });
    };
    const statusChange = (id) => {
        axios.get(`${baseUrl}/api/coupon-status/${id}`)
            .then((response) => {
            Swal.fire({
                title: response.data.msg,
                icon: "success",
                confirmButtonText: "OK",
            });
        getData();
        });
    };
    
    $.DataTable = require("datatables.net");
    $(document).ready(function () {
        $("#restaurant").DataTable();
    });
    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="btn-section">
                            <h4 className="card-title">All Orders</h4>
                            <a
                                className="btn-style btn btn-info"
                                href="/pos/quick-order"
                            >
                                <i className="bi bi-plus-square"></i>New Order
                            </a>
                        </div>
                        <div className="table-responsive table-style table-background">
                            {id ? (
                                <table id="restaurant" className="table table-striped table-style">
                                    <thead>
                                        <tr>
                                            <th>SI.</th>
                                            <th>KOT</th>
                                            <th>Order Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {id.map((ids, index) => (
                                            
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{ids.order_id}</td>
                                                <td>
                                                    <div className="table-responsive table-style table-background">
                                                            <table id="restaurant" className="table table-striped table-style">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Food name</th>
                                                                        <th>Image</th>
                                                                        <th>Quantity</th>
                                                                        <th>Status</th>
                                                                        <th>Chef</th>
                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                {allData.map((data, index) => (           
                                                                        ids.order_id === data.order_id ? 
                                                                        <tr>
                                                                        <td>{data.name}</td>
                                                                        <td>
                                                                            <img
                                                                                src={`${baseUrl}/foods/small/${data.image}`}
                                                                                width="80px"
                                                                                height="50px"
                                                                            />
                                                                        </td>
                                                                        <td>{data.quantity}</td>
                                                                        <td>
                                                                                <select
                                                                                    onChange={(event) => {
                                                                                        setStatus(event.target.value)
                                                                                    }}
                                                                                >
                                                                                    {allStatus.map((item) =>
                                                                                        <option value={item.status}>{item.status}</option> 
                                                                                    )}                                                                                                                                                       
                                                                                </select>
                                                                                <br></br>
                                                                                <button className="btn btn-primary">Confirm</button>
                                                                        </td>
                                                                            <td>
                                                                                <select>
                                                                                    <option>Select Chef...</option>
                                                                                    {chef ? 
                                                                                        chef.map((data) => 
                                                                                            <option value={data.emp_id}>
                                                                                                {data.first_name} {data.last_name}
                                                                                            </option>
                                                                                        )                                                                                     
                                                                                    : null }
                                                                                </select>
                                                                                <br></br>
                                                                                <button className="btn btn-warning">Confirm</button>
                                                                        </td>
                                                                    </tr>
                                                                        : null
                                                                    

                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        <br></br>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : null}
                            <br></br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllOrder;