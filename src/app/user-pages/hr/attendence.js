import React, { Component, useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./style.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";

function Attendence() {
    const [allData, setAllData] = useState("");

    useEffect(() => {
        axios.get(`${baseUrl}/api/categories`).then((response) => {
            setAllData(response.data);
            console.log(allData);
        });
    }, []);

    $.DataTable = require("datatables.net");
    $(document).ready(function () {
        $("#category").DataTable();
    });

    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Attendence Report:</h4>
                        <div className="btn_section btn_style">
                            <a href="" className="btn btn-primary gap"><i className="bi bi-person-rolodex"></i>Chef</a>
                            <a href="" className="btn btn-info gap"><i className="bi bi-person-bounding-box"></i>Manager</a>
                            <a href="" className="btn btn-success gap"><i className="bi bi-person-circle"></i>Waiter</a>
                            <a href="" className="btn btn-warning gap"><i className="bi bi-person-workspace"></i>Sales & Marketing</a>
                            <a href="" className="btn btn-primary gap"><i className="bi bi-calendar3"></i>Report By Date</a>
                            <a href="" className="btn btn-info gap"><i className="bi bi-view-list"></i>Report By ID</a>
                        </div>
                        <br></br>
                        <div className="table-responsive table-style">
                        {allData ? (
                            <table id="category" className="table table-striped table-style">
                                <thead>
                                    <tr>
                                        <th>SI</th>
                                        <th>Name</th>
                                        <th>Employee ID</th>
                                        <th>Date</th>
                                        <th>Sign In</th>
                                        <th>Sign Out</th>
                                        <th>Stay</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allData.map((data, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{data.description}</td>
                                            <td>{data.category_discount}</td>
                                            <td>{data.category_discount}</td>
                                            <td>{data.category_discount}</td>
                                            <td>{data.category_discount}</td>
                                            <td>{data.category_discount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : null}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Attendence;