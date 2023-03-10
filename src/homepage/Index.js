import React, { Component, useEffect, useState, createContext } from "react";
import { useLocation } from "react-router-dom";
import Login from "../app/user-pages/login/customer/login";
import { Dropdown } from "react-bootstrap";
import { Trans } from "react-i18next";
import "../homepage/assets/css/style.css";
import { Link } from "react-router-dom";
import {
  baseUrl,
  restaurant_id,
  axios,
  Swal,
  Form,
} from "../app/user-pages/constant/global";
import StarRatingComponent from "react-star-rating-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

import Modal from "@mui/material/Modal";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
const token = sessionStorage.getItem("token");

function Index() {
  const [resturant, setResturant] = useState("");
  const [branch, setBranch] = useState("");
  const [branchName, setBranchName] = useState("");
  const [branchPhone, setBranchPhone] = useState("");
  const [branchEmail, setBranchEmail] = useState("");
  const [branchAddres, setBranchAddress] = useState("");
  const [state, setState] = useState();

  const [branchId, setBranchId] = useState("");
  const [category, setCategory] = useState("");
  const [food, setFood] = useState("");
  const [spfood, setSpFood] = useState("");
  const [singlefood, setSingleFood] = useState("");
  const [orderDetails, setOrderDetails] = useState([]);
  const order = [];
  const [open, setOpen] = React.useState(false);
  const [branchModalStatus, setBranchModalStatus] = React.useState(false);
  const [loginModalStatus, setLoginModalStatus] = React.useState(false);
  const [mobileModalStatus, setMobileModalStatus] = React.useState(false);
  const [profile, setProfile] = React.useState(true);
  const [multiple, setMultiple] = useState("");
  const [review, setReview] = useState("");

  //booking
  const [bookingDate, setBookingDate] = useState();
  const [numberOfPeople, setNumberOfPeople] = useState();
  const [table, setTable] = useState();
  const [alltable, setAllTable] = useState();
  const [type, setType] = useState();
  const [startingTime, setStartingTime] = useState();
  const [endingTime, setEndingTime] = useState();

  const [fname, setFname] = useState();

  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [note, setNote] = useState();
  const [location, setLocation] = useState({});
  const [userCity, setuserCity] = useState();
  const [multiSingleImage, setMultiSingleImage] = useState();

  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    axios
      .get(
        `${baseUrl}/api/profile/${sessionStorage.getItem(
          "loginType"
        )}/${sessionStorage.getItem("emp_id")}`
      )
      .then((response) => {
        setState(response.data);
      });
    setProfile(false);
  }, [profile]);

  useEffect(() => {
    const jsonString = sessionStorage.getItem("orderDetails2");
    const parsedObject = JSON.parse(jsonString);

    setOrderDetails(parsedObject ? parsedObject : []);
    sessionStorage.removeItem("orderDetails2");
  }, []);

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
  const multipleFoodImage = (imageName) => {
    setMultiSingleImage(imageName);
  };
  const branchOpen = () => {
    getBranch();
    setBranchModalStatus(true);
  };

  const branchClose = () => setBranchModalStatus(false);

  const LoginModalOpen = () => {
    setLoginModalStatus(true);
  };

  const LoginModalClose = () => setLoginModalStatus(false);

  const mobileModalOpen = () => {
    setMobileModalStatus(true);
  };

  const mobileModalClose = () => setMobileModalStatus(false);

  const handleOpen = (id, item_code) => {
    axios
      .get(`${baseUrl}/api/food-edit/${id}`)

      .then((res) => {
        setSingleFood(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${baseUrl}/api/multiple-images/${item_code}`)

      .then((res) => {
        setMultiple(res.data.food);
        setReview(res.data.reviews);
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(true);
    //console.log(singlefood.name);
  };

  const handleClose = () => {
    setOpen(false);
    setMultiSingleImage();
  };

  useEffect(() => {
    getFood();
    getspFood();
  }, [branchId]);

  useEffect(() => {
    getCategory();
    getResturant();
    getTable();
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

  const getTable = () => {
    axios.get(`${baseUrl}/api/tables/${restaurant_id}`).then((response) => {
      //console.log(allData);
      setAllTable(response.data);
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
      });
  };
  const getBranch = () => {
    axios.get(`${baseUrl}/api/branch/${restaurant_id}`).then((response) => {
      setBranch(response.data);
      setBranchName(response.data[0].city);
    });
  };
  const getResturant = () => {
    axios.get(`${baseUrl}/api/restaurant/${restaurant_id}`).then((response) => {
      setResturant(response.data);
    });
  };
  const defultbranch = () => {
    axios
      .get(
        `${baseUrl}/api/restaurant/${restaurant_id}/${
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
        `${baseUrl}/api/category-foods/${id}/${restaurant_id}/${
          branchId ? branchId : restaurant_id
        }`
      )
      .then((response) => {
        setFood(response.data);
      });
  };
  const getspFood = () => {
    axios.get(`${baseUrl}/api/sp-foods/${restaurant_id}`).then((response) => {
      setSpFood(response.data);
    });
  };
  const selectBranch = (id, city, phone, address, email) => {
    setBranchId(id);
    setBranchName(city);
    // setOrderDetails([]);
    setBranchPhone(phone);
    setBranchAddress(address);
    setBranchEmail(email);
    setBranchModalStatus(false);
    localStorage.setItem("branchId", id);
    setBranchId(id);
    //console.log(resturant);
    //console.log(userCity);
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
            item_code: val.item_code,
            image: val.image,
            food_price: val.price,
            basic: val.basic_price,
            qty: 1,
          });

          setOrderDetails((state) => [...state, order]);
        }
      });
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("loginType");
    sessionStorage.removeItem("customer_id");
    window.location.href = "/";
  };
  return (
    <div>
      <div id="topbar" className="d-flex align-items-center fixed-top">
        <div className="container d-flex justify-content-md-between">
          <div className="contact-info d-flex align-items-center">
            <button className="branch-style none">
              <span className="branch-style active-time">
                <a href={`tel: ${resturant.phone}`}>
                  {" "}
                  <i className="bi bi-phone"></i> {resturant.phone}
                </a>
              </span>
            </button>

            <i className="bi bi-clock align-items-center ms-4 none">
              <span className="none"> Sat-Fri: 10AM - 11PM</span>
            </i>
          </div>
          <div className="two_part none">
            <button
              className="branch-style none"
              onClick={() => {
                branchOpen();
              }}
            >
              <i className="bi bi-geo-alt-fill icon-space4 none"></i>
              <span className="active-time branch-style none">
                {resturant.restaurant_name},{" "}
                {branchId ? branchName : resturant.city}
              </span>
            </button>

            <a
              href="#book-a-table"
              className="book-a-table-btn d-none d-lg-flex branch-style"
            >
              <i className="bi bi-table icon-space4"></i> Book a table
            </a>
          </div>
          <div className="mobile-view">
            <div className="view-style">
              <div className="mobile-view-button">
              <button
              className="branch-style"
              onClick={() => {
                branchOpen();
              }}
            >
              <i className="bi bi-geo-alt-fill icon-space4"></i>
              <span className="active-time branch-style">
                {resturant.restaurant_name},{" "}
                {branchId ? branchName : resturant.city}
              </span>
            </button>
              </div>
            <div>
            {state ? (
              <div className="dropdown scrollto">
                    <a
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="two_part">
                    {sessionStorage.getItem("loginType") == "Customer" ? (
                      <img
                        className="img-xs rounded-circle"
                        src={`${baseUrl}/customer/small/${state.image}`}
                        alt="profile"
                      />
                    ) : (
                      <img
                        className="img-xs rounded-circle"
                        src={`${baseUrl}/employee/small/${state.image}`}
                        alt="profile"
                      />
                    )}
                    <p className="mb-0 d-none d-sm-block navbar-profile-name drop">
                      <Trans>
                        {state.name} {state.first_name}
                        {state.last_name}
                      </Trans>
                    </p>
                    <i className="mdi mdi-menu-down d-none d-sm-block drop"></i>
                  </div>
                </a>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li>
  
                    <a class="dropdown-item" href="/user/edit-password">
  
                      <i className="bi bi-lock-fill"></i> Change Password
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/user/profile">
                      <i className="bi bi-person-bounding-box"></i> Profile
                    </a>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        logout();
                      }}
                    >
                      <i className="mdi mdi-logout text-danger"></i> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="branch-style">
                <a
                  className="mobile-view-login"
                  href="/customer/login"
                >
                <i class="bi bi-box-arrow-in-right icon-space4"></i>  Login/SignUp
                </a>
              </div>
            )}
            </div>
            </div>
          </div>
        </div>
      </div>
      <header id="header" className="fixed-top d-flex align-items-cente">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-lg-between">
          <div className="dis">
            <div className="me-auto me-lg-0">
              <img
                className="footer-logo"
                src={`${baseUrl}/restaurants/small/${resturant.logo}`}
              ></img>
              <span className="res"> Restaurent</span>
              <span className="company_name">FOOD</span>
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
                {sessionStorage.getItem("loginType") == "Customer" ? (
                  <Link
                    className="nav-link scrollto"
                    to={{
                      pathname: "/customer-order",
                    }}
                  >
                    {sessionStorage.setItem(
                      "orderDetails",
                      JSON.stringify(orderDetails)
                    )}
                    <i className="bi bi-cart4"></i>
                    <span className="cart-number">
                      {orderDetails ? orderDetails.length : 0}
                    </span>
                  </Link>
                ) : (
                  <Link onClick={LoginModalOpen}>
                    <i className="bi bi-cart4"></i>
                    <span className="cart-number">
                      {orderDetails ? orderDetails.length : 0}
                    </span>
                  </Link>
                )}
              </li>
            </ul>
          </nav>
          <button className="mobile-nav-toggle" onClick={mobileModalOpen}><i className="bi bi-list"></i></button>
          {state ? (
            <div className="dropdown scrollto d-none d-lg-flex">
              <a
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="two_part">
                  {sessionStorage.getItem("loginType") == "Customer" ? (
                    <img
                      className="img-xs rounded-circle"
                      src={`${baseUrl}/customer/small/${state.image}`}
                      alt="profile"
                    />
                  ) : (
                    <img
                      className="img-xs rounded-circle"
                      src={`${baseUrl}/employee/small/${state.image}`}
                      alt="profile"
                    />
                  )}
                  <p className="mb-0 d-none d-sm-block navbar-profile-name drop">
                    <Trans>
                      {state.name} {state.first_name}
                      {state.last_name}
                    </Trans>
                  </p>
                  <i className="mdi mdi-menu-down d-none d-sm-block drop"></i>
                </div>
              </a>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>

                  <a class="dropdown-item" href="/user/edit-password">

                    <i className="bi bi-lock-fill"></i> Change Password
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/user/profile">
                    <i className="bi bi-person-bounding-box"></i> Profile
                  </a>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      logout();
                    }}
                  >
                    <i className="mdi mdi-logout text-danger"></i> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <a
                className="scrollto d-none d-lg-flex  border-class"
                href="/customer/login"
              >
                Login/SignUp
              </a>
            </div>
          )}
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
                          handleOpen(data.id, data.item_code);
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
                    className="form-control"
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
                    className="form-control"
                  >
                    <option value="">Select here</option>
                    {alltable
                      ? alltable.map((data) => (
                          <option value={data.table_id}>
                            {data.table_name}({data.table_type})
                          </option>
                        ))
                      : null}
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
                      sufficient for us.??????{" "}
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
                      popular. A touch of saltiness and spiciness and sweet???.
                      New experience ????. Only cash payment.{" "}
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
                    <div className="me-auto me-lg-0">
                      <a href="index.html">
                        <img
                          className="footer-logo"
                          src={`${baseUrl}/restaurants/small/${resturant.logo}`}
                        ></img>
                      </a>
                      <span className="res"> Restaurent</span>
                      <span className="company_name">FOOD</span>{" "}
                    </div>
                  </div>
                  <p>
                    <span className="yellow">Main Branch</span>
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
                  Subscribe for our newsletter. Be updated with our food and
                  recipes.
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
            &copy; Copyright. <strong> All Rights Reserved </strong>{" "}
            <a href="https://www.massivestarstudio.com">
              MassiveStar Studio Ltd.
            </a>
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
            <div className="col-md-6">
              <img
                className="sec-image"
                src={
                  multiSingleImage
                    ? `${baseUrl}/foods/multiple/${multiSingleImage}`
                    : `${baseUrl}/foods/medium/${singlefood.image}`
                }
              ></img>
              <div className="image-preview-column">
                {multiple
                  ? multiple.map((data) => (
                      <button
                        onClick={() => {
                          multipleFoodImage(data.images);
                        }}
                        className="multi-image-btn"
                      >
                        <img
                          className="hover-image"
                          src={`${baseUrl}/foods/multiple/${data.images}`}
                          width="100rem"
                        ></img>
                      </button>
                    ))
                  : null}
              </div>
            </div>

            <div className="sec_01 col-md-6">
              <div>
                <a className="close-btn" onClick={handleClose}>
                  <i className="bi bi-x-square"></i>
                </a>
              </div>
              <div className="fo-name">
                <h2>{singlefood.name}</h2>
                <p className="price">{singlefood.price} Tk.</p>
                <p>
                  <span className="company_name">Description: </span>
                  {singlefood.description}
                </p>
                <p>sepciality: {singlefood.sepciality}</p>
                <p>discount: {singlefood.discount}</p>
              </div>

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
              <br></br>

              <p>
                What Customer's says about this{" "}
                <strong>{singlefood.name}</strong>
              </p>
              <div className="">
                <div className="review wid">
                  {review
                    ? review.map((data) => (
                        <div className="wid two_part">
                          <div>
                            <img
                              className="img-xs rounded-circle comment-profile"
                              src={`${baseUrl}/customer/small/${data.image}`}
                            ></img>
                          </div>

                          <div className="wid review-two">
                            <div className="profile-rating">
                              <p>
                                <strong className="profile-name">
                                  {" "}
                                  {data.name}
                                </strong>
                              </p>
                              <div>
                                <i className="bi bi-star-fill company_name"></i>{" "}
                                <span>{data.rating}/5</span>
                              </div>
                            </div>
                            <p>{data.comment}</p>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
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
      </Modal>
      <Modal
        open={loginModalStatus}
        onClose={LoginModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="login_modal">
          <div className="close-btn-login">
            <a onClick={LoginModalClose}>
              <i className="bi bi-x-square"></i>
            </a>
          </div>
          <Login
            setLoginModalStatus={setLoginModalStatus}
            setProfile={setProfile}
          />
        </div>
      </Modal>
      <Modal
      open={mobileModalStatus}
      onClose={mobileModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="mobile_modal">
        <div className="close-btn-mobile">
          <a onClick={mobileModalClose}>
            <i className="bi bi-x-square"></i>
          </a>
          </div>
          <br></br>
          <br></br>
          <ul onClick={mobileModalClose} className="mobile-nav">
          <li>
            <a className="nav-link scrollto active stl" href="#hero">
            <i className="bi bi-house-door-fill stl"></i> Home
            </a>
          </li>
          <li>
            <a className="nav-link scrollto stl" href="#about">
            <i className="bi bi-file-earmark-spreadsheet-fill stl"></i> About
            </a>
          </li>
          <li>
            <a className="nav-link scrollto stl" href="#menu">
            <i className="bi bi-list-columns-reverse stl"></i> Menu
            </a>
          </li>
          <li>
            <a className="nav-link scrollto stl" href="#specials">
            <i className="bi bi-stoplights-fill stl"></i> Specials
            </a>
          </li>
          <li>
            <a className="nav-link scrollto stl" href="#events">
            <i className="bi bi-calendar-event stl"></i> Events
            </a>
          </li>
          <li>
            <a className="nav-link scrollto stl" href="#chefs">
            <i className="bi bi-people stl"></i> Chefs
            </a>
          </li>
          <li>
            <a className="nav-link scrollto stl" href="#gallery">
            <i className="bi bi-grid-3x3-gap stl"></i> Gallery
            </a>
          </li>
          <li>
            <a className="nav-link scrollto stl" href="#contact">
            <i className="bi bi-person-rolodex stl"></i> Contact
            </a>
          </li>
          <li>
            {sessionStorage.getItem("loginType") == "Customer" ? (
              <Link
                className="nav-link scrollto"
                to={{
                  pathname: "/customer-order",
                }}
              >
                {sessionStorage.setItem(
                  "orderDetails",
                  JSON.stringify(orderDetails)
                )}
                <i className="bi bi-cart4 stl"></i><span className="stl"> Cart</span>
                <span className="cart-number">
                  {orderDetails ? orderDetails.length : 0}
                </span>
              </Link>
            ) : (
              <Link onClick={LoginModalOpen}>
                <i className="bi bi-cart4 stl"></i><span className="stl"> Cart</span>
                <span className="cart-number">
                  {orderDetails ? orderDetails.length : 0}
                </span>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </Modal>
    </div>
  );
}

export default Index;
