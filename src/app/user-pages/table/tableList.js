import React, { useEffect, useState } from "react";
import "./style.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";

function TableList() {
    const [allData, setAllData] = useState("");
    const [status, setStatus] = useState();

    useEffect(() => {
        axios.get(`${baseUrl}/api/tables/${restaurant_id}`).then((response) => {
            //console.log(allData);
            setAllData(response.data);
    });
    }, []);

    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="btn-section">
                            <h4 className="card-title">All Tables</h4>
                            <a className="btn-style btn btn-info" href="/table/new-table"><i className="bi bi-card-list"></i> All
                                Table</a>
                        </div>
                        <div className="background table-responsive table-style table-background">
                            {allData ? (
                                <table id="suppliers" className="table table-striped table-style">
                                    <thead>
                                        <tr>
                                            <th>SI.</th>
                                            <th>Table Name</th>
                                            <th>Table Type</th>
                                            <th>Status</th>
                                            <th>Number Of Seat</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allData.map((data, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{data.table_name}</td>
                                                <td>{data.table_type}</td>
                                                <td>
                                                    {data.status == "free" ? (<button className="btn btn-primary" disabled>{data.status}</button>) : null}
                                                    {data.status == "busy" ? (<button className="btn btn-dark" disabled>{data.status}</button>) : null}
                                                    {data.status == "booked" ? (<button className="btn btn-danger" disabled>{data.status}</button>) : null}
                                                </td>
                                                <td>{data.seat}</td>
                                                <td>
                                                    <a
                                                        className="btn btn-warning"
                                                        href={`/table/edit-table/${data.table_id}`}
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

export default TableList;