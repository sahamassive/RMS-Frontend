import React, { useEffect, useState } from "react";
import "../style.css";
import $ from "jquery";
import "datatables.net";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../../constant/global";

function AllTypes() {
    const [allData, setAllData] = useState("");

    useEffect(() => {
        axios.get(`${baseUrl}/api/table-type-list/${restaurant_id}`).then((response) => {
            //console.log(allData);
            setAllData(response.data);
    });
    }, []);

    const getData = () => {
        axios.get(`${baseUrl}/api/table-type-list/${restaurant_id}`).then((response) => {
            setAllData(response.data);
        });
    };

    const statusChange = (id) => {
        axios.get(`${baseUrl}/api/table-type-status/${id}`)
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
                    <h4 className="card-title">All Table Types</h4>
                    <a
                        className="btn-style btn btn-primary"
                        href="/table/table-type"
                    >
                        <i className="bi bi-plus-square"></i>New Table Type
                    </a>
                </div>
                <div className="background table-responsive table-style table-background">
                    {allData ? (
                        <table id="suppliers" className="table table-striped table-style">
                            <thead>
                                <tr>
                                    <th>SI.</th>
                                    <th>Type Name</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allData.map((data, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{data.type}</td>
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
                                            <a
                                                className="btn btn-warning"
                                                href={`/table/edit-table-type/${data.id}`}
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

export default AllTypes;