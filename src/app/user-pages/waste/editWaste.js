import React, { useEffect, useState } from "react";
import './style.css';
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";
import { useParams } from "react-router-dom";

function EditWaste() {
    const [foodName, setFoodName] = useState();
    const [type, setType] = useState();
    const [reason, setReason] = useState();
    const [amount, setAmount] = useState();
    const [price, setPrice] = useState();
    const [employee, setEmployee] = useState();
    const [allData, setAllData] = useState();
    const [food, setFood] = useState();
    const [branchId, setBranchId] = useState();
    const params = useParams();

    const typeFunction = (type) => {
        axios.get(`${baseUrl}/api/get-employee/${type}`).then((response) => {
            setAllData(response.data);
            //console.log(response.data);
        });
    }
    useEffect(() => {
        axios
            .get(`${baseUrl}/api/wastes-edit/${params.id}`)
    
            .then((res) => {
                console.log(res.data);
                setFoodName(res.data.food_id);
                setReason(res.data.reason);
                setAmount(res.data.amount);
                setPrice(res.data.price);
                setEmployee(res.data.employee_id);
                setType(res.data.employee_type);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [params.id]);

    useEffect(() => {
        axios
        .get(
            `${baseUrl}/api/quick-foods/${restaurant_id}/${
            branchId ? branchId : restaurant_id
        }`
        )
        .then((response) => {
            setFood(response.data);
            //console.log(response.data);
        });
    }, [])
    
    const Update = async (e) => { 
        e.preventDefault();

        const formData = new FormData();

        formData.append("food_id", foodName);
        formData.append("reason", reason);
        formData.append("amount", amount);
        formData.append("price", price);
        formData.append("type", type);
        formData.append("employee_id", employee);

        await axios
            .post(`${baseUrl}/api/wastes-edit/${params.id}`, formData)
            .then((response) => {
                Swal.fire({
                    title: response.data.msg,
                    icon: 'success',
                    confirmButtonText: "OK"
                })
            })
    } 
    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="btn-section">
                            <h4 className="card-title">Edit wastage</h4>
                            <a className="btn-style btn btn-success" href="/waste/all"><i className="bi bi-card-list"></i> All
                                Wasteage</a>
                        </div>
                        <div className='background'>
                            <div className='col-sm-12 background'>
                                <div className='input_field two_part'>
                                    <div className="wid">
                                        <Form.Label className="label-style">Food name</Form.Label>
                                        <select
                                            value={foodName}
                                            onChange={(event) => {
                                                setFoodName(event.target.value)
                                            }}
                                        >
                                            <option value="">Select food...</option>
                                            {
                                                food ?
                                                    food.map((data) =>
                                                        <option value={data.id}>
                                                            {data.name}
                                                        </option>
                                                    ) : null
                                            }
                                        </select>
                                    </div>
                                    <div className="wid">
                                        <Form.Label className="label-style">Reason</Form.Label>
                                        <Form.Control
                                            value={reason}
                                            type="text"
                                            placeholder="Reason"
                                            onChange={(event) => {
                                                setReason(event.target.value)
                                            }}
                                        ></Form.Control>
                                    </div>
                                </div>
                                <div className='input_field two_part'>
                                    <div className="wid">
                                        <Form.Label className="label-style">Amount</Form.Label>
                                        <Form.Control
                                            value={amount}
                                            type="number"
                                            placeholder="Amount"
                                            onChange={(event) => {
                                                setAmount(event.target.value)
                                            }}
                                        ></Form.Control>
                                    </div>
                                    <div className="wid">
                                        <Form.Label className="label-style">Price</Form.Label>
                                        <Form.Control
                                            value={price}
                                            type="number"
                                            placeholder="Price"
                                            onChange={(event) => {
                                                setPrice(event.target.value)
                                            }}
                                        ></Form.Control>
                                    </div>
                                </div>
                                <div className='input_field two_part'>
                                    <div className="wid">
                                        <Form.Label className="label-style">Select employee type</Form.Label>
                                        <select
                                            value={type}
                                            onChange={(event) => {
                                                setType(event.target.value)
                                                setEmployee("");
                                                typeFunction(event.target.value);
                                            }}
                                        >
                                            <option value="">Select here</option>
                                            <option value="chef">Chef</option>
                                            <option value="waiter">Waiter</option>
                                            <option value="delivery_men">Delivery Men</option>
                                            <option value="salesmarketing">Sales & Marketing</option>
                                            <option value="manager">Manager</option>
                                            <option value="cleaner">Cleaner</option>
                                        </select>
                                    </div>
                                    <div className='wid'>
                                        <Form.Label className="label-style">Select employee</Form.Label>
                                        <select
                                            value={employee}
                                            onChange={(event) => {
                                                setEmployee(event.target.value)
                                            }}
                                        >
                                            <option value="">Select from here...</option>
                                            {allData ?
                                                allData.map((data) =>
                                                    <option value={data.emp_id}>
                                                        {data.emp_id}, {data.first_name} {data.last_name}</option>
                                                )
                                                : null}
                                        </select>
                                    </div>
                                </div>
                                <button onClick={Update} className="btn btn-warning top-space"><i
                                    className="bi bi-save-fill"></i>Insert</button>
                                <br></br>
                                <br></br>
                                <br></br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditWaste;