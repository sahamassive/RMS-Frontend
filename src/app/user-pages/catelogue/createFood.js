import React, { Component, useEffect, useState } from "react";
import './style.css';
import Form from 'react-bootstrap/Form';

function CreateFood() {
    return (
        <div>
            <form>
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="btn-section">
                                <h4 className="card-title">Create New Food item</h4>
                                <a className="btn-style btn btn-info" href="/catalogue/food"><i class="bi bi-card-list"></i> New
                                    food</a>
                            </div>
                            <label className="label-style">Food name</label>
                            <Form.Control className="col-sm-6" type="text" placeholder="Food name"></Form.Control>
                            <lavel className="label-style">Food Image</lavel>
                            <div className="col-sm-6 section-03">
                                <Form.Group controlId="formFileMultiple" className="mb-3 search_box2">
                                    <Form.Control type="file" multiple />
                                </Form.Group>
                            </div>
                            <label className="label-style">Description</label>
                            <Form.Control className="col-sm-6" type="text" placeholder="Description"></Form.Control>
            
                            <label className="label-style">Speciality</label>
                            <Form.Control className="col-sm-6" type="text" placeholder="Speciality"></Form.Control>
            
                            <label className="label-style">Price</label>
                            <Form.Control className="col-sm-6" type="number" placeholder="Price"></Form.Control>
                                
                            <label className="label-style">Select Section</label><br></br>
                            <select className="col-sm-6 search_box2">
                                <option value="">Select Section</option>
                                <option value="chef">Chef</option>
                            </select>  <br></br>
                            
                                <label className="label-style">Select Category</label><br></br>
                            <select className="col-sm-6">
                                <option value="">Select Category</option>
                                <option value="chef">Chef</option>
                                </select>  <br></br>

                            <label className="label-style">Select Brand</label><br></br>
                            <select className="col-sm-6">
                                <option value="">Select Brand</option>
                                <option value="chef">Chef</option>
                                </select>   <br></br>
            
                            <label className="label-style">Meta tag</label>
                            <Form.Control className="col-sm-6" type="text" placeholder="Meta tag"></Form.Control>
            
            
                            <label className="label-style">Meta description</label>
                            <Form.Control className="col-sm-6" type="text" placeholder="Meta description"></Form.Control>
            
            
                            <label className="label-style">Meta keyword</label>
                            <Form.Control className="col-sm-6" type="text" placeholder="Meta keyword"></Form.Control>
                            <a className="btn btn-success top-space"><i className="bi bi-save-fill"></i>Insert</a>
            
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateFood;