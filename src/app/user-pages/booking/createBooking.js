import React, { useState } from 'react';
import './style.css';
import BookingDetails from './bookingDetails';
import CustomerDetails from './customerDetails';
import { Link } from 'react-router-dom';

function CreateBooking() {
    const [bookingDetails, setBookingDetails] = useState(true);
    const [customerDetails, setCustomerDetails] = useState(true);

    const bookingDetails2 = () => {
        setBookingDetails(true);
        setCustomerDetails(false);
    };

    const customerDetails2 = () => { 
        setBookingDetails(false);
        setCustomerDetails(true);
    }
    return (
        <div>
            <h2>New Booking</h2>
            <form>
            <div className='two_part'>
                <div className="col-sm-3 background">
                    <p className="text_style space"><span className="text_style space"><i className="bi bi-folder2-open"></i>Booking Setting</span></p>
                    <Link onClick={bookingDetails2}><p className="{ bookingDetails ?  btn_style_active icon2 : btn_style_inactive icon2 }"><i className="bi bi-person-fill"></i>Bookings Details</p></Link>
                    <Link onClick={customerDetails2}><p className="{ customerDetails ?  btn_style_active icon2 : btn_style_inactive icon2 }"><i className="fa-brands fa-sellcast icon"></i>Customer Details</p></Link>
                </div>           
                <div className="col-sm-9 background">
                    <div className="col-sm-6">
                        <h4 className='space'><i className='bi bi-info-square-fill'></i>Information</h4>
                    </div>
                    <div>
                            {bookingDetails ? <BookingDetails /> : null}
                            {customerDetails ? <CustomerDetails /> : null}
                    </div>
                </div>      
            </div>
        </form> 
        </div>
    );
}

export default CreateBooking;