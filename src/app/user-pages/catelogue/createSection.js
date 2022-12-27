import React, { Component, useEffect, useState } from "react";
import './style.css';
import Form from 'react-bootstrap/Form';

function CreateSection() {
    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="btn-section">
                            <h4 className="card-title">Create New food section</h4>
                            <a className="btn-style btn btn-info" href="/catalogue/section"><i class="bi bi-card-list"></i>All
                                Section</a>
                        </div>
                        
                        <Form>
                        <div className="input_field">
                        <label>Section name</label>
                        <Form.Control className="col-sm-6" type="text" placeholder="Section name"></Form.Control><br></br>
                        <Form.Group>
                        <Form.Label>Meta description</Form.Label>
                            <Form.Control className="area" as="textarea" placeholder="Description" rows={6} ></Form.Control>
                            </Form.Group>
                            </div>
                            <div className="">
                                <a className="btn btn-warning top-space"><i className="bi bi-save-fill"></i>Insert</a>
                            </div>
                            <br></br>
                            </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateSection;