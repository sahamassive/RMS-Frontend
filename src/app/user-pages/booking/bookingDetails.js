import React from "react";
import Form from 'react-bootstrap/Form';
import QuickOrder  from "../pos/quickOrder";

function BookingDetails() {
    const pickerInline = document.querySelector('.timepicker-inline-12');
    //const timepickerMaxMin = new mdb.Timepicker(pickerInline, { format12:true, inline: true });
    return (
        <div>
            <div className="input_field two_part">
                <select>
                    <option value="">Type of booking</option>
                    <option value="birthday">Birthday</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="Others">Others</option>
                </select>
                <Form.Control type="number" placeholder="Number of people"></Form.Control>
            </div>
            <div className="input_field two_part">
            <select>
                <option value="">Select table</option>
                <option value="birthday">Birthday</option>
            </select>
            <Form.Control type="date" placeholder="Date"></Form.Control>
            </div>
            <div className="input_field two_part">
                <Form.Control type="time" placeholder="Starting time"/>
                <Form.Control type="time" placeholder="Ending time"/>            
            </div>
            <div className="input_field">
            <QuickOrder/>           
            </div>
        </div>
    );
}

export default BookingDetails;