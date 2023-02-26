import React, { Component, useEffect, useState, lazy } from "react";
import { Link } from "react-router-dom";
import { useLocation, Redirect } from "react-router-dom";
import "./style.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";
import ReactLoading from "react-loading";
import Modal from "@mui/material/Modal";
const customerId = sessionStorage.getItem("customer_id");
const token = sessionStorage.getItem("token");

function CustomerOrder({}) {
  const [allData, setAllData] = useState([]);
  const { state } = useLocation();
  const [orderDetails, setOrderDetails] = useState(state);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState();
  const [pickup, setPickUp] = useState();
  const [vat, setVat] = useState();
  const [grandTotal, setGrandTotal] = useState();
  const [memberId, setMemberId] = useState();
  const [msp, setMsp] = useState();
  const [disMsp, setDisMsp] = useState();
  const [loading, setLoading] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState();
  const branchId = localStorage.getItem("branchId");
  const [addressModalStatus, setAddressModalStatus] = React.useState(false);
  const [city, setCity] = useState();
  const [indication, setIndication] = useState();
  const [address, setAddress] = useState();

  const AddressModalOpen = () => {
    setAddressModalStatus(true);
  };

  const AddressModalClose = () => setAddressModalStatus(false);

  useEffect(() => {
    calTotal();
  }, [quantity, orderDetails, msp]);

  const calTotal = () => {
    let sum = 0;
    let mspDis = 0;

    orderDetails.forEach((element) => {
      sum = sum + element[0].food_price * element[0].qty;
      mspDis = msp
        ? mspDis +
          element[0].food_price * element[0].qty -
          (element[0].food_price -
            ((element[0].food_price - element[0].basic) / 100) * msp) *
            element[0].qty
        : 0;
    });
    setTotal(sum);
    setVat((sum * 0.05).toFixed(2));
    setGrandTotal((sum + sum * 0.05 - mspDis).toFixed(2));
    setDisMsp(mspDis);
  };

  const removeItem = (id) => {
    setOrderDetails((current) =>
      current.filter((data) => data[0].food_id !== id)
    );
  };

  const increaseQty = (id) => {
    // setQuantity(quantity + 1);
    setQuantity(quantity + 1);
    const upqty = orderDetails.map((data) => {
      if (id === data[0].food_id) {
        // Increment the clicked counte

        return (data[0].qty += 1);
      } else {
        // The rest haven't changed
        return data;
      }
    });
  };
  const descreaseQty = (id) => {
    setQuantity(quantity - 1);

    const upqty = orderDetails.map((data) => {
      if (id === data[0].food_id) {
        // Increment the clicked counter
        if (data[0].qty > 1) {
          return (data[0].qty -= 1);
        } else {
          Swal.fire({
            title: "Quantity Can not be 0",

            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } else {
        // The rest haven't changed
        return data;
      }
    });
  };
  const memberSubmit = () => {
    setLoading(true);
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    axios.get(`${baseUrl}/api/get-msp/${memberId}`).then((response) => {
      if (response.data == "not a member") {
        Swal.fire({
          title:
            "It seems like you are not a member yet! Please contact +880 1323-148188 to be a member",
          icon: "error",
          confirmButtonText: "OK",
        });
        setLoading(false);
      } else {
        setMsp(response.data.msp);
        Swal.fire({
          title: "Member Discount Has Been Applied",
          icon: "success",
          confirmButtonText: "OK",
        });
        setLoading(false);
      }
    });
  };
  const submitOrder = () => {
    // axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    if (pickup == null) {
      Swal.fire({
        title: "Please Select PickUp Method",
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
      axios
        .post(`${baseUrl}/api/order-store`, {
          restaurant_id: restaurant_id,
          branch_id: branchId,
          item: orderDetails ? orderDetails.length : 0,
          total: total,
          customer_id: customerId,
          grand_price: grandTotal,
          pickup_method: pickup,
          vat: vat,
          details: orderDetails,
        })
        .then((response) => {
          Swal.fire({
            title: response.data.msg,
            icon: "success",
            confirmButtonText: "OK",
          });
          if (response.data.msg == "Order Submitted") {
            setOrderDetails([]);
            window.location.href = "/";
          }
        });
    }
  };

  const getAddress = () => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    axios
      .get(`${baseUrl}/api/get-delivery-address/${customerId}`)
      .then((response) => {
        setDeliveryAddress(response.data);
      });
  }
  const deliverDetails = (value) => {
    setPickUp(value);
    if (value == "home-delivery") {
      getAddress();
    } else {
      setDeliveryAddress();
    }
  };

  const changeDeliverryAddress = () => {
    Swal.fire({
      title: "Address change",
      icon: "success",
      confirmButtonText: "OK",
    });
    getAddress();
  };

  const Save = (event) => {
    event.preventDefault();

    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    axios
      .post(`${baseUrl}/api/change-delivery-address/${customerId}`, {
        'city': city,
        'indication' : indication,
        'address': address,
      })
      .then((response) => {
        AddressModalClose();
        changeDeliverryAddress();
      })
  }

  return (
    <div>
      <div className="top-section">
        <h1>Your Cart</h1>
        <h1>Check Out Now and Enjoy Your Food</h1>
      </div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="two_part ">
              <div className="">
                <h4 className="card-title">Your Cart Items:</h4>
              </div>
              <div>
                <Link
                  className="btn btn-outline-success nav-link scrollto right-side2"
                  to={{
                    pathname: "/",
                    state: orderDetails,
                  }}
                >
                  <i className="bi bi-house-door-fill"></i> Back To Home
                </Link>
              </div>
            </div>
            <div className="col-md-12">
              <div className="col-md-12 section-border">
                <div className="table-style table-responsive">
                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Product Title</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Sub Total</th>
                        <th>Discount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails
                        ? orderDetails.map((data) => (
                          <tr>
                            <td>
                              <img
                                className="img-style"
                                src={`${baseUrl}/foods/medium/${data[0].image}`}
                              ></img>
                            </td>
                            <td>{data[0].food_name}</td>
                            <td>{data[0].food_price}</td>
                            <td>
                              <button
                                className="icon-plus"
                                onClick={() => {
                                  increaseQty(data[0].food_id);
                                }}
                              >
                                <i className="bi bi-plus"></i>
                              </button>
                              {data[0].qty}
                              <button
                                className="icon-minus"
                                onClick={() => {
                                  descreaseQty(data[0].food_id);
                                }}
                              >
                                <i className="bi bi-dash"></i>
                              </button>
                            </td>
                            <td>{data[0].food_price * data[0].qty}</td>
                            <td>
                              {msp
                                ? ((data[0].food_price * data[0].qty -
                                  data[0].basic * data[0].qty) /
                                  100) *
                                msp
                                : 0}
                            </td>
                            <td>
                              <button
                                className="icon-delete"
                                onClick={() => {
                                  removeItem(data[0].food_id);
                                }}
                              >
                                <i className="bi bi-x-circle"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                        : null}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-12 two_part ">
              <div className="col-md-4 block_01">
                <div onChange={(e) => deliverDetails(e.target.value)}>
                  <h4>Shipping Method:</h4>
                  <input
                    type="radio"
                    value="home-delivery"
                    name="shipping-method"
                  />
                  Home Delivery<br></br>
                  <input type="radio" value="pickup" name="shipping-method" />
                  Pickup
                  <br></br>
                </div>
                <div className="two_part  section-border">
                  <div className="badge">
                    <Form.Label>Order Date:</Form.Label>
                    <br></br>
                    <Form.Label>
                      {new Date().toLocaleString("en-US", { day: "2-digit" })}-
                      {new Date().toLocaleString("en-US", { month: "long" })}-
                      {new Date().getFullYear()}
                    </Form.Label>
                  </div>
                  <div className="right-side badge">
                    <Form.Label>Order Time:</Form.Label>
                    <br></br>
                    <Form.Label>
                      {new Date().toLocaleTimeString("en-US")}
                    </Form.Label>
                  </div>
                </div>
                {pickup == 'home-delivery' ?
                  deliveryAddress ?
                    <div className="section-border">
                      <div className="">
                        <span className="bg-coloring">Delivery Address:</span>
                        <p>
                          <strong>{deliveryAddress.city},{deliveryAddress.address}</strong>
                        </p>
                      </div>
                      <div className="">
                        <span className="bg-coloring">Indication:</span>
                        <p><strong>{deliveryAddress.indication}</strong></p>
                      </div>
                      <div className="">
                        <button
                          className="btn btn-warning btn-se"
                          onClick={AddressModalOpen}
                        >
                          <i className="bi bi-back"></i>Change Delivery Address
                        </button>
                      </div>
                    </div>
                    :
                    <div className="section-border">
                      <div className="d-grid gap-2 col-6 mx-auto">
                        <span className="no-address">No Address Found.</span>
                        <button
                          className="btn btn-warning top-space"
                          onClick={AddressModalOpen}
                        >
                          <i className="bi bi-geo-alt-fill"></i>Add Address
                        </button>
                        <br></br>
                      </div>
                    </div>
                  : null}
                
              </div>
              <div className="col-md-4 block_01">
                <h4>Member?</h4>
                <p>Enter your member id if you are member.</p>
                <div className="">
                  <div className="wid">
                    <Form.Label className="label-style">
                      Enter Member Id
                    </Form.Label>
                    <Form.Control
                      name="coupon"
                      type="text"
                      placeholder="Enter Member Id"
                      onChange={(event) => {
                        setMemberId(event.target.value);
                      }}
                    />
                  </div>
                </div>
                {loading ? (
                  <ReactLoading type="cylon" />
                ) : (
                  <button
                    className="btn btn-warning btn-se"
                    onClick={memberSubmit}
                  >
                    <i className="bi bi-back"></i>Submit
                  </button>
                )}
              </div>
              {/* <div className="col-md-4 block_01">
                <h4>Coupon Code</h4>
                <p>Enter your coupon code if you have one.</p>
                <div className="">
                  <div className="wid">
                    <Form.Label className="label-style">
                      Enter Member Id
                    </Form.Label>
                    <Form.Control
                      name="coupon"
                      type="text"
                      placeholder="Enter "
                    />
                  </div>
                </div>
                <button className="btn btn-warning btn-se">
                  <i className="bi bi-back"></i>Apply Coupon
                </button>
              </div> */}
              <div className="col-md-4 block_01">
                <h4>Cart Totals</h4>
                <div className="table-style table-responsive">
                  <table className="table table-bordered table-hover">
                    <tbody>
                      <tr>
                        <td>Total</td>
                        <td>{total ? total : null}</td>
                      </tr>
                      <tr>
                        <td>VAT(n%)</td>
                        <td>{vat ? vat : null}</td>
                      </tr>
                      <tr>
                        <td>Discount</td>
                        <td>{disMsp ? disMsp : null}</td>
                      </tr>
                      <tr>
                        <td>Service Charge</td>
                        <td>0.00</td>
                      </tr>
                      <tr>
                        <td>Grand Total</td>
                        <td>{grandTotal ? grandTotal : null}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button
                  className="btn btn-warning btn-se"
                  onClick={() => {
                    submitOrder();
                  }}
                >
                  <i className="bi bi-credit-card"></i>Submit Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={addressModalStatus}
        onClose={AddressModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="emp-modal">
          <div className="close-btn">
            <a onClick={AddressModalClose}>
              <i className="bi bi-x-square"></i>
            </a>
          </div>
          <div>
            <br></br>
            <div className="input_field two_part">
              <div className="wid">
                <Form.Label className="label-style">
                  City Name
                </Form.Label>
                <Form.Control
                  id="field-style"
                  type="text"
                  placeholder="City"
                  onChange={(event) => {
                    setCity(event.target.value);
                  }}
                ></Form.Control>
              </div>
              <div className="wid">
                <Form.Label className="label-style">
                  any Special Indication
                </Form.Label>
                <Form.Control
                  id="field-style"
                  type="text"
                  placeholder="Special Indication"
                  onChange={(event) => {
                    setIndication(event.target.value);
                  }}
                ></Form.Control>
              </div>
            </div>
            <div className="input_field two_part">
              <div className="wid">
                <Form.Label className="label-style">
                  Address
                </Form.Label>
                <Form.Control
                  id="field-style"
                  type="text"
                  placeholder="Address"
                  onChange={(event) => {
                    setAddress(event.target.value)
                  }}
                ></Form.Control>
              </div>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button
                className="btn btn-warning top-space"
                onClick={Save}
              >
                <i className="bi bi-save-fill"></i>Save
              </button>
              <br></br>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CustomerOrder;
