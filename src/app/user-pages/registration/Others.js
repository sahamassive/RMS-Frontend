import Form from 'react-bootstrap/Form';
import React from 'react';

function Others() {
    return (
        <div className='background'>
            <div className="input_field">
                <div className="wid">
                    <Form.Label className="level-style">Salary</Form.Label>
                    <Form.Control name="salary" type="number" placeholder="Salary" />
                </div>
            </div>
            <div className="input_field">
                <div className="wid">
                    <Form.Label className="level-style">Date Of joining</Form.Label>
                    <Form.Control name="joining" type="date" placeholder="Date Of joining" />
                </div>
            </div>
            <p className='btn-style2'><button type="submit" className="btn btn-warning"><i
                        className="bi bi-save-fill"></i>Insert</button></p>
        </div>
    );
}

export default Others;