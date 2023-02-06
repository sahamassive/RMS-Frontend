import React, { Component, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./style.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";

function CustomerOrder({}) {
  const [allData, setAllData] = useState([]);
  const { state } = useLocation();
  const [orderDetails, setOrderDetails] = useState(state);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState();
  const [pickup, setPickUp] = useState();
  const [vat, setVat] = useState();
  const [grandTotal, setGrandTotal] = useState();
  const branchId = localStorage.getItem("branchId");
  
  useEffect(() => {
    calTotal();
  }, [quantity, orderDetails]);
  
  const calTotal = () => {
    // console.log(orderDetails);

    let sum = 0;

    orderDetails.forEach((element) => {
      sum = sum + element[0].food_price * element[0].qty;
    });
    setTotal(sum);
    setVat((sum * 0.05).toFixed(2));
    setGrandTotal((sum + sum * 0.05).toFixed(2));
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

  const submitOrder = () => {
    // axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    if (pickup == null) {
      Swal.fire({
        title: "Please Select PickUp Method",
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      axios
        .post(`${baseUrl}/api/order-store`, {
          restaurant_id: restaurant_id,
          branch_id: branchId,

          item: orderDetails.length,
          total: total,
          grand_price: grandTotal,
          pickup_method: pickup,
          vat: vat,
          details: orderDetails,
        })
        .then((response) => {
          Swal.fire({
            title: "Order submitted",
            icon: "success",
            confirmButtonText: "OK",
          });
        });
    }
  };
  
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
                <a href="/" className="btn btn-outline-success right-side2">
                  <i className="bi bi-house-door-fill"></i>Back To Home
                </a>
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
                              <td>{data[0].food_price * data[0].qty} </td>
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
                <div onChange={(e) => setPickUp(e.target.value)}>
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
              </div>
              <div className="col-md-4 block_01">
                <h4>Coupon Code</h4>
                <p>Enter your coupon code if you have one.</p>
                <div className="">
                  <div className="wid">
                    <Form.Label className="label-style">
                      {" "}
                      Enter your coupon code{" "}
                    </Form.Label>
                    <Form.Control
                      name="coupon"
                      type="text"
                      placeholder="Enter your coupon code"
                    />
                  </div>
                </div>
                <button className="btn btn-warning btn-se">
                  <i className="bi bi-back"></i>Apply Coupon
                </button>
              </div>
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
                        <td>0</td>
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
    </div>
  );
}

export default CustomerOrder;
