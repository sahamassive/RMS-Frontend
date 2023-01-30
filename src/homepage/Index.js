import React, { Component, useEffect, useState, createContext } from "react";
import "../homepage/assets/css/style.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl, resturant_id } from "../app/user-pages/constant/global";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

function Index() {
  const [resturant, setResturant] = useState("");
  const [branch, setBranch] = useState("");
  const [branchName, setBranchName] = useState("");
  const [branchPhone, setBranchPhone] = useState("");
  const [branchEmail, setBranchEmail] = useState("");
  const [branchAddres, setBranchAddress] = useState("");

  const [branchId, setBranchId] = useState("");
  const [category, setCategory] = useState("");
  const [food, setFood] = useState("");
  const [spfood, setSpFood] = useState("");
  const [singlefood, setSingleFood] = useState("");
  const [orderDetails, setOrderDetails] = useState([]);
  const order = [];
  const [open, setOpen] = React.useState(false);
  const [branchModalStatus, setBranchModalStatus] = React.useState(false);

  //booking
  const [bookingDate, setBookingDate] = useState();
  const [numberOfPeople, setNumberOfPeople] = useState();
  const [table, setTable] = useState();
  const [type, setType] = useState();
  const [startingTime, setStartingTime] = useState();
  const [endingTime, setEndingTime] = useState();

  const [fname, setFname] = useState();

  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [note, setNote] = useState();
  const [location, setLocation] = useState({});
  const [userCity, setuserCity] = useState();

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
    formData.append("note", note);
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

  const branchOpen = () => {
    getBranch();
    setBranchModalStatus(true);
  };

  const branchClose = () => setBranchModalStatus(false);

  const handleOpen = (id) => {
    axios
      .get(`${baseUrl}/api/food-edit/${id}`)

      .then((res) => {
        setSingleFood(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(true);
    console.log(singlefood.name);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    getFood();
    getspFood();
  }, [branchId]);

  useEffect(() => {
    getCategory();
    getResturant();
    getBranch();
    getLocation();
    localStorage.removeItem("branchId");
  }, []);
  useEffect(() => {
    defultbranch();
  }, [userCity]);

  useEffect(() => {
    getLocation();
  }, [location]);
  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        // get address information using Nominatim API
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.latitude}&lon=${location.longitude}`
        );
        if (location) {
          const data = await response.json();
          const b = data.address ? data.address.city : null;
          setuserCity(b);
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };
  const getFood = () => {
    axios
      .get(
        `${baseUrl}/api/quick-foods/${resturant_id}/${
          branchId ? branchId : resturant_id
        }`
      )
      .then((response) => {
        setFood(response.data);
      });
  };
  const getBranch = () => {
    axios.get(`${baseUrl}/api/branch/${resturant_id}`).then((response) => {
      setBranch(response.data);
      setBranchName(response.data[0].city);
    });
  };
  const getResturant = () => {
    axios.get(`${baseUrl}/api/restaurant/${resturant_id}`).then((response) => {
      setResturant(response.data);
    });
  };
  const defultbranch = () => {
    axios
      .get(
        `${baseUrl}/api/restaurant/${resturant_id}/${
          userCity ? userCity : null
        }`
      )
      .then((response) => {
        setBranchId(response.data.id);
        setBranchName(response.data.city);

        setBranchPhone(response.data.phone);
        setBranchAddress(response.data.address);
        setBranchEmail(response.data.email);
      });
  };
  const getCategory = () => {
    axios.get(`${baseUrl}/api/categories`).then((response) => {
      setCategory(response.data);
    });
  };
  const foodByCategory = (id) => {
    axios
      .get(
        `${baseUrl}/api/category-foods/${id}/${resturant_id}/${
          branchId ? branchId : resturant_id
        }`
      )
      .then((response) => {
        setFood(response.data);
      });
  };
  const getspFood = () => {
    axios.get(`${baseUrl}/api/sp-foods`).then((response) => {
      setSpFood(response.data);
    });
  };
  const selectBranch = (id, city, phone, address, email) => {
    setBranchId(id);
    setBranchName(city);
    setOrderDetails([]);
    setBranchPhone(phone);
    setBranchAddress(address);
    setBranchEmail(email);
    setBranchModalStatus(false);
    localStorage.setItem("branchId", id);
    setBranchId(id);
    console.log(resturant);
    console.log(userCity);
  };

  const setMainBranch = () => {
    setBranchId("");
    setBranchModalStatus(false);
    localStorage.removeItem("branchId");
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
            image: val.image,
            food_price: val.price,
            qty: 1,
          });

          setOrderDetails((state) => [...state, order]);
        }
      });
    }
  };
  return (
    <div>
      <div id="topbar" className="d-flex align-items-center fixed-top">
        <div className="container d-flex justify-content-center justify-content-md-between">
          <div className="contact-info d-flex align-items-center">


            <button className="branch-style"><i className="bi bi-phone d-flex align-items-center">
              <span className="branch-style">
                <a href={`tel: ${resturant.phone}`}></a>{resturant.phone}
              </span>
            </i></button>


            <i className="bi bi-clock d-flex align-items-center ms-4">
              <span className="active-time"> Sat-Fri: 10AM - 11PM</span>
            </i>
          </div>
          <div>
            <button
              className="branch-style"
              onClick={() => {
                branchOpen();
              }}
            >
              <i className="bi bi-geo-alt-fill icon-space4"></i>
              {resturant.restaurant_name},{" "}
              {branchId ? branchName : resturant.city}
            </button>
          </div>
        </div>
      </div>
      <header id="header" className="fixed-top d-flex align-items-cente">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-lg-between">
          <div className="dis">
            <h3 className="logo me-auto me-lg-0">
              <a href="index.html">
                <img
                  src={`${baseUrl}/restaurants/small/${resturant.logo}`}
                ></img>
              </a>
            </h3>
            <div className="logo me-auto me-lg-0">
              <span className="res"> Restaurent</span>
              <span className="company_name">FOOD</span>{" "}
            </div>
          </div>
          <nav
            id="navbar"
            className="navbar order-last order-lg-0 nav-menu2 cart-icon"
          >
            <ul>
              <li>
                <a className="nav-link scrollto active" href="#hero">
                  Home
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#about">
                  About
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#menu">
                  Menu
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#specials">
                  Specials
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#events">
                  Events
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#chefs">
                  Chefs
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#gallery">
                  Gallery
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#contact">
                  Contact
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="/login">
                  Login
                </a>
              </li>
              <li>
                <Link
                  className="nav-link scrollto"
                  to={{
                    pathname: "/customer-order",
                    state: orderDetails,
                  }}
                >
                  <i className="bi bi-cart4"></i>
                  <span className="cart-number">{orderDetails.length}</span>
                </Link>
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
          <a
            href="#book-a-table"
            className="book-a-table-btn scrollto d-none d-lg-flex"
          >
            Book a table
          </a>
        </div>
      </header>
      <section id="hero" className="d-flex align-items-center">
        <div
          className="container position-relative text-center text-lg-start"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <div className="row">
            <div className="col-lg-8 writing-style">
              <h1 className="writing-style">
                Welcome to <span>Restaurant</span>
              </h1>
              <h2>Delivering great food for more than 18 years!</h2>
              <div className="btns">
                <a href="#menu" className="btn-menu animated fadeInUp scrollto">
                  Our Menu
                </a>
                <a
                  href="#book-a-table"
                  className="btn-book animated fadeInUp scrollto"
                >
                  Book a Table
                </a>
              </div>
            </div>
            <div
              className="col-lg-4 d-flex align-items-center justify-content-center position-relative"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <a
                href="https://www.youtube.com/watch?v=u6BOC7CDUTQ"
                className="glightbox play-btn"
              ></a>
            </div>
          </div>
        </div>
      </section>
      <main id="main">
        <section id="about" className="about">
          <div className="container" data-aos="fade-up">
            <div className="row">
              <div
                className="col-lg-6 order-1 order-lg-2"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <div className="about-img">
                  <img src={require("./assets/img/about.jpg")} alt=""></img>
                </div>
              </div>
              <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content writing-style">
                <h3 className="writing-style">
                  We provide for the most worthy food and taste, as if the
                  pleasures of the body and mind were to be assumed.
                </h3>
                <p className="fst-italic">
                  Our moto is to provide the best food possible to our customer.
                  and also no compromise with quality, taste and health.
                </p>
                <ul>
                  <li>
                    <i className="bi bi-check-circle"></i> Best Environment.
                  </li>
                  <li>
                    <i className="bi bi-check-circle"></i>Best taste.
                  </li>
                  <li>
                    <i className="bi bi-check-circle"></i> Best chef.
                  </li>
                  <li>
                    <i className="bi bi-check-circle"></i> Best food.
                  </li>
                </ul>
                <p>
                  Hungry? no problem. We are here to serve you. Morning
                  breakfast, lunch, tea, coffee, evening items and dinner. Also
                  any kind of event like marriage anniversary, dinner party,
                  barthday party nad many more.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="why-us" className="why-us">
          <div className="container" data-aos="fade-up">
            <div className="section-title writing-style">
              <h2>Why Us</h2>
              <p>Why Choose Our Restaurant</p>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div
                  className="box writing-style"
                  data-aos="zoom-in"
                  data-aos-delay="100"
                >
                  <span>01</span>
                  <h4>Best Environment</h4>
                  <p>Nice, calm, clean, excellent orientation and many more.</p>
                </div>
              </div>
              <div className="col-lg-4 mt-4 mt-lg-0">
                <div
                  className="box writing-style"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                >
                  <span>02</span>
                  <h4>Best Quality Food</h4>
                  <p>
                    No compromise in taste nad food quality. Better menus and
                    world class chefs.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 mt-4 mt-lg-0">
                <div
                  className="box writing-style"
                  data-aos="zoom-in"
                  data-aos-delay="300"
                >
                  <span>03</span>
                  <h4> World Class Service</h4>
                  <p>
                    Our staff is very user friendly. and attend each and every
                    customer with care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="menu" className="menu section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Menu</h2>
              <p>Check Our Tasty Menu</p>
            </div>
            <div className="row" data-aos="fade-up" data-aos-delay="100">
              <div className="col-lg-12 d-flex justify-content-center">
                <ul id="menu-flters">
                  <Link
                    data-filter="*"
                    className="filter-active space-category btn btn-outline-light"
                    onClick={getFood}
                  >
                    All
                  </Link>
                  {category
                    ? category.map((data) => (
                        <Link
                          onClick={() => {
                            foodByCategory(data.id);
                          }}
                          data-filter=".filter-starters"
                          className="space-category btn btn-outline-light"
                        >
                          {data.category_name}
                        </Link>
                      ))
                    : null}
                </ul>
              </div>
            </div>
            <div className="row" data-aos="fade-up" data-aos-delay="200">
              {food
                ? food.map((data) => (
                    <div className="col-lg-4 menu-item">
                      <img
                        src={`${baseUrl}/foods/small/${data.image}`}
                        className="menu-img"
                        alt=""
                      ></img>
                      <div className="menu-content">
                        <a href="#">{data.name}</a>
                        <span>$ {data.price}</span>
                      </div>
                      <div className="menu-ingredients">
                        {data.description.substring(0, 50)}
                      </div>
                      <button
                        className="btn btn-outline-warning cart-style"
                        onClick={() => {
                          addTocart(data.id);
                        }}
                      >
                        <i className="bi bi-cart4"></i>Add to Cart
                      </button>
                      <button
                        onClick={() => {
                          handleOpen(data.id);
                        }}
                        className="btn btn-outline-warning details-style"
                      >
                        <i className="bi bi-info-square"></i>Details
                      </button>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </section>
        <section id="specials" className="specials">
          <div className="container writing-style" data-aos="fade-up">
            <div className="section-title writing-style">
              <h2>Specials</h2>
              <p>Check Our Specials</p>
            </div>
            <div className="row" data-aos="fade-up" data-aos-delay="100">
              <div className="col-lg-3">
                <ul className="nav nav-tabs flex-column">
                  {spfood
                    ? spfood.map((data, index) => (
                        <li className="nav-item">
                          <a
                            className={
                              index == 0 ? "nav-link active show" : "nav-link"
                            }
                            data-bs-toggle="tab"
                            href={`#tab-${index}`}
                          >
                            {data.name}
                          </a>
                        </li>
                      ))
                    : null}
                </ul>
              </div>
              <div className="col-lg-9 mt-4 mt-lg-0">
                <div className="tab-content">
                  {spfood
                    ? spfood.map((data, index) => (
                        <div
                          className={
                            index == 0 ? "tab-pane active show" : "tab-pane"
                          }
                          id={`tab-${index}`}
                        >
                          <div className="row">
                            <div className="col-lg-8 details order-2 order-lg-1">
                              <h3>The best food is possible to get</h3>
                              <p className="fst-italic">{data.description}</p>
                              <p></p>
                            </div>
                            <div className="col-lg-4 text-center order-1 order-lg-2">
                              <img
                                src={`${baseUrl}/foods/small/${data.image}`}
                                alt=""
                                className="img-fluid"
                              ></img>
                            </div>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="events" className="events writing-style">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Events</h2>
              <p>Organize Your Events in our Restaurant</p>
            </div>
            <div
              className="events-slider swiper"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="row event-item">
                    <div className="col-lg-6">
                      <img
                        src={require("./assets/img/event-birthday.jpg")}
                        className="img-fluid"
                        alt=""
                      ></img>
                    </div>
                    <div className="col-lg-6 pt-4 pt-lg-0 content">
                      <h3>Birthday Parties</h3>
                      <div className="price">
                        <p>
                          <span>$189</span>
                        </p>
                      </div>
                      <p className="fst-italic">
                        Birthdays are the most special day of the year for
                        children. It is a day full of celebrations where
                        children enjoy many fun activities, party with their
                        friends and family, receive a lot of gifts and of
                        course.
                      </p>
                      <ul>
                        <li>
                          <i className="bi bi-check-circled"></i> Talk about
                          your birthday and the celebrations you have planned.
                        </li>
                        <li>
                          <i className="bi bi-check-circled"></i> You just
                          imagine, We will make it live.
                        </li>
                        <li>
                          <i className="bi bi-check-circled"></i> Your birthday
                          our responsibility.
                        </li>
                      </ul>
                      <p>
                        These are all fun, and memorable moments, which children
                        will remember for a long time. So, while writing an
                        essay on this topic, they will indeed have a lot of
                        ideas.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="row event-item">
                    <div className="col-lg-6">
                      <img
                        src={require("./assets/img/event-private.jpg")}
                        className="img-fluid"
                        alt=""
                      ></img>
                    </div>
                    <div className="col-lg-6 pt-4 pt-lg-0 content">
                      <h3>Private Parties</h3>
                      <div className="price">
                        <p>
                          <span>$290</span>
                        </p>
                      </div>
                      <p className="fst-italic">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                      <ul>
                        <li>
                          <i className="bi bi-check-circled"></i> Ullamco
                          laboris nisi ut aliquip ex ea commodo consequat.
                        </li>
                        <li>
                          <i className="bi bi-check-circled"></i> Duis aute
                          irure dolor in reprehenderit in voluptate velit.
                        </li>
                        <li>
                          <i className="bi bi-check-circled"></i> Ullamco
                          laboris nisi ut aliquip ex ea commodo consequat.
                        </li>
                      </ul>
                      <p>
                        Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur
                      </p>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="row event-item">
                    <div className="col-lg-6">
                      <img
                        src={require("./assets/img/event-custom.jpg")}
                        className="img-fluid"
                        alt=""
                      ></img>
                    </div>
                    <div className="col-lg-6 pt-4 pt-lg-0 content">
                      <h3>Custom Parties</h3>
                      <div className="price">
                        <p>
                          <span>$99</span>
                        </p>
                      </div>
                      <p className="fst-italic">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                      <ul>
                        <li>
                          <i className="bi bi-check-circled"></i> Ullamco
                          laboris nisi ut aliquip ex ea commodo consequat.
                        </li>
                        <li>
                          <i className="bi bi-check-circled"></i> Duis aute
                          irure dolor in reprehenderit in voluptate velit.
                        </li>
                        <li>
                          <i className="bi bi-check-circled"></i> Ullamco
                          laboris nisi ut aliquip ex ea commodo consequat.
                        </li>
                      </ul>
                      <p>
                        Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </section>
        <section id="book-a-table" className="book-a-table">
          <div className="container" data-aos="fade-up">
            <div className="section-title writing-style">
              <h2>Reservation</h2>
              <p>Book a Table</p>
            </div>
            <form
              action="forms/book-a-table.php"
              method="post"
              role="form"
              className="php-email-form"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="row">
                <div className="col-lg-4 col-md-6 form-group">
                  <label>Your name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={(event) => {
                      setFname(event.target.value);
                    }}
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                    data-rule="minlen:4"
                    data-msg="Please enter at least 4 chars"
                  ></input>
                  <div className="validate"></div>
                </div>
                <div className="col-lg-4 col-md-6 form-group mt-3 mt-md-0">
                  <label>E-mail</label>
                  <input
                    type="email"
                    className="form-control"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    placeholder="Your Email"
                    data-rule="email"
                    data-msg="Please enter a valid email"
                  ></input>
                  <div className="validate"></div>
                </div>
                <div className="col-lg-4 col-md-6 form-group mt-3 mt-md-0">
                  <label>Phone number</label>
                  <PhoneInput
                    className="phone-style"
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry="BD"
                    value={phone}
                    onChange={setPhone}
                  />
                  <div className="validate"></div>
                </div>
                <div className="col-lg-4 col-md-6 form-group mt-3">
                  <label>Booking Date</label>
                  <input
                    type="date"
                    className="form-control"
                    onChange={(event) => {
                      setBookingDate(event.target.value);
                    }}
                    placeholder="Date"
                    data-rule="minlen:4"
                    data-msg="Please enter at least 4 chars"
                  ></input>
                  <div className="validate"></div>
                </div>
                <div className="col-lg-4 col-md-6 form-group mt-3">
                  <label>Starting time</label>
                  <input
                    type="time"
                    className="form-control"
                    onChange={(event) => {
                      setStartingTime(event.target.value);
                    }}
                    placeholder="Starting Time"
                    data-rule="minlen:4"
                    data-msg="Please enter at least 4 chars"
                  ></input>
                  <div className="validate"></div>
                </div>
                <div className="col-lg-4 col-md-6 form-group mt-3">
                  <label>Ending time</label>
                  <input
                    type="time"
                    className="form-control"
                    onChange={(event) => {
                      setEndingTime(event.target.value);
                    }}
                    placeholder="Ending Time"
                    data-rule="minlen:4"
                    data-msg="Please enter at least 4 chars"
                  ></input>
                  <div className="validate"></div>
                </div>
                <div className="col-lg-4 col-md-6 form-group mt-3">
                  <label>Number Of people</label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(event) => {
                      setNumberOfPeople(event.target.value);
                    }}
                    placeholder="# of people"
                    data-rule="minlen:1"
                    data-msg="Please enter at least 1 chars"
                  ></input>
                  <div className="validate"></div>
                </div>
                <div className="col-lg-4 col-md-6 form-group mt-3">
                  <label>Type of Booking</label>
                  <select
                    onChange={(event) => {
                      setType(event.target.value);
                    }}
                    className="form-control area"
                  >
                    <option value="">Select here</option>
                    <option value="birthday">Birthday</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="Others">Others</option>
                  </select>
                  <div className="validate"></div>
                </div>
                <div className="col-lg-4 col-md-6 form-group mt-3">
                  <label> Select table</label>
                  <select
                    onChange={(event) => {
                      setTable(event.target.value);
                    }}
                    className="form-control area"
                  >
                    <option value="">Select here</option>
                    <option value="table-1">Table 1</option>
                    <option value="table-2">Table 2</option>
                    <option value="table-3">Table 3</option>
                  </select>
                  <div className="validate"></div>
                </div>
              </div>
              <div className="form-group mt-3">
                <label>Any Special Note</label>
                <textarea
                  className="form-control area"
                  name="message"
                  rows="5"
                  placeholder="Message"
                  onChange={(event) => {
                    setNote(event.target.value);
                  }}
                ></textarea>
                <div className="validate"></div>
              </div>
              <div className="mb-3">
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">
                  Your booking request was sent. We will call back or send an
                  Email to confirm your reservation. Thank you!
                </div>
              </div>
              <div className="text-center">
                <button type="submit" onClick={insert}>
                  Book a Table
                </button>
              </div>
            </form>
          </div>
        </section>
        <section id="testimonials" className="testimonials section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title writing-style">
              <h2>Testimonials</h2>
              <p>What they're saying about us</p>
            </div>
            <div
              className="testimonials-slider swiper"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                      One of the best mutton kacchi on the town. You couldn't
                      deny their test if you are eleganter people. There mutton
                      is very soft & spicy. The KACCHI is from Bashmati rice
                      which is boiled well. I love their BORHANI most. It was
                      perfect tasted. The atmosphere was cool & very Gentle. You
                      could spend your quality time with your special one here.{" "}
                      <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                    </p>
                    <img
                      src="https://www.mirpurclubltd.com/wp-content/uploads/2022/03/0B-5-768x682.jpg"
                      className="testimonial-img"
                      alt=""
                    ></img>
                    <h4>SM Mahabub Alam</h4>
                    <h4>
                      Founding President, <br></br>Entrepreneurs and
                      Professionals Mirpur Club Ltd.
                    </h4>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left"></i>I
                      think the quantity was rice was usual and more than enough
                      for one person. We were 7 and we took 3platters which were
                      sufficient for us.❣️{" "}
                      <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                    </p>
                    <img
                      src={require("./assets/img/testimonials/testimonials-2.jpg")}
                      className="testimonial-img"
                      alt=""
                    ></img>
                    <h3>Sara Wilsson</h3>
                    <h4>Designer</h4>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                      Thanks to our local colleagues who brought us to this
                      place. Authentic Bangladeshi cuisine. I am not fan of
                      mutton but this one was made to perfection. Taste was
                      good, meat was tender. The drink in yellow green colour is
                      popular. A touch of saltiness and spiciness and sweet….
                      New experience 😀. Only cash payment.{" "}
                      <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                    </p>
                    <img
                      src={require("./assets/img/testimonials/testimonials-3.jpg")}
                      className="testimonial-img"
                      alt=""
                    ></img>
                    <h3>Jena Karlis</h3>
                    <h4>Store Owner</h4>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                      Fugiat enim eram quae cillum dolore dolor amet nulla culpa
                      multos export minim fugiat minim velit minim dolor enim
                      duis veniam ipsum anim magna sunt elit fore quem dolore
                      labore illum veniam.
                      <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                    </p>
                    <img
                      src={require("./assets/img/testimonials/testimonials-4.jpg")}
                      className="testimonial-img"
                      alt=""
                    ></img>
                    <h3>Matt Brandon</h3>
                    <h4>Freelancer</h4>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                      Quis quorum aliqua sint quem legam fore sunt eram irure
                      aliqua veniam tempor noster veniam enim culpa labore duis
                      sunt culpa nulla illum cillum fugiat legam esse veniam
                      culpa fore nisi cillum quid.
                      <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                    </p>
                    <img
                      src={require("./assets/img/testimonials/testimonials-5.jpg")}
                      className="testimonial-img"
                      alt=""
                    ></img>
                    <h3>John Larson</h3>
                    <h4>Entrepreneur</h4>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </section>
        <section id="gallery" className="gallery">
          <div className="container" data-aos="fade-up">
            <div className="section-title writing-style">
              <h2>Gallery</h2>
              <p>Some photos from Our Restaurant</p>
            </div>
          </div>
          <div
            className="container-fluid"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="row g-0">
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a
                    href="assets/img/gallery/gallery-1.jpg"
                    className="gallery-lightbox"
                    data-gall="gallery-item"
                  >
                    <img
                      src={require("./assets/img/gallery/gallery-1.jpg")}
                      alt=""
                      className="img-fluid"
                    ></img>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a
                    href="assets/img/gallery/gallery-2.jpg"
                    className="gallery-lightbox"
                    data-gall="gallery-item"
                  >
                    <img
                      src={require("./assets/img/gallery/gallery-2.jpg")}
                      alt=""
                      className="img-fluid"
                    ></img>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a
                    href="assets/img/gallery/gallery-3.jpg"
                    className="gallery-lightbox"
                    data-gall="gallery-item"
                  >
                    <img
                      src={require("./assets/img/gallery/gallery-3.jpg")}
                      alt=""
                      className="img-fluid"
                    ></img>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a
                    href="assets/img/gallery/gallery-4.jpg"
                    className="gallery-lightbox"
                    data-gall="gallery-item"
                  >
                    <img
                      src={require("./assets/img/gallery/gallery-4.jpg")}
                      alt=""
                      className="img-fluid"
                    ></img>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a
                    href="assets/img/gallery/gallery-5.jpg"
                    className="gallery-lightbox"
                    data-gall="gallery-item"
                  >
                    <img
                      src={require("./assets/img/gallery/gallery-5.jpg")}
                      alt=""
                      className="img-fluid"
                    ></img>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a
                    href="assets/img/gallery/gallery-6.jpg"
                    className="gallery-lightbox"
                    data-gall="gallery-item"
                  >
                    <img
                      src={require("./assets/img/gallery/gallery-6.jpg")}
                      alt=""
                      className="img-fluid"
                    ></img>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a
                    href="assets/img/gallery/gallery-7.jpg"
                    className="gallery-lightbox"
                    data-gall="gallery-item"
                  >
                    <img
                      src={require("./assets/img/gallery/gallery-7.jpg")}
                      alt=""
                      className="img-fluid"
                    ></img>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a
                    href="assets/img/gallery/gallery-8.jpg"
                    className="gallery-lightbox"
                    data-gall="gallery-item"
                  >
                    <img
                      src={require("./assets/img/gallery/gallery-8.jpg")}
                      alt=""
                      className="img-fluid"
                    ></img>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="chefs" className="chefs">
          <div className="container" data-aos="fade-up">
            <div className="section-title writing-style">
              <h2>Chefs</h2>
              <p>Our Proffesional Chefs</p>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="member" data-aos="zoom-in" data-aos-delay="100">
                  <img
                    src={require("./assets/img/chefs/chefs-1.jpg")}
                    className="img-fluid image-size"
                    alt=""
                  ></img>
                  <div className="member-info">
                    <div className="member-info-content">
                      <h4>Walter White</h4>
                      <span>Master Chef</span>
                    </div>
                    <div className="social">
                      <a href="">
                        <i className="bi bi-twitter"></i>
                      </a>
                      <a href="">
                        <i className="bi bi-facebook"></i>
                      </a>
                      <a href="">
                        <i className="bi bi-instagram"></i>
                      </a>
                      <a href="">
                        <i className="bi bi-linkedin"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="member" data-aos="zoom-in" data-aos-delay="200">
                  <img
                    src={require("./assets/img/chefs/chefs-2.jpg")}
                    className="img-fluid image-size"
                    alt=""
                  ></img>
                  <div className="member-info">
                    <div className="member-info-content">
                      <h4>Sarah Jhonson</h4>
                      <span>Patissier</span>
                    </div>
                    <div className="social">
                      <a href="">
                        <i className="bi bi-twitter"></i>
                      </a>
                      <a href="">
                        <i className="bi bi-facebook"></i>
                      </a>
                      <a href="">
                        <i className="bi bi-instagram"></i>
                      </a>
                      <a href="">
                        <i className="bi bi-linkedin"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="member" data-aos="zoom-in" data-aos-delay="300">
                  <img
                    src={require("./assets/img/chefs/chefs-3.jpg")}
                    className="img-fluid image-size"
                    alt=""
                  ></img>
                  <div className="member-info">
                    <div className="member-info-content">
                      <h4>William Anderson</h4>
                      <span>Cook</span>
                    </div>
                    <div className="social">
                      <a href="">
                        <i className="bi bi-twitter"></i>
                      </a>
                      <a href="">
                        <i className="bi bi-facebook"></i>
                      </a>
                      <a href="">
                        <i className="bi bi-instagram"></i>
                      </a>
                      <a href="">
                        <i className="bi bi-linkedin"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="contact">
          <div className="container" data-aos="fade-up">
            <div className="section-title writing-style">
              <h2>Contact</h2>
              <p>Contact Us</p>
            </div>
          </div>
          <div data-aos="fade-up">
            <iframe
              className="map-style"
              src="https://maps.google.com/maps?q=Mirpur%20club,&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          <div className="container" data-aos="fade-up">
            <div className="row mt-5">
              <div className="col-lg-4">
                <div className="info writing-style">
                  <div className="address">
                    <i className="bi bi-geo-alt"></i>
                    <h4>Location:</h4>
                    <p>
                      {branchId
                        ? `${branchAddres},${branchName}`
                        : `${resturant.address},${resturant.state},${resturant.city}`}
                    </p>
                  </div>
                  <div className="open-hours">
                    <i className="bi bi-clock"></i>
                    <h4>Open Hours:</h4>
                    <p>
                      Monday-Saturday:<br></br>
                      11:00 AM - 2300 PM
                    </p>
                  </div>
                  <div className="email">
                    <i className="bi bi-envelope"></i>
                    <h4>Email:</h4>
                    <p>{branchId ? branchEmail : resturant.email}</p>
                  </div>
                  <div className="phone">
                    <i className="bi bi-phone"></i>
                    <h4>Call:</h4>
                    <p>{branchId ? branchPhone : resturant.phone}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 mt-5 mt-lg-0">
                <form
                  action="forms/contact.php"
                  method="post"
                  role="form"
                  className="php-email-form"
                >
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                        required
                      ></input>
                    </div>
                    <div className="col-md-6 form-group mt-3 mt-md-0">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Your Email"
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      id="subject"
                      placeholder="Subject"
                      required
                    ></input>
                  </div>
                  <div className="form-group mt-3">
                    <textarea
                      className="form-control"
                      name="message"
                      rows="8"
                      placeholder="Message"
                      required
                    ></textarea>
                  </div>
                  <div className="my-3">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">
                      Your message has been sent. Thank you!
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit">Send Message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div id="footer">
        <div className="footer-top writing-style">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="footer-info">
                  <div className="dis">
                    <h3 className="logo me-auto me-lg-0">
                      <a href="index.html">
                        <img
                          src={`${baseUrl}/restaurants/small/${resturant.logo}`}
                          width="10rem"
                        ></img>
                      </a>
                    </h3>
                    <div>
                      <span className="res"> {resturant.restaurant_name}</span>
                      <span className="company_name">FOOD</span>
                    </div>
                  </div>
                  <p>
                    <span className="res"> Main Branch</span>
                    <br></br>
                    {resturant.address},<br></br>
                    {resturant.state}, {resturant.city},{resturant.country}
                    <br></br>
                    <br></br>
                    <strong>Phone:</strong>
                    {resturant.phone}
                    <br></br>
                    <strong>Email:</strong>
                    {resturant.email}
                    <br></br>
                  </p>
                  <div className="social-links mt-3">
                    <a href="#" className="twitter">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="#" className="facebook">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#" className="instagram">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="#" className="google-plus">
                      <i className="bi bi-skype"></i>
                    </a>
                    <a href="#" className="linkedin">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-6 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li>
                    <i className="bi bi-chevron-right"></i> <a href="#">Home</a>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right"></i>{" "}
                    <a href="#">About us</a>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right"></i>{" "}
                    <a href="#">Services</a>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right"></i>{" "}
                    <a href="#">Terms of service</a>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right"></i>{" "}
                    <a href="#">Privacy policy</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Our Services</h4>
                <ul>
                  <li>
                    <i className="bi bi-chevron-right"></i>{" "}
                    <a href="#">Morning Breakfast</a>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right"></i>{" "}
                    <a href="#">Lunch</a>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right"></i>{" "}
                    <a href="#">Snaks</a>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right"></i>{" "}
                    <a href="#">Dinnar</a>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right"></i>{" "}
                    <a href="#">Booking/Reservations</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-4 col-md-6 footer-newsletter">
                <h4>Our Newsletter</h4>
                <p>
                  Tamen quem nulla quae legam multos aute sint culpa legam
                  noster magna
                </p>
                <form action="" method="post">
                  <input type="email" name="email"></input>
                  <input type="submit" value="Subscribe"></input>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="copyright">
            &copy; Copyright <strong></strong>. All Rights Reserved
          </div>
          <div className="credits">
            Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="food-details">
          <div className="dis">
            <div className="sec-image">
              <img
                src={`${baseUrl}/foods/medium/${singlefood.image}`}
                width="70%"
              ></img>
            </div>
            <div className="sec_01">
              <div className="close-btn">
                <a onClick={handleClose}>
                  <i className="bi bi-x-square"></i>
                </a>
              </div>
              <h1 className="fo-name">{singlefood.name}</h1>
              <p className="price">$ {singlefood.price}</p>
              <p>Description: {singlefood.description}</p>
              <p>sepciality: {singlefood.sepciality}</p>
              <p>discount: {singlefood.discount}</p>
              <button
                className="btn btn-outline-warning cart-style"
                onClick={() => {
                  addTocart(singlefood.id);
                }}
              >
                <i className="bi bi-cart4"></i>Add to Cart
              </button>
              <button
                className="btn btn-outline-warning details-style"
                onClick={handleClose}
              >
                Close
              </button>
              <br></br>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        open={branchModalStatus}
        onClose={branchClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="food-details">
          <div>
            <div>
              <h3 className="modal-title">Select Your Nearest Branch</h3>
              <div className="close-btn">
                <a onClick={branchClose}>
                  <i className="bi bi-x-square"></i>
                </a>
              </div>
            </div>
            <div className="section-branch">
            <button className="btn-details" onClick={() => setMainBranch()}>
              <i className="bi bi-geo-alt-fill icon-space5"></i>
              <span className="city-01">GoTo Main Branch</span>
              <br></br>
            </button>
          </div>
            {branch
              ? branch.map((data) => (
                  <div className="section-branch">
                    <button
                      className="btn-details"
                      onClick={() =>
                        selectBranch(
                          data.id,
                          data.city,
                          data.phone,
                          data.address,
                          data.email
                        )
                      }
                    >
                      <i className="bi bi-geo-alt-fill icon-space5"></i>
                      <span className="city-01">{data.city} Branch</span>
                      <br></br>
                      <span className="address-01">{data.address}</span>
                    </button>
                  </div>
                ))
              : null}

          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Index;
