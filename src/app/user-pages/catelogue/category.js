import React, { Component, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import $ from "jquery";
import 'datatables.net'
import './style.css';

function Category() {
    const [allData, setAllData] = useState([]);
    useEffect(() => {
        const url = "http://localhost:8000/api/categories";
        fetch(url)
        .then((response) => response.json())
            .then((response) => {
                setAllData(response.data);
        })
    }, []);

    $.DataTable = require('datatables.net');
    $(document).ready(function () {
        $('#example').DataTable();
    });
    
    return(
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="btn-section">
                            <h4 className="card-title">All Category</h4>
                            <a className="btn-style btn btn-info" href="/catalogue/create-category"><i
                                    className="bi bi-plus"></i>New Category</a>
                        </div>
                        <table id="example" className="table table-striped table-style">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Name</th>
                            <th>Name</th>
                            <th>Name</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                            <tbody>
                                <tr>
                                    <td>dfghrt</td>
                                    <td>dfghrt</td>
                                    <td>dfghrt</td>
                                    <td>dfghrt</td>
                                    <td>dfghrt</td>
                                </tr>
                                <tr>
                                <td>dfghrt</td>
                                <td>dfghrt</td>
                                <td>dfghrt</td>
                                <td>dfghrt</td>
                                <td>dfghrt</td>
                                </tr>
                                <tr>
                                <td>dfghrt</td>
                                <td>dfghrt</td>
                                <td>dfghrt</td>
                                <td>dfghrt</td>
                                <td>dfghrt</td>
                                </tr>
                                <tr>
                                <td>dfghrt</td>
                                <td>dfghrt</td>
                                <td>dfghrt</td>
                                <td>dfghrt</td>
                                <td>dfghrt</td>
                            </tr>
                            <tr>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            </tr>
                            <tr>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                                </tr>
                                <tr>
                                <td>dfghrt</td>
                                <td>dfghrt</td>
                                <td>dfghrt</td>
                                <td>dfghrt</td>
                                <td>dfghrt</td>
                            </tr>
                            <tr>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            </tr>
                            <tr>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                                </tr>
                                <tr>
                                <td>dfghrt</td>
                                <td>dfghrt</td>
                                <td>dfghrt</td>
                                <td>dfghrt</td>
                                <td>dfghrt</td>
                            </tr>
                            <tr>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            </tr>
                            <tr>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                                </tr>
                                <tr>
                                <td>dfghrt</td>
                                <td>dfghrt</td>
                                <td>dfghrt</td>
                                <td>dfghrt</td>
                                <td>dfghrt</td>
                            </tr>
                            <tr>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            </tr>
                            <tr>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                            <td>dfghrt</td>
                        </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Category;