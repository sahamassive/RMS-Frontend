import React, { useState, useEffect } from "react";
import "./style.css";
import $ from "jquery";
import "datatables.net";
import { baseUrl, axios } from "../constant/global";
import { check } from "../constant/check";

function SuperAdmin() { 
    const [allData, setAllData] = useState([]);
    const token = sessionStorage.getItem("token");

    const getEmployee = (filter) => {
        axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
        axios.get(`${baseUrl}/api/get-employee/${filter}`).then((response) => {
          setAllData(response.data);
        });
    };
    
    useEffect(() => {
        getEmployee('super-admin');
    }, []);

    $.DataTable = require("datatables.net");
    $(document).ready(function () {
      $("#allEmployee").DataTable();
    });
    
    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="btn-section">
                            <h4 className="card-title">Super Admin</h4>
                            <a className="btn-style btn btn-info" href="/super-admin/employee/registration"><i className="bi bi-plus-square"></i>New Registration</a>
                        </div>
                        <div className="table-responsive table-style">
                            {allData ? (
                                <table
                                    id="allEmployee"
                                    className="table table-striped table-style"
                                >
                                    <thead>
                                        <tr>
                                            <th>SL.</th>
                                            <th> Image</th>
                                            <th> Name</th>
                                            <th>status</th>
                                            <th> Phone</th>
                                            <th> Email </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allData.map((data, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <img
                                                        src={`${baseUrl}/employee/small/${data.image}`}
                                                        width="80px"
                                                        height="50px"
                                                    />
                                                </td>
                                                <td>{data.first_name} {data.last_name}</td>
                                                <td>
                                                    <button
                                                        className={
                                                            data.status ? "btn btn-success" : "btn btn-danger"
                                                        }
                                                    >
                                                        {data.status ? "Active" : "Not Active"}
                                                    </button>
                                                </td>
                                                <td>{data.phone}</td>
                                                <td>{data.email}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : 0}
                            <br></br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuperAdmin;