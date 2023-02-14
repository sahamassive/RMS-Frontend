import React, { useState, useEffect } from "react";
import '../style.css';
import { baseUrl, restaurant_id, axios, Swal, Form } from "../../constant/global";
import { useParams } from "react-router-dom";

function EditTableType() {
    const [type, setType] = useState();
    const params = useParams();

    useEffect(() => {
        axios
            .get(`${baseUrl}/api/table-type-edit/${params.id}`)

            .then((res) => {
                setType(res.data.type);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [params.id]);

    const Update = async (event) => {
        event.preventDefault();

        const formdata = new FormData();
        formdata.append('type', type);

        await axios
        .post(`${baseUrl}/api/table-type-edit/${params.id}`, formdata)
        .then((response) => {
            Swal.fire({
                title: response.data.msg,
                icon: "success",
                confirmButtonText: "OK",
            });
        });
    }

    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="btn-section">
                            <h4 className="card-title">Create New Type</h4>
                            <a className="btn-style btn btn-primary" href='/table/table-type-list'>
                                <i className="bi bi-list-columns-reverse"></i>All Table Type
                            </a>
                        </div>
                        <div className="col-sm-12 background">
                            <div>
                                <div className="input_field two_part">
                                    <div className="wid">
                                        <Form.Label className="label-style">
                                            Ingredient name
                                        </Form.Label>
                                        <Form.Control
                                            value={type}
                                            type="text"
                                            placeholder="Ingredient Name"
                                            onChange={(event) => {
                                                setType(event.target.value);
                                            }}
                                        ></Form.Control>
                                    </div>
                                </div>
                                <a className="btn btn-primary top-space" onClick={Update}>
                                    <i className="bi bi-save-fill"></i>Update
                                </a>
                                <br></br>
                                <br></br> <br></br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditTableType;