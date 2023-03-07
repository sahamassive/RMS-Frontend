import React, { Component, useEffect, useState } from "react";
import "./style.css";
import $ from "jquery";
import "datatables.net";
import {
  baseUrl,
  restaurant_id,
  branch_id,
  axios,
  Swal,
  Form,
} from "../constant/global";
const token = sessionStorage.getItem("token");
const loginType = sessionStorage.getItem("loginType");
const emp_id = sessionStorage.getItem("emp_id");

function WaiterDashboard() {
  const [id, setId] = useState();
  const [allData, setAllData] = useState();
  const [refresh, setRefresh] = useState(true);
  const [pending, setPending] = useState();
  const [running, setRunning] = useState();
  const [completed, setCompleted] = useState();

  if (loginType == "Super-Admin" || loginType == "Waiter") {
  } else {
    window.location.href = "/";
  }

  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios.get(`${baseUrl}/api/waiter-with-orders/${emp_id}`).then((response) => {
      setId(response.data.id);
      setAllData(response.data.data);
    });
    setRefresh(false);
  }, [refresh]);

  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios.get(`${baseUrl}/api/waiter-with-orders-count/${emp_id}`).then((response) => {
      setPending(response.data.pending[0].count);
      setRunning(response.data.running[0].count);
      setCompleted(response.data.completed[0].count);
    });
    setRefresh(false);
  }, [refresh]);


  $.DataTable = require("datatables.net");
  $(document).ready(function () {
    $("#chefInventory").DataTable();
  });

  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">Dashboard</h4>
            </div>
            <div className="col-ms-12">
              <div className="card-section">
              <div className="single-card">
              Pending Order
              <br></br>
              <strong>
                <i className="bi bi-box-arrow-left"></i> {pending ? pending : 0}
              </strong>
                </div>
            <div className="single-card">
              Running Order
              <br></br>
              <strong>
                <i className="bi bi-arrow-down-up"></i> {running ? running : 0}
              </strong>
                </div>
                <div className="single-card">
                Completed Order
                <br></br>
                <strong>
                  <i className="bi bi-hand-thumbs-up-fill"></i> {completed ? completed : 0}
                </strong>
                  </div>
                </div>
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
                                        <th>Table</th>
                                        <th>Customer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allData ?
                                        allData.map((data) => (
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
                                                    <td><span>{data.table_name}({data.table_type})</span></td>
                                              <td>
                                                <span>{data.customer_name ? data.customer_name : 'N/A'}</span>
                                                <br></br>
                                                <span>{data.customer_phone}</span>
                                              </td>
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

export default WaiterDashboard;
