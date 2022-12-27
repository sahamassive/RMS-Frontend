import React, { Component, useEffect, useState } from "react";
import './style.css';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

function CreateFood() {
    return (
        <div>
            <Form>
                <h2> Create new Food Item</h2>
                <div className='two_part'>
                    <div className="col-sm-3 background">
                        <lavel className="label-style">Food Image</lavel>
                        <div className="col-sm-6">
                            <Form.Group controlId="formFileMultiple" className="mb-3">
                                <Form.Control type="file" multiple />
                            </Form.Group>
                        </div>
                    </div>
                    <div className="col-sm-9 background">
        
                        <div>
                            <div className="input_field two_part">
                                <Form.Control type="text" placeholder="Food name"></Form.Control>
                                <Form.Control type="text" placeholder="Description"></Form.Control>
                            </div>
                            <div className="input_field two_part">
                                <Form.Control type="text" placeholder="Speciality"></Form.Control>
                                <Form.Control type="number" placeholder="Price"></Form.Control>
                            </div>
                            <div className="input_field two_part">
        
                                <select>
                                    <option value="">Select Section</option>
                                    <option value="chef">Chef</option>
                                </select>
        
                                <select>
                                    <option value="">Select Category</option>
                                    <option value="chef">Chef</option>
                                </select>
        
                                <select>
                                    <option value="">Select Brand</option>
                                    <option value="chef">Chef</option>
                                </select>
                            </div>
                            <div className="input_field">
                            <Form.Group>
                            <Form.Label>Meta Tag</Form.Label>
                            <Form.Control className="area"  as="textarea" placeholder="Meat tag" rows={3} />
                            </Form.Group>
                            </div>
        
                                <div className="input_field">
                                <Form.Group>
                                <Form.Label>Meta description</Form.Label>
                                    <Form.Control className="area" as="textarea" placeholder="Meta description" rows={6} ></Form.Control>
                                    </Form.Group>
                            </div>
        
                                <div className="input_field">
                                <Form.Group>
                                <Form.Label>Meta keyword</Form.Label>
                                <Form.Control className="area"  as="textarea" placeholder="Meta keyword" rows={3} ></Form.Control>
                                </Form.Group>
                            </div>
                                <a className="btn btn-success top-space"><i className="bi bi-save-fill"></i>Insert</a>
                        </div>
                    </div>
                </div>
            </Form>
    </div>
    );
}

export default CreateFood;