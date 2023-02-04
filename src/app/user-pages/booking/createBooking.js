import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";

function CreateBooking() {
  const [bookingDetails, setBookingDetails] = useState(true);
  const [customerDetails, setCustomerDetails] = useState(false);

  const [bookingDate, setBookingDate] = useState();
  const [numberOfPeople, setNumberOfPeople] = useState();
  const [table, setTable] = useState();
  const [type, setType] = useState();
  const [startingTime, setStartingTime] = useState();
  const [endingTime, setEndingTime] = useState();

  const [fname, setFname] = useState();

  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  const bookingDetails2 = () => {
    setBookingDetails(true);
    setCustomerDetails(false);
  };

  const customerDetails2 = () => {
    setBookingDetails(false);
    setCustomerDetails(true);
  };

  const insert = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("booking_date", bookingDate);
    formData.append("people", numberOfPeople);
    formData.append("table", table);
    formData.append("type", type);
    formData.append("start_time", startingTime);
    formData.append("end_time", endingTime);
    formData.append("name", fname);

    formData.append("email", email);
    formData.append("phone", phone);

    await axios
      .post(`${baseUrl}/api/booking-insert`, formData)
      .then((response) => {
        Swal.fire({
          title: response.data.msg,

          icon: "success",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">Create New booking</h4>
              <a className="btn-style btn btn-info" href="/booking/all">
                <i class="bi bi-card-list"></i> All Booking
              </a>
            </div>
            <form>
              <div className="two_part">
                <div className="col-sm-3 background">
                  <p className="text_style space">
                    <span className="text_style space">
                      <i className="bi bi-folder2-open icon-space"></i>Booking
                      Setting
                    </span>
                  </p>
                  <Link onClick={bookingDetails2}>
                    <p
                      className={
                        bookingDetails
                          ? "btn_style_active icon2"
                          : "btn_style_inactive icon2"
                      }
                    >
                      <i className="bi bi-distribute-vertical icon-space"></i>
                      Bookings Details
                    </p>
                  </Link>
                  <Link onClick={customerDetails2}>
                    <p
                      className={
                        customerDetails
                          ? "btn_style_active icon2"
                          : "btn_style_inactive icon2"
                      }
                    >
                      <i className="bi bi-person-workspace icon-space"></i>
                      Customer Details
                    </p>
                  </Link>
                </div>
                <div className="col-sm-9 background">
                  <div className="col-sm-6">
                    <h4 className="space">
                      <i className="bi bi-info-square-fill icon-space left-space"></i>
                      Information
                    </h4>
                  </div>
                  <div>
                    <Form onSubmit={insert}>
                      {bookingDetails ? (
                        <div>
                          <div className="input_field two_part">
                            <div className="wid">
                              <Form.Label className="label-style">
                                Booking date
                              </Form.Label>
                              <Form.Control
                                type="date"
                                placeholder="Date"
                                onChange={(event) => {
                                  setBookingDate(event.target.value);
                                }}
                              ></Form.Control>
                            </div>
                            <div className="wid">
                              <Form.Label className="label-style">
                                Number of people
                              </Form.Label>
                              <Form.Control
                                type="number"
                                placeholder="Number of people"
                                onChange={(event) => {
                                  setNumberOfPeople(event.target.value);
                                }}
                              ></Form.Control>
                            </div>
                          </div>

                          <div className="input_field two_part">
                            <div className="wid">
                              <Form.Label className="label-style">
                                Select table
                              </Form.Label>
                              <select
                                onChange={(event) => {
                                  setTable(event.target.value);
                                }}
                              >
                                <option value="">Select here</option>
                                <option value="table-1">Table 1</option>
                                <option value="table-2">Table 2</option>
                                <option value="table-3">Table 3</option>
                              </select>
                            </div>
                            <div className="wid">
                              <Form.Label className="label-style">
                                Type of Booking
                              </Form.Label>
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
                              <Form.Label className="label-style">
                                Starting time
                              </Form.Label>
                              <Form.Control
                                type="time"
                                placeholder="Starting time"
                                onChange={(event) => {
                                  setStartingTime(event.target.value);
                                }}
                              />
                            </div>
                            <div className="wid">
                              <Form.Label className="label-style">
                                Ending time
                              </Form.Label>
                              <Form.Control
                                type="time"
                                placeholder="Ending time"
                                onChange={(event) => {
                                  setEndingTime(event.target.value);
                                }}
                              />
                            </div>
                          </div>

                          <div className="section-22"></div>
                        </div>
                      ) : null}
                      {customerDetails ? (
                        <div>
                          <div className="input_field two_part">
                            <div className="wid">
                              <Form.Label className="label-style">
                                Name
                              </Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Name"
                                onChange={(event) => {
                                  setFname(event.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="input_field two_part">
                            <div className="wid">
                              <Form.Label className="label-style">
                                E-mail
                              </Form.Label>
                              <Form.Control
                                type="email"
                                placeholder="E-mail"
                                onChange={(event) => {
                                  setEmail(event.target.value);
                                }}
                              />
                            </div>
                            <div className="wid">
                              <Form.Label className="label-style">
                                Contact no.
                              </Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Phone"
                                onChange={(event) => {
                                  setPhone(event.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <button className="btn btn-warning top-space">
                            <i className="bi bi-save-fill"></i>Insert
                          </button>
                          <br></br>
                          <br></br> <br></br>
                        </div>
                      ) : null}
                    </Form>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBooking;
