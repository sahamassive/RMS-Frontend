import React, { useEffect, useState } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";

function EditTable() {
    const [tableName, setTablename] = useState();
    const [seat, setSeat] = useState();
    const [type, setType] = useState();
    const [allTableTypes, setAllTableTypes] = useState();
    const params = useParams();

    useEffect(() => {
        axios
            .get(`${baseUrl}/api/table-edit/${params.table_id}`)
            .then((response) => {
                console.log(response.data);
            setTablename(response.data[0].table_name);
            setSeat(response.data[0].seat);
            setType(response.data[0].table_type);
        });
    }, [params.table_id]);

    useEffect(() => {
        axios.get(`${baseUrl}/api/table-type-list/${restaurant_id}`).then((response) => {
            //console.log(allData);
            setAllTableTypes(response.data);
    });
    }, []);

    const Update = async (event) => { 
        event.preventDefault();

        const formData = new FormData();
        formData.append('table_name', tableName);
        formData.append('table_type', type);
        formData.append('seat', seat);

        axios
            .post(`${baseUrl}/api/table-edit/${params.table_id}`, formData)
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
                                            value={tableName}
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
                                            value={seat}
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
                                            value={type}
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
                                <button className="btn btn-warning top-space" onClick={Update}>
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

export default EditTable;