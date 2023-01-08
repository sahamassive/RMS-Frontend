import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';

function Others() {
    const [salary, setSalary] = useState();
    const [joining, setJoining] = useState();

    return (
        <div className='background'>
            <div className="input_field">
                <div className="wid">
                    <Form.Label className="level-style">Salary</Form.Label>
                    <Form.Control
                        name="salary"
                        type="number"
                        placeholder="Salary"
                        onChange={(event) => {
                            setSalary(event.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="input_field">
                <div className="wid">
                    <Form.Label className="level-style">Date Of joining</Form.Label>
                    <Form.Control
                        name="joining"
                        type="date"
                        placeholder="Date Of joining"
                        onChange={(event) => {
                            setJoining(event.target.value);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Others;