import React, { useState, useEffect } from "react";
import '../style.css';
import { baseUrl, restaurant_id, axios, Swal, Form  } from "../../constant/global";
import { useParams } from "react-router-dom";

function EditSupplier() {
    const [supplierName, setSupplierName] = useState();
    const [marketName, setMarketName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const params = useParams();

    useEffect(() => {
        axios
            .get(`${baseUrl}/api/supplier-edit/${params.id}`)

            .then((res) => {
                setSupplierName(res.data.supplier_name);
                setMarketName(res.data.market_name);
                setPhone(res.data.phone);
                setEmail(res.data.email);
                setAddress(res.data.address);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [params.id]);

    const Update = async (event) => {
        event.preventDefault();

        const formdata = new FormData();
        formdata.append('supplier_name', supplierName);
        formdata.append('market_name', marketName);
        formdata.append('email', email);
        formdata.append('phone', phone);
        formdata.append('address', address);

        await axios
        .post(`${baseUrl}/api/supplier-edit/${params.id}`, formdata)
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
                    <h4 className="card-title">Edit Supplier Information</h4>
                    <a className="btn-style btn btn-primary" href={`/inventory/all-supplier/${restaurant_id}`}>
                        <i className="bi bi-list-columns-reverse"></i>All Suppliers
                    </a>
                </div>
                <div className="col-sm-12 background">
                    <div>
                        <div className="input_field two_part">
                            <div className="wid">
                                <Form.Label className="label-style">
                                    Supplier name/Company name
                                </Form.Label>
                                        <Form.Control
                                            value={supplierName}
                                onChange={(event) => {
                                    setSupplierName(event.target.value)
                                }}
                                    type="text"
                                    placeholder="Supplier name /Company name"
                                ></Form.Control>
                            </div>
                            <div className="wid">
                                <Form.Label className="label-style">Market/Bazar name</Form.Label>
                                        <Form.Control
                                            value={marketName}
                                onChange={(event) => {
                                    setMarketName(event.target.value)
                                }}
                                    type="text"
                                    placeholder="Market/Bazar name"
                                ></Form.Control>
                            </div>
                        </div>
                        <div className="input_field two_part">
                            <div className="wid">
                                <Form.Label className="label-style">Email (Optional)</Form.Label>
                                        <Form.Control
                                            value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value)
                                }}
                                    type="email"
                                    placeholder="E-mail"
                                ></Form.Control>
                            </div>
                            <div className="wid">
                                <Form.Label className="label-style">Phone number</Form.Label>
                                        <Form.Control
                                            value={phone}
                                onChange={(event) => {
                                    setPhone(event.target.value)
                                }}
                                    type="text"
                                    placeholder="Phone"
                                ></Form.Control>
                            </div>
                        </div>
                        <div className="input_field">
                            <Form.Group>
                                <Form.Label className="label-style">Address</Form.Label>
                                        <Form.Control
                                            value={address}
                                onChange={(event) =>{
                                    setAddress(event.target.value)
                                }}
                                    className="area"
                                    as="textarea"
                                    placeholder="Address"
                                    rows={3}
                                ></Form.Control>
                            </Form.Group>
                        </div>
                        <button className="btn btn-warning top-space" onClick={Update}>
                            <i className="bi bi-save-fill"></i>Update
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

export default EditSupplier;