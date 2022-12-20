import React, { Component, useEffect, useState } from "react";
import './style.css';
import Form from 'react-bootstrap/Form';

function CreateCategory() {
    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="btn-section">
                            <h4 className="card-title">Create New Category</h4>
                            <a className="btn-style btn btn-info" href="/catalogue/category"><i className="bi bi-list-columns-reverse"></i>All category</a>
                        </div>
                        <label className="label-style">Category name</label>
                        <Form.Control className="col-sm-6" type="text" placeholder="Category name"></Form.Control>
                        <a className="btn btn-success top-space"><i className="bi bi-save-fill"></i>Insert</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CreateCategory;