import React, { Component, useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "../style.css";
import { baseUrl, restaurant_id, axios, Swal, Form  } from "../../constant/global";

function AllSupplier() {
    const [allData, setAllData] = useState("");

    useEffect(() => {
      axios.get(`${baseUrl}/api/suppliers/${restaurant_id}`).then((response) => {
        setAllData(response.data);
        console.log(allData);
      });
    }, []);
  
    const getData = () => {
      axios.get(`${baseUrl}/api/suppliers/${restaurant_id}`).then((response) => {
        setAllData(response.data);
      });
    };
  
  
    const statusChange = (id) => {
      axios.get(`${baseUrl}/api/supplier-status/${id}`)
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
      $("#suppliers").DataTable();
    });
    
    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="btn-section">
                            <h4 className="card-title">All Suppliers</h4>
                            <a
                                className="btn-style btn btn-info"
                                href="/inventory/new-supplier"
                            >
                                <i className="bi bi-plus-square"></i>New suppliers
                            </a>
                        </div>
                        <div className="background table-responsive table-style table-background">
                            {allData ? (
                                <table id="suppliers" className="table table-striped table-style">
                                    <thead>
                                        <tr>
                                            <th>SI.</th>
                                            <th>Supplier Name</th>
                                            <th>Market Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Status</th>
                                            <th>Address</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allData.map((data, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{data.supplier_name}</td>
                                                <td>{data.market_name}</td>
                                                <td>{data.email}</td>
                                                <td>{data.phone}</td>
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
                                                <td>{data.address}</td>
                                                <td>
                                                    <a
                                                        className="btn btn-warning"
                                                        href={`/inventory/edit-supplier/${data.id}`}
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

export default AllSupplier;