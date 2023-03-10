import React, { useEffect, useState } from 'react';
import './style.css';
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";
import { check } from "../constant/check";
import { useValidation } from "../constant/useValidation"; 

const token = sessionStorage.getItem("token");
function Insert() {
    const [foodName, setFoodName] = useState();
    const [type, setType] = useState();
    const [reason, setReason] = useState();
    const [amount, setAmount] = useState();
    const [price, setPrice] = useState();
    const [employee, setEmployee] = useState();
    const [allData, setAllData] = useState();
    const [food, setFood] = useState();
    const [branchId, setBranchId] = useState();

    const { values, handleChange, errors, validate } = useValidation({
        food: "",
        reason: "",
        amount: "",
        price: "",
        type: "",
        employee: "",
      });

    const typeFunction = (type) => {
        axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
        axios.get(`${baseUrl}/api/get-employee/${type}`).then((response) => {
            setAllData(response.data);
            //console.log(response.data);
        });
    }

    useEffect(() => {
        axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
        axios
        .get(
            `${baseUrl}/api/quick-foods/${restaurant_id}/${
            branchId ? branchId : restaurant_id
        }`
        )
        .then((response) => {
            setFood(response.data);
            console.log(response.data);
        });
    }, [])
    
    const Insert = async (e) => { 
        e.preventDefault();

        const isValid = validate();

        if (isValid) { 
            const formData = new FormData();

            formData.append("food_id", foodName);
            formData.append("reason", reason);
            formData.append("amount", amount);
            formData.append("price", price);
            formData.append("type", type);
            formData.append("employee_id", employee);
            axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
            await axios
                .post(`${baseUrl}/api/waste-insert`, formData)
                .then((response) => {
                    Swal.fire({
                        title: response.data.msg,
                        icon: 'success',
                        confirmButtonText: "OK"
                    })
                })
        }
    }
    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="btn-section">
                            <h4 className="card-title">Create New wastage</h4>
                            <a className="btn-style btn btn-info" href="/waste/all"><i className="bi bi-card-list"></i> All
                                Wasteage</a>
                        </div> 
                        <div className='background'>
                            <div className='col-sm-12 background'>
                                <div className='input_field two_part'>
                                    <div className="wid">
                                        <Form.Label className="label-style">Food name</Form.Label>
                                        <select
                                            name='food'
                                            onBlur={handleChange}
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
                                        {errors.food && (
                                            <span className="error">{errors.food}</span>
                                          )}
                                    </div>
                                    <div className="wid">
                                        <Form.Label className="label-style">Reason</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name='reason'
                                            onBlur={handleChange}
                                            placeholder="Reason"
                                            onChange={(event) => {
                                                setReason(event.target.value)
                                            }}
                                        ></Form.Control>
                                        {errors.reason && (
                                            <span className="error">{errors.reason}</span>
                                          )}
                                    </div>
                                </div>
                                <div className='input_field two_part'>
                                    <div className="wid">
                                        <Form.Label className="label-style">Amount</Form.Label>
                                        <Form.Control
                                            name='amount'
                                            onBlur={handleChange}
                                            type="number"
                                            placeholder="Amount"
                                            onChange={(event) => {
                                                setAmount(event.target.value)
                                            }}
                                        ></Form.Control>
                                        {errors.amount && (
                                            <span className="error">{errors.amount}</span>
                                          )}
                                    </div>
                                    <div className="wid">
                                        <Form.Label className="label-style">Price</Form.Label>
                                        <Form.Control
                                            name='price'
                                            onBlur={handleChange}
                                            type="number"
                                            placeholder="Price"
                                            onChange={(event) => {
                                                setPrice(event.target.value)
                                            }}
                                        ></Form.Control>
                                        {errors.price && (
                                            <span className="error">{errors.price}</span>
                                          )}
                                    </div>
                                </div>
                                <div className='input_field two_part'>
                                    <div className="wid">
                                        <Form.Label className="label-style">Select employee type</Form.Label>
                                        <select
                                            name='type'
                                            onBlur={handleChange}
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
                                        {errors.type && (
                                            <span className="error">{errors.type}</span>
                                          )}
                                    </div>
                                    <div className='wid'>
                                        <Form.Label className="label-style">Select employee</Form.Label>
                                        <select
                                            name='employee'
                                            onBlur={handleChange}
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
                                        {errors.employee && (
                                            <span className="error">{errors.employee}</span>
                                          )}
                                    </div>   
                                </div>
                                <button onClick={ Insert } className="btn btn-warning top-space"><i
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
export default Insert; 