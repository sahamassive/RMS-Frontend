import React,  { useEffect, useState } from 'react';
import $ from "jquery";
import "datatables.net";
import '../style.css';
import { baseUrl, restaurant_id, axios, Swal, Form  } from "../../constant/global";

function InventoryList() {
    const [allData, setAllData] = useState();

    useEffect(() => {
        axios.get(`${baseUrl}/api/inventories`).then((response) => {
            setAllData(response.data);
        })
    }, []);
    
    $.DataTable = require("datatables.net");
    $(document).ready(function () {
        $("#inventory").DataTable();
    });

    return (
        <div>
        <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
            <div className="card-body">
                <div className="btn-section">
                    <h4 className="card-title">All wastage</h4>
                    <a className="btn-style btn btn-info" href="/inventory/new-inventory"><i className="bi bi-plus-square"></i>New Inventory</a>
                </div>
                <div className="background table-responsive table-style table-background">
                    {allData ? (
                        <table id="inventory" className="table table-striped table-style">
                            <thead>
                                <tr>
                                    <th>SI.</th>
                                    <th>Ingredient Name</th>
                                    <th>Available Stock</th>
                                    <th>Unit</th>
                                    <th>Unit Price</th>
                                    <th>Arrival Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allData.map((data, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{data.ingredient}</td>
                                        <td>
                                            {data.unit === 'Kg' ? data.current_quantity / 1000 : null}
                                            {data.unit === 'L' ? data.current_quantity / 900 : null}
                                            {data.unit === 'Ps' ? data.current_quantity : null}
                                            {data.unit === 'Gm' ? data.current_quantity : null}
                                        </td>
                                        <td>{data.unit}</td>
                                        <td>
                                            {data.unit === 'Kg' ? data.current_unit_price * 1000 : null}
                                            {data.unit === 'L' ? data.current_unit_price * 900 : null}
                                            {data.unit === 'Ps' ? data.current_unit_price : null}
                                            {data.unit === 'Gm' ? data.current_unit_price : null}
                                        </td>
                                        <td>
                                            {new Date(data.created_at).toLocaleString("en-US", { day: "2-digit" })}-
                                            {new Date(data.created_at).toLocaleString("en-US", { month: "long" })}-
                                            {new Date(data.created_at).getFullYear()}
                                            <br></br>
                                            {new Date(data.created_at).toLocaleTimeString("en-US")}
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

export default InventoryList;