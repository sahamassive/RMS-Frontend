import React, { Component, useEffect, useState } from "react";
import "./style.css";
import $ from "jquery";
import "datatables.net";
import { baseUrl, restaurant_id, branch_id, axios, Swal, Form } from "../constant/global";

function CustomerDashboard() {
    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="btn-section">
                            <h4 className="card-title">Dashboard</h4>
                        </div>
                        <div className="col-ms-12 background">
                        <h1>Customer Dashboard</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerDashboard;