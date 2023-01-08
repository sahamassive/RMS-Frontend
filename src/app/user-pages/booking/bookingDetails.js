import React, { useState } from "react";
import { Label } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

function BookingDetails() {
    const [bookingDate, setBookingDate] = useState();
    const [numberOfPeople, setNumberOfPeople] = useState();
    const [table, setTable] = useState();
    const [type, setType] = useState();
    const [startingTime, setStartingTime] = useState();
    const [endingTime, setEndingTime] = useState();

    return (
        <div>
            <div className="input_field two_part">
                <div className="wid">
                    <Form.Label className="level-style">Booking date</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Date"
                        onChange={(event) => {
                            setBookingDate(event.target.value);
                        }}
                    >
                    </Form.Control>
                </div>
                <div className="wid">
                    <Form.Label className="level-style">Number of people</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Number of people"
                        onChange={(event) => {
                            setNumberOfPeople(event.target.value);
                        }}
                    >
                    </Form.Control>
                </div>
            </div>
            
            <div className="input_field two_part">
                <div className="wid">
                    <Form.Label className="level-style">Select table</Form.Label>
                    <select
                    onChange={(event) => {
                        setTable(event.target.value);
                    }}
                    >
                        <option value="">Select here</option>
                        <option value="birthday">Birthday</option>
                    </select>
                </div>
                <div className="wid">
                    <Form.Label className="level-style">Type of Booking</Form.Label>
                    <select
                    onChange={(event) => {
                        setType(event.target.value);
                    }}
                    >
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
                    <Form.Control
                        type="time"
                        placeholder="Starting time"
                        onChange={(event) => {
                            setStartingTime(event.target.value);
                        }}
                    />
                </div>
                <div className="wid">
                    <Form.Label className="level-style">Ending time</Form.Label>
                    <Form.Control
                        type="time"
                        placeholder="Ending time"
                        onChange={(event) => {
                            setEndingTime(event.target.value);
                        }}
                    />
                </div>
            </div>
        
            <div className="section-22">
            </div>
        </div>
    );
}

export default BookingDetails;