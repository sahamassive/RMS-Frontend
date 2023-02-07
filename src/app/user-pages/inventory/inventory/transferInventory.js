import React, { Component, useEffect, useState } from "react";
import "../style.css";
import $ from "jquery";
import "datatables.net";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../../constant/global";


function TransferInventory() {
    const singleQueue = [];
    const [chef, setChef] = useState();
    const [branchId, setBranchId] = useState();
    const [inventory, setInventory] = useState();
    const [askQuantity, setAskQuantity] = useState();
    const [inventoryQueue, setInventoryQueue] = useState([]);
    const [prev, setPrev] = useState(0);
    const [allBranch, setAllBranch] = useState("");

    useEffect(() => {  
        axios.get(`${baseUrl}/api/restaurant/branchs/${restaurant_id}`).then((response) => {
            setAllBranch(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get(`${baseUrl}/api/chefs/${restaurant_id}`).then((response) => {
            setChef(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get(`${baseUrl}/api/inventories`).then((response) => {
            setInventory(response.data);
        })
    }, []);

    const changeQuantity = (event, id) => {
        var updatedList = [...inventory];
        setPrev(event)  

        inventoryQueue.find((item) => {
            if (id === item[0].ingredient_id) {
                setPrev(item[0].askQuantity)
            }
        })

        updatedList = inventory.filter((item) => {
            if (id == item.ingredient_id) {
                let p = parseFloat(item.current_quantity) + parseFloat(prev);
                item.current_quantity =  p - event;
            }
            return item;
        });
        setAskQuantity(event)
        setInventory(updatedList);
    }
    
    const changePrev = (data) => { 
        setPrev(0)
        if (askQuantity > 0) {
            AddToQueue(data)   
        }
    }

    const AddToQueue = (data) => {
        const checkid = data.ingredient_id;
        if (askQuantity == null) {
            Swal.fire({
                title: "Please enter quantity first!",
                icon: "warning",
                confirmButtonText: "OK",
            });
        }
        else if (data.current_quantity < 0) {
            Swal.fire({
                title: "Quantity enceeds the available inventory quantity",
                icon: "warning",
                confirmButtonText: "OK",
            });
        }
        else {
            if (inventoryQueue.find((data,index) => data[0].ingredient_id == checkid)) {
                setPrev(0);
                //singleQueue = data;
            } else {
                singleQueue.push({
                    ingredient_name: data.ingredient,
                    ingredient_id: data.ingredient_id,
                    unit: data.unit,
                    askQuantity: askQuantity
                });
            }
            setInventoryQueue((state) => [...state, singleQueue]);
            setAskQuantity(0)
            setPrev(0)
        }
    }

    const Confirm = async (event) => {
        event.preventDefault();

        axios
            .post(`${baseUrl}/api/inventory-transfer`, {
                branchId: branchId,
                restaurant_id: restaurant_id,
                inventoryQueue: inventoryQueue,
            })
            .then((response) => { 
                Swal.fire({
                    title: response.data.msg,
                    icon: "success",
                    confirmButtonText: "OK",
                });
            })
    }

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
                            <h4 className="card-title">Inventory Transfer between branchs</h4>
                            <div className="btn-style">
                                <a className="btn btn-primary" href="/inventory/all-invoice">
                                    <i className="bi bi-receipt"></i>All Invoices
                                </a>
                                <span>   </span>
                                <a className="btn btn-info" href="/inventory/all-inventory">
                                    <i className="bi bi-buildings-fill"></i>All Inventory
                                </a>
                            </div>
                        </div>
                        <div className="col-sm-12 background">
                            <div>
                                <div className="input_field two_part">
                                    <div className="wid">
                                        <Form.Label className="label-style">
                                            Select Branch...
                                        </Form.Label>
                                        <select
                                            onChange={(event) => {
                                                setBranchId(event.target.value)
                                        }}
                                        >
                                            <option>Select from here...</option>
                                            {allBranch
                                                ? allBranch.map((data) => (
                                                    <option value={data.id}>
                                                        {data.city} Branch
                                                    </option>
                                                ))
                                                : null}
                                        </select>
                                    </div>
                                    <div className="wid">
                                        <Form.Label className="label-style">Date</Form.Label>
                                        <Form.Control id="id-style"
                                            value={new Date().toLocaleDateString('en-us', { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                                            type="text"
                                            readOnly
                                        ></Form.Control>
                                    </div>
                                    <div className="wid">
                                        <Form.Label className="label-style">Time</Form.Label>
                                        <Form.Control id="id-style"
                                            value={new Date().toLocaleTimeString("en-US")}
                                            type="text"
                                            readOnly
                                        ></Form.Control>
                                    </div>
                                </div>
                            </div>
                            <div className="table-padding table-responsive">
                                <table className="table table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th>SL.</th>
                                            <th>Item Name</th>
                                            <th>Quantity</th>
                                            <th>Unit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inventoryQueue ? 
                                            inventoryQueue.map((data, index) => 
                                            <tr>
                                            <td>{ index + 1}</td>
                                            <td>{ data[0].ingredient_name}</td>
                                            <td>{ data[0].askQuantity}</td>
                                                    <td>
                                                    {data[0].unit === 'Kg' ? "Gm"  : null}
                                                    {data[0].unit === 'L' ? "Gm"  : null}
                                                    {data[0].unit === 'Ps' ? data[0].unit : null}
                                                    {data[0].unit === 'Gm' ? data[0].unit : null}
                                                    </td>
                                                </tr>
                                            )
                                            : null}
                                    </tbody>
                                </table>
                            </div>
                            <div className="d-grid gap-2 col-6 mx-auto">
                            <button className="btn btn-warning top-space" onClick={Confirm}>
                                <i className="bi bi-check-square-fill"></i>Confirm
                            </button>
                            <br></br>
                        </div>
                        </div>
                        <div className="col-sm-12 background">
                            <div className="table-responsive table-style table-background">
                                {inventory ? (
                                    <table id="inventory" className="table table-striped table-style">
                                        <thead>
                                            <tr>
                                                <th>SI.</th>
                                                <th>Ingredient Name</th>
                                                <th>Available Stock</th>
                                                <th>Unit</th>
                                                <th>Given Quantity</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {inventory.map((data, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{data.ingredient}</td>
                                                    <td>{  data.current_quantity }</td>
                                                    <td>
                                                        {data.unit === 'Kg' ? "Gm"  : null}
                                                        {data.unit === 'L' ? "Gm"  : null}
                                                        {data.unit === 'Ps' ? data.unit : null}
                                                        {data.unit === 'Gm' ? data.unit : null}
                                                    </td>
                                                    <td>
                                                        <Form.Control
                                                            id="inp"
                                                            onChange={(event) => {
                                                                changeQuantity(event.target.value, data.ingredient_id)
                                                            }}
                                                            onBlur={()=>changePrev(data)}
                                                            type="number"
                                                            placeholder="Must be Gram or pieces"
                                                        ></Form.Control>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-dark"
                                                            onClick={() => {
                                                                AddToQueue(data)
                                                            }}
                                                        >
                                                            <i className="bi bi-pencil-square"></i>Confirm
                                                        </button>
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
        </div>
    );
}

export default TransferInventory;