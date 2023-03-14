import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";
import { check } from "../constant/check";
import { ReactCalculator } from "simple-react-calculator";
import Modal from "@mui/material/Modal";
import ReactLoading from "react-loading";

function QuickOrder() {
  const order = [];
  const [branch, setBranch] = useState("");
  const [branchId, setBranchId] = useState("");
  const [section, setSection] = useState("");
  const [category, setCategory] = useState("");
  const [food, setFood] = useState("");
  const [orderDetails, setOrderDetails] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState();
  const [vat, setVat] = useState();
  const [grandTotal, setGrandTotal] = useState();
  const [waiter, setWaiter] = useState();
  const [waiterOrders, setWaiterOrders] = useState();
  const [table, setTable] = useState();
  const [waiterId, setWaiterId] = useState();
  const [tableId, setTableId] = useState();
  const [customerName, setCustomerName] = useState();
  const [customerPhone, setCustomerPhone] = useState();
  const [loading, setLoading] = useState(false);
  const [memberId, setMemberId] = useState();
  const [searchFood, setSearchFood] = useState();

  const [msp, setMsp] = useState();
  const [disMsp, setDisMsp] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filterBySearch = (event) => {
    // Access input value

    const query = event.target.value;
    // Create copy of item list
    // console.log(query);
    // if (query == null) {
    //   return getFood();
    // }
    var updatedList = [...food];
    // Include all elements which includes the search query

    updatedList = searchFood.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFood(updatedList);
    // Trigger render with updated values
  };

  useEffect(() => {
    getSection();
    getCategory();
    getFood();
    getEmployee();
    getBranch();
    getTable();
  }, [branchId]);

  const getTable = () => {
    axios.get(`${baseUrl}/api/tables/${restaurant_id}`).then((response) => {
      //console.log(allData);
      setTable(response.data);
    });
  };
  const getBranch = () => {
    axios.get(`${baseUrl}/api/branch/${restaurant_id}`).then((response) => {
      setBranch(response.data);
    });
  };
  useEffect(() => {
    calTotal();
  }, [quantity, orderDetails, msp, disMsp]);

  const calTotal = () => {
    // console.log(orderDetails);

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
    console.log(msp);
    console.log(mspDis);
    setDisMsp(mspDis);
  };

  const getEmployee = () => {
    axios.get(`${baseUrl}/api/waiter-with-orders`).then((response) => {
      setWaiter(response.data.waiters);
      setWaiterOrders(response.data.attendOrder);
    });
  };

  const getSection = () => {
    axios.get(`${baseUrl}/api/sections`).then((response) => {
      setSection(response.data);
    });
  };
  const getCategory = () => {
    axios.get(`${baseUrl}/api/categories`).then((response) => {
      setCategory(response.data);
    });
  };
  const getFood = () => {
    axios
      .get(
        `${baseUrl}/api/quick-foods/${restaurant_id}/${
          branchId ? branchId : restaurant_id
        }`
      )
      .then((response) => {
        setFood(response.data);
        setSearchFood(response.data);
      });
  };
  const selectBranch = (event) => {
    setBranchId(event.target.value);
    setOrderDetails([]);
  };
  const foodByCategory = (id) => {
    axios
      .get(
        `${baseUrl}/api/category-foods/${id}/${restaurant_id}/${
          branchId ? branchId : restaurant_id
        }`
      )
      .then((response) => {
        setFood(response.data);
      });
  };
  const addTocart = (id) => {
    if (orderDetails.find((data) => data[0].food_id == id)) {
      Swal.fire({
        title: "Already Added",
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      const newItem = food.find((val) => {
        if (id === val.id) {
          order.push({
            food_name: val.name,
            food_id: val.id,
            item_code: val.item_code,
            food_price: val.price,
            basic: val.basic_price,
            qty: 1,
          });

          setOrderDetails((state) => [...state, order]);
        }
      });
    }
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

  const cancleOrder = () => {
    setOrderDetails([]);
  };
  const memberSubmit = () => {
    setLoading(true);
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
        setCustomerName(response.data.member_name);
        setCustomerPhone(response.data.mobile);
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

    axios
      .post(`${baseUrl}/api/order-store`, {
        restaurant_id: restaurant_id,
        branch_id: branchId,

        item: orderDetails.length,
        total: total,
        grand_price: grandTotal,
        pickup_method: "pos",
        vat: vat,
        discount: disMsp,
        details: orderDetails,
        customer_name: customerName,
        customer_phone: customerPhone,
        table_id: tableId,
        waiter_id: waiterId,
      })
      .then((response) => {
        Swal.fire({
          title: response.data.msg,
          icon: "success",
          confirmButtonText: "OK",
        });
      });
    setOrderDetails([]);
  };

  return (
    <div>
      <div className="top-section"></div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Quick Order:</h4>
            <div className="card_section">
              <a href="/dashboard" className="btn btn-primary mr-1 mb-1">
                <i className="bi bi-house-door-fill"></i>Dashboard
              </a>
              <a href="" className="btn btn-info mr-1 mb-1">
                <i className="bi bi-view-list"></i>All Order
              </a>
              <a href="" className="btn btn-danger mr-1 mb-1">
                <i className="bi bi-plus-square"></i>New Order
              </a>
              <a href="" className="btn btn-warning mr-1 mb-1">
                <i className="bi bi-arrow-left-right"></i>OnGoing Order
              </a>
              <a href="" className="btn btn-success mr-1 mb-1">
                <i className="bi bi-question-square-fill"></i>Kitchen Status
              </a>
              <a href="" className="btn btn-warning mr-1 mb-1">
                <i className="bi bi-arrow-90deg-up"></i>Online Order
              </a>
              <a href="" className="btn btn-success mr-1 mb-1">
                <i className="bi bi-qr-code"></i>QR Order
              </a>
              <a href="" className="btn btn-danger mr-1 mb-1">
                <i className="bi bi-x-square-fill"></i>Cancel Order
              </a>
              <a href="" className="btn btn-info">
                <i className="bi bi-alarm"></i>Today's Order
              </a>
            </div>
            <br></br>
            <div className="two_part ">
              <Form.Control
                type="search"
                name="search-form"
                placeholder="Search for..."
                id="search-box"
                onChange={filterBySearch}
              ></Form.Control>
              <select onChange={selectBranch}>
                <option value="">Select Branch from here...</option>
                {branch
                  ? branch.map((data) => (
                      <option value={data.id}>{data.city}</option>
                    ))
                  : null}
              </select>
            </div>
            <div className="two_part">
              <div className="section-11 section-border">
                <ul className="list-unstyled components mb-5">
                  <li>
                    <Link onClick={getFood}>
                      <p className="menu-style">All</p>
                    </Link>
                  </li>

                  <li>
                    {category
                      ? category.map((data) => (
                          <ul>
                            <li>
                              <Link
                                onClick={() => {
                                  foodByCategory(data.id);
                                }}
                              >
                                {data.category_name}
                              </Link>
                            </li>
                          </ul>
                        ))
                      : null}
                  </li>
                </ul>
              </div>
              <div className="section-12 section-border">
                <div className="container">
                  <div className="row">
                    {food
                      ? food.map((data) => (
                          <div className="col">
                            <img
                              className="food-image"
                              src={`${baseUrl}/foods/small/${data.image}`}
                              alt={data.name}
                            ></img>
                            <p className="img-level cart-height">
                              {data.name} <br></br>$ <span>{data.price}</span>
                            </p>
                            <button
                              className="btn btn-outline-warning btn-cart"
                              onClick={() => {
                                addTocart(data.id);
                              }}
                            >
                              <i className="bi bi-cart-x-fill"></i> Add To Cart
                            </button>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              </div>
              <div className="section-13 section-border">
                <div className="block_01 margin-style">
                  <h4>Member?</h4>
                  <p>Enter your member id if you are member.</p>
                  <div className="">
                    <div className="wid">
                      <Form.Label className="label-style">
                        Enter Member Id
                      </Form.Label>
                      <div className="two_part">
                        <Form.Control
                          name="coupon"
                          type="text"
                          placeholder="Enter Member Id"
                          onChange={(event) => {
                            setMemberId(event.target.value);
                          }}
                        />
                        {loading ? (
                          <ReactLoading type="cylon" />
                        ) : (
                          <button
                            className="btn btn-primary"
                            onClick={memberSubmit}
                          >
                            Submit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <br></br>
                <div className="margin-style two_part">
                  <div className="wid">
                    <Form.Label className="label-style">
                      Customer name
                    </Form.Label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Customer name"
                      value={customerName}
                      onChange={(event) => {
                        setCustomerName(event.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="wid">
                    <Form.Label className="label-style">Phone</Form.Label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Customer Phone"
                      value={customerPhone}
                      onChange={(event) => {
                        setCustomerPhone(event.target.value);
                      }}
                    ></input>
                  </div>
                </div>
                <div className="margin-style two_part ">
                  <div className="wid">
                    <Form.Label className="label-style">
                      Select waiter
                    </Form.Label>
                    <select
                      onChange={(event) => {
                        setWaiterId(event.target.value);
                      }}
                    >
                      <option value="">Select here</option>
                      {waiter
                        ? waiter.map((data) => (
                            <option value={data.emp_id}>
                              {data.first_name} {data.last_name} (
                              {waiterOrders
                                ? waiterOrders.map((item) =>
                                    item.waiter_id == data.emp_id
                                      ? `${item.count ? item.count : '0'}`
                                      : null
                                  )
                                : null}
                              )
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                  <div className="wid">
                    <Form.Label className="label-style">
                      Select table
                    </Form.Label>
                    <select
                      onChange={(event) => {
                        setTableId(event.target.value);
                      }}
                    >
                      <option value="">Select here</option>
                      {table
                        ? table.map((data) => (
                            <option value={data.table_id}>
                              {data.table_name}({data.table_type})
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                </div>
                <div className="table-responsive">
                  <br></br>
                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th className="table-header-item">Item</th>
                        <th className="action">Price</th>
                        <th>Quantity</th>
                        <th className="action">Sub Total</th>
                        <th className="action">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails
                        ? orderDetails.map((data) => (
                            <tr>
                              <td>{data[0].food_name}</td>
                              <td className="level-quantity">
                                {data[0].food_price}
                              </td>
                              <td>
                                <button
                                  className="icon-plus"
                                  onClick={() => {
                                    increaseQty(data[0].food_id);
                                  }}
                                >
                                  <i className="bi bi-plus"></i>
                                </button>
                                <span className="level-quantity">
                                  {data[0].qty}
                                </span>
                                <button
                                  className="icon-minus"
                                  onClick={() => {
                                    descreaseQty(data[0].food_id);
                                  }}
                                >
                                  <i className="bi bi-dash"></i>
                                </button>
                              </td>
                              <td className="level-quantity">
                                {data[0].food_price * data[0].qty}{" "}
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
                  <br></br>
                  <div className="two_part btn-se">
                    <button className="btn btn-primary" onClick={handleOpen}>
                      <i className="bi bi-calculator"></i>
                    </button>
                    <button
                      onClick={() => {
                        cancleOrder();
                      }}
                      className="btn btn-danger"
                    >
                      <i className="bi bi-x-octagon-fill"></i>Cancel
                    </button>

                    <button
                      className="btn btn-success"
                      onClick={() => {
                        submitOrder();
                      }}
                    >
                      <i className="bi bi-check-square-fill"></i>Confirm Order
                    </button>
                  </div>
                  <br></br>
                  <br></br>
                  <br></br>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <div className="calculator">
                      <ReactCalculator />
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickOrder;
