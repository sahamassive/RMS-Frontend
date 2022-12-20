import React, { Component, useEffect, useState } from "react";
import './style.css';
import Form from 'react-bootstrap/Form';

function CreateBrand() {
    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="btn-section">
                            <h4 className="card-title">Create New Brand</h4>
                            <a className="btn-style btn btn-info" href="/catalogue/brand"><i className="bi bi-list-columns-reverse"></i> All Brand</a>
                        </div>
                        <label className="label-style">Brand name</label>
                        <Form.Control className="col-sm-6" type="text" placeholder="Brand name"></Form.Control>
                        <lavel className="label-style">Brand LOGO</lavel>
                        <div className="col-sm-6 section-03 ">
                            <Form.Group controlId="formFileMultiple" className="mb-3 search_box2">
                                <Form.Control type="file" multiple />
                            </Form.Group>
                        </div>
                        <a className="btn btn-success top-space"><i className="bi bi-save-fill"></i>Insert</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CreateBrand;