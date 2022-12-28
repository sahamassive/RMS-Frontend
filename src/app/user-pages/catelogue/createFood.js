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
                            <div className="wid">
                                <Form.Label className="level-style">Food name</Form.Label>
                                <Form.Control type="text" placeholder="Food name"></Form.Control>
                            </div>
                            <div className="wid">
                                <Form.Label className="level-style">Description</Form.Label>
                                <Form.Control type="text" placeholder="Description"></Form.Control>
                            </div>
                        </div>
                        <div className="input_field two_part">
                            <div className="wid">
                                <Form.Label className="level-style">Speciality</Form.Label>
                                <Form.Control type="text" placeholder="Speciality"></Form.Control>
                            </div>
                            <div className="wid">
                                <Form.Label className="level-style">Price</Form.Label>
                                <Form.Control type="number" placeholder="Price"></Form.Control>
                            </div>
                        </div>
                    </div>
                    <div className="input_field two_part">
                        <div className="wid">
                            <Form.Label className="level-style">Select Section</Form.Label>
                            <select>
                                <option value="">Select Section</option>
                                <option value="chef">Chef</option>
                            </select>
                        </div>
    
                        <div className="wid">
                            <Form.Label className="level-style">Select Category</Form.Label>
                            <select>
                                <option value="">Select Category</option>
                                <option value="chef">Chef</option>
                            </select>
                        </div>
    
                        <div className="wid">
                            <Form.Label className="level-style">Select Brand</Form.Label>
                            <select>
                                <option value="">Select Brand</option>
                                <option value="">Brand name</option>
                            </select>
                        </div>
                    </div>
                    <div className="input_field">
                        <Form.Group>
                            <Form.Label className="level-style">Meta Tag</Form.Label>
                            <Form.Control className="area" as="textarea" placeholder="Meat tag" rows={3} />
                        </Form.Group>
                    </div>
    
                    <div className="input_field">
                        <Form.Group>
                            <Form.Label className="level-style">Meta description</Form.Label>
                            <Form.Control className="area" as="textarea" placeholder="Meta description" rows={6}>
                            </Form.Control>
                        </Form.Group>
                    </div>
    
                    <div className="input_field">
                        <Form.Group>
                            <Form.Label className="level-style">Meta keyword</Form.Label>
                            <Form.Control className="area" as="textarea" placeholder="Meta keyword" rows={3}></Form.Control>
                        </Form.Group>
                    </div>
                        <a className="btn btn-warning top-space"><i className="bi bi-save-fill"></i>Insert</a>
                        <br></br><br></br><br></br>
                </div>
            </div>
        </Form>
    </div>
    );
}

export default CreateFood;