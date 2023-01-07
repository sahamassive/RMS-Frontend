import React, { Component, useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "../style.css";
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000";

function EmployeeLeave() {
    const [allData, setAllData] = useState("");

    useEffect(() => {
        axios.get(`${baseUrl}/api/categories`).then((response) => {
            setAllData(response.data);
            console.log(allData);
        });
    }, []);

    $.DataTable = require("datatables.net");
    $(document).ready(function () {
        $("#department").DataTable();
    });

    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Employee leaves:</h4>
                        <div className="btn_section btn_style">
                            <a href="/hr/leave" className="btn btn-primary gap"><i className="bi bi-list"></i>All leaves</a>
                            <a href="/hr/new-leave" className="btn btn-info gap"><i className="bi bi-plus-square"></i>New leave</a>
                            <a href="" className="btn btn-success gap"><i className="bi bi-arrow-90deg-left"></i>Yesterday</a>
                            <a href="" className="btn btn-warning gap"><i className="bi bi-arrow-up-left-square"></i>Last week</a>
                            <a href="" className="btn btn-light gap"><i className="bi bi-caret-left-square"></i>Last month</a>
                        </div>
                        <br></br>
                        <div className="table-responsive table-style">
                            {allData ? (
                                <table id="department" className="table table-striped table-style">
                                    <thead>
                                        <tr>
                                            <th>SI</th>
                                            <th>Employee Name</th>
                                            <th>Employee ID</th>
                                            <th>Reason</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Number of Days</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allData.map((data) => (
                                            <tr>
                                                <td>{data.category_name}</td>
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

export default EmployeeLeave;