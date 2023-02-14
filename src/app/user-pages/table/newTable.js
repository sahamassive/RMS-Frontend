import React, { useEffect, useState } from "react";
import "./style.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";

function NewTable() {
    const [tableName, setTablename] = useState();
    const [seat, setSeat] = useState();
    const [type, setType] = useState();
    const [allTableTypes, setAllTableTypes] = useState();

    useEffect(() => {
        axios.get(`${baseUrl}/api/table-type-list/${restaurant_id}`).then((response) => {
            //console.log(allData);
            setAllTableTypes(response.data);
    });
    }, []);

    const Insert = async (event) => { 
        event.preventDefault();

        const formData = new FormData();
        formData.append('restaurant_id', restaurant_id);
        formData.append('branch_id', "1");
        formData.append('table_name', tableName);
        formData.append('table_type', type);
        formData.append('seat', seat);

        axios
            .post(`${baseUrl}/api/table-insert`, formData)
            .then((response) => { 
                Swal.fire({
                    title: response.data.msg,
                    icon: "success",
                    confirmButtonText: "OK",
                });
            })
    }

    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="btn-section">
                            <h4 className="card-title">Insert New Table</h4>
                            <a className="btn-style btn btn-info" href="/table/all-table"><i className="bi bi-card-list"></i> All
                                Table</a>
                        </div>
                        <div className="col-sm-12 background">
                            <div>
                                <div className="input_field two_part">
                                    <div className="wid">
                                        <Form.Label className="label-style">
                                            Table Name
                                        </Form.Label>
                                        <Form.Control
                                        onChange={(event) => {
                                            setTablename(event.target.value)
                                        }}
                                            type="text"
                                            placeholder="Table Name"
                                        ></Form.Control>
                                    </div>
                                    <div className="wid">
                                        <Form.Label className="label-style">Number of Seat</Form.Label>
                                        <Form.Control
                                        onChange={(event) => {
                                            setSeat(event.target.value)
                                        }}
                                            type="number"
                                            placeholder="Number of Seat"
                                        ></Form.Control>
                                    </div>
                                </div>
                                <div className="input_field two_part">
                                    <div className="wid">
                                        <Form.Label className="label-style">Type</Form.Label>
                                        <select
                                            onChange={(event) => {
                                                setType(event.target.value)
                                        }}
                                        >
                                            <option>Select from here..</option>
                                            {allTableTypes ? allTableTypes.map((data) =>
                                                data.status == '1' ?
                                                    <option value={data.type}>{data.type}</option>
                                                    : null
                                                ) : null }
                                        </select>
                                    </div>
                                </div>
                                <button className="btn btn-warning top-space" onClick={Insert}>
                                    <i className="bi bi-save-fill"></i>Insert
                                </button>
                        
                                <br></br> <br></br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewTable;