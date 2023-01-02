import React, { Component } from "react";
import './style.css';

function Booking() {
    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="btn-section">
                            <h4 className="card-title">All bookings:</h4>
                            <a className="btn-style btn btn-info" href="/booking/new-booking"><i class="bi bi-card-list"></i>New
                                Booking</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Booking;