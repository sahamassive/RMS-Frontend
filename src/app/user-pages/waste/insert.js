import React from 'react';
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
                    <label className="label-style">Item name</label>
                    <Form.Control className="col-sm-6" type="text" placeholder="Item name" />   
                            
                    <label className="label-style">Reason</label>
                    <Form.Control className="col-sm-6" type="text" placeholder="Reason"></Form.Control>
    
                    <label className="label-style">Amount</label>
                    <Form.Control className="col-sm-6" type="number" placeholder="Amount"></Form.Control>
    
                    <label className="label-style">Price</label>
                    <Form.Control className="col-sm-6" type="number" placeholder="Price"></Form.Control>
                        
                    <label className="label-style">Select Employee</label><br></br>
                    <select className="col-sm-6 search_box2">
                        <option value="">Select from here</option>
                        <option value="chef">Chef</option>
                    </select>  <br></br>
    
                    <a className="btn btn-success top-space"><i className="bi bi-save-fill"></i>Insert</a>
    
                </div>
            </div>
        </div>
    </form>  
        </div>
    );
}
export default Insert;