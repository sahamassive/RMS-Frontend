import $ from "jquery";
import "datatables.net";
import React, { useEffect, useState } from "react";
import '../style.css';
import { Form } from "react-bootstrap";
import { baseUrl, resturant_id } from "../../constant/global";
import axios from "axios";
import Swal from 'sweetalert2';

function AllDiscount() {
    const [allData, setAllData] = useState("");

    useEffect(() => {
        axios.get(`${baseUrl}/api/discounts`).then((response) => {
        setAllData(response.data);
        console.log(allData);
    });
    }, []);

    const getData = () => {
        axios.get(`${baseUrl}/api/discounts`).then((response) => {
        setAllData(response.data);
    });
    };
    const statusChange = (id) => {
        axios.get(`${baseUrl}/api/discount-status/${id}`)
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
                            <h4 className="card-title">All Discounts</h4>
                            <a
                                className="btn-style btn btn-info"
                                href="/discount/new-discount"
                            >
                                <i className="bi bi-plus-square"></i>New Discount
                            </a>
                        </div>
                        <div className="table-responsive table-style table-background">
                            {allData ? (
                                <table id="restaurant" className="table table-striped table-style">
                                    <thead>
                                        <tr>
                                            <th>SI.</th>
                                            <th>Image</th>
                                            <th>Food Name</th>
                                            <th>Discount(%)</th>
                                            <th>Status</th>
                                            <th>Start</th>
                                            <th>End</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allData.map((data, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <img
                                                        src={`${baseUrl}/foods/small/${data.image}`}
                                                        width="50px"
                                                    />
                                                </td>
                                                <td>{data.name}</td>
                                                <td>{data.discount} %</td>
                                                <td>
                                                    <button
                                                        className={data.status ? "btn btn-success" : "btn btn-danger"}
                                                        onClick={() => {
                                                            statusChange(data.id);
                                                        }}
                                                    >
                                                        {data.status ? "Active" : "Not Active"}
                                                    </button>
                                                </td>
                                                <td>
                                                    {new Date(data.starting_date).toLocaleString("en-US", { day: "2-digit" })}-
                                                    {new Date(data.starting_date).toLocaleString("en-US", { month: "long" })}-
                                                    {new Date(data.starting_date).getFullYear()}
                                                    <br></br>
                                                    {data.starting_time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                                                </td>
                                                <td>
                                                    {new Date(data.ending_date).toLocaleString("en-US", { day: "2-digit" })}-
                                                    {new Date(data.ending_date).toLocaleString("en-US", { month: "long" })}-
                                                    {new Date(data.ending_date).getFullYear()}
                                                    <br></br>
                                                    {data.ending_time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                                                </td>
                                                <td>
                                                    <a
                                                        className="btn btn-warning"
                                                        href={`/discount/edit-discount/${data.id}`}
                                                    >
                                                        <i className="bi bi-pencil-square"></i>Edit
                                                    </a>
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
export default AllDiscount;