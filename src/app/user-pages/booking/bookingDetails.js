import React from "react";
import { Label } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import QuickOrder  from "../pos/quickOrder";

function BookingDetails() {
    return (
        <div>
            <div className="input_field two_part">
                <div className="wid">
                    <Form.Label className="level-style">Booking date</Form.Label>
                    <Form.Control type="date" placeholder="Date"></Form.Control>
                </div>
                <div className="wid">
                    <Form.Label className="level-style">Number of people</Form.Label>
                    <Form.Control type="number" placeholder="Number of people"></Form.Control>
                </div>
            </div>
            
            <div className="input_field two_part">
                <div className="wid">
                    <Form.Label className="level-style">Select table</Form.Label>
                    <select>
                        <option value="">Select here</option>
                        <option value="birthday">Birthday</option>
                    </select>
                </div>
                <div className="wid">
                    <Form.Label className="level-style">Type of Booking</Form.Label>
                    <select>
                        <option value="">Select here</option>
                        <option value="birthday">Birthday</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
            </div>
        
            <div className="input_field two_part">
                <div className="wid">
                    <Form.Label className="level-style">Starting time</Form.Label>
                    <Form.Control type="time" placeholder="Starting time" />
                </div>
                <div className="wid">
                    <Form.Label className="level-style">Ending time</Form.Label>
                    <Form.Control type="time" placeholder="Ending time" />
                </div>
            </div>
        
            <div className="section-22">
                <QuickOrder />
            </div>
        </div>
    );
}

export default BookingDetails;