import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import './style.css';

function Insert() {
    return (
        <div>
        <h3>Add new wastage:</h3>
        <form>
        <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <div className="btn-section">
                        <h4 className="card-title">Create New wastage</h4>
                        <a className="btn-style btn btn-info" href="/waste"><i class="bi bi-card-list"></i> All Wasteage</a>
                            </div>
                            
                            <div className='col-sm-12 background'>
                                <div className='input_field two_part'>
                                    <Form.Control className="col-sm-6" type="text" placeholder="Item name" />   
                                            
                                    <Form.Control className="col-sm-6" type="text" placeholder="Reason"></Form.Control>
                                </div>
                                <div className='input_field two_part'>
                                <Form.Control className="col-sm-6" type="number" placeholder="Amount"></Form.Control>
                
                                <Form.Control className="col-sm-6" type="number" placeholder="Price"></Form.Control>
                                </div>

                                <div className='input_field two_part'>
                                <select className="search_box2">
                                    <option value="">Select employee</option>
                                    <option value="chef">Chef</option>
                                </select>
                                </div>
                                <a className="btn btn-warning top-space"><i className="bi bi-save-fill"></i>Insert</a><br></br><br></br>
                            <br></br>
                            </div>
    
                </div>
            </div>
        </div>
    </form>  
        </div>
    );
}
export default Insert;