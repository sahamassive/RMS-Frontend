import React, { Component, useState } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { Collapse, Dropdown } from "react-bootstrap";
import { Trans } from "react-i18next";
import "./style2.css";
const loginType = sessionStorage.getItem("loginType");

class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({
        [menuState]: false,
      });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({
        [menuState]: true,
      });
    } else {
      Object.keys(this.state).forEach((i) => {
        this.setState({
          [i]: false,
        });
      });
      this.setState({
        [menuState]: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(this.state).forEach((i) => {
      this.setState({
        [i]: false,
      });
    });

    const dropdownPaths = [
      {
        path: "/apps",
        state: "appsMenuOpen",
      },
      {
        path: "/super-admin",
        state: "superAdminOpen",
      },
      {
        path: "/pos",
        state: "posOpen",
      },
      {
        path: "/catalogue",
        state: "superAdminCatalogueOpen",
      },
      {
        path: "/waste",
        state: "wasteOpen",
      },
      {
        path: "/booking",
        state: "bookingOpen",
      },
      {
        path: "/restaurant",
        state: "restaurantOpen",
      },
      {
        path: "/hr",
        state: "hrOpen",
      },
      {
        path: "/branch",
        state: "branchOpen",
      },
      {
        path: "/recipe",
        state: "recipeOpen",
      },
      {
        path: "/discount",
        state: "discountOpen",
      },
      {
        path: "/order",
        state: "orderOpen",
      },
      {
        path: "/inventory",
        state: "inventoryOpen",
      },
    ];

    dropdownPaths.forEach((obj) => {
      if (this.isPathActive(obj.path)) {
        this.setState({
          [obj.state]: true,
        });
      }
    });
  }

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <img
            className="logo"
            src={require("../../assets/images/logo.png")}
            alt=""
          ></img>
          <p className="company_name">
            <span className="res">Restaurant</span> FOOD
          </p>
        </div>
        <ul className="nav">
          <li className="nav-item nav-category">
            <span className="nav-link">Navigation Options</span>
          </li>
          <li
            className={
              this.isPathActive("/dashboard")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" to="/dashboard">
              <span className="menu-icon">
                <i className="bi bi-house-door-fill"></i>
              </span>
              <span className="menu-title">
                <Trans>Dashboard</Trans>
              </span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/restaurant")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.restaurantOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("restaurantOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-laptop"></i>
              </span>
              <span className="menu-title">
                <Trans>
                  Restaurant <br></br>Management
                </Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.restaurantOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/restaurant/all")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/restaurant/all"
                    >
                      <Trans>All restaurant</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/restaurant/new-restaurant")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/restaurant/new-restaurant"
                    >
                      <Trans>New restaurant</Trans>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive("/branch")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.restaurantOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("branchOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="bi bi-bezier"></i>
              </span>
              <span className="menu-title">
                <Trans>Branch Management</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.branchOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/restaurant/all")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/branchs"
                    >
                      <Trans>All Branch</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/branch/new-branch")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/branch/new-branch"
                    >
                      <Trans>New Branch</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/branch/food-add")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/branch/food-add"
                    >
                      <Trans>Food Add</Trans>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive("/super-admin")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.superAdminOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("superAdminOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="bi bi-people-fill"></i>
              </span>
              <span className="menu-title">
                <Trans>Admin Management</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.superAdminOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/super-admin/super-admin")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/super-admin/super-admin"
                    >
                      <Trans>Super Admin</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/super-admin/admin")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/super-admin/admin"
                    >
                      <Trans>Admin</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/super-admin/sub-admin")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/super-admin/sub-admin"
                    >
                      <Trans>Sub-Admin</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/super-admin/all-admin")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/super-admin/all-admin"
                    >
                      <Trans>All</Trans>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive("/pos")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.posOpen ? "nav-link menu-expanded" : "nav-link"
              }
              onClick={() => this.toggleMenuState("posOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-playlist-play"></i>
              </span>
              <span className="menu-title">
                <Trans>POS Management</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.posOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/pos/quick-order")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/pos/quick-order"
                    >
                      <Trans>Quick Order</Trans>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive("/order")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.orderOpen ? "nav-link menu-expanded" : "nav-link"
              }
              onClick={() => this.toggleMenuState("orderOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-laptop"></i>
              </span>
              <span className="menu-title">
                <Trans>Order Management</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.orderOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/order/all-order")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/order/all-order"
                    >
                      <Trans>All Order</Trans>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive("/inventory")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.orderOpen ? "nav-link menu-expanded" : "nav-link"
              }
              onClick={() => this.toggleMenuState("inventoryOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-laptop"></i>
              </span>
              <span className="menu-title">
                <Trans>
                  Inventory <br></br>Management
                </Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.inventoryOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/inventory/new-supplier")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/inventory/new-supplier"
                    >
                      <Trans>New Supplier</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/inventory/new-invoice")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/inventory/new-invoice"
                    >
                      <Trans>New Invoice</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/inventory/new-inventory")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/inventory/new-inventory"
                    >
                      <Trans>New Inventory</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/inventory/ingredient")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/inventory/ingredient"
                    >
                      <Trans>Ingredient</Trans>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive("/recipe")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.recipeOpen ? "nav-link menu-expanded" : "nav-link"
              }
              onClick={() => this.toggleMenuState("recipeOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-laptop"></i>
              </span>
              <span className="menu-title">
                <Trans>Recipe Management</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.recipeOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/recipe/new-recipe")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/recipe/new-recipe"
                    >
                      <Trans>New recipe</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/basic/price")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/basic/price"
                    >
                      <Trans>Basic Price</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/item/list")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/item/list"
                    >
                      <Trans>Item List</Trans>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive("/catalogue")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.superAdminCatalogueOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => this.toggleMenuState("superAdminCatalogueOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-table-large"></i>
              </span>
              <span className="menu-title">
                <Trans>
                  Catalogue <br /> Management
                </Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.superAdminCatalogueOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/catalogue/section")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/catalogue/section"
                    >
                      <Trans>Section</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/catalogue/category")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/catalogue/category"
                    >
                      <Trans>Category</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/catalogue/brand")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/catalogue/brand"
                    >
                      <Trans>Brand</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/catalogue/food")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/catalogue/food"
                    >
                      <Trans>Food item</Trans>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive("/discount")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.discountOpen ? "nav-link menu-expanded" : "nav-link"
              }
              onClick={() => this.toggleMenuState("discountOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="bi bi-percent"></i>
              </span>
              <span className="menu-title">
                <Trans>Discount Management</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.discountOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/discount/new-discount")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/discount/new-discount"
                    >
                      <Trans>New Discount</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/discount/all-discount")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/discount/all-discount"
                    >
                      <Trans>All Discount</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/discount/coupon/all-coupon")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/discount/coupon/all-coupon"
                    >
                      <Trans>All Coupon</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={
                        this.isPathActive("/discount/coupon/new-coupon")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/discount/coupon/new-coupon"
                    >
                      <Trans>New Coupon</Trans>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive("/waste")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.wasteOpen ? "nav-link menu-expanded" : "nav-link"
              }
              onClick={() => this.toggleMenuState("wasteOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-security"></i>
              </span>
              <span className="menu-title">
                <Trans>Waste Management</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.wasteOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/waste/all")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/waste/all"
                    >
                      <Trans>All waste</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/waste/new-waste")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/waste/new-waste"
                    >
                      <Trans>New Waste</Trans>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive("/booking")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.bookingOpen ? "nav-link menu-expanded" : "nav-link"
              }
              onClick={() => this.toggleMenuState("bookingOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="mdi mdi-contacts"></i>
              </span>
              <span className="menu-title">
                <Trans>Booking/Reservation</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.bookingOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/booking/all")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/booking/all"
                    >
                      <Trans>Booking</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/booking/new-booking")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/booking/new-booking"
                    >
                      <Trans>New Booking</Trans>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li
            className={
              this.isPathActive("/hr")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <div
              className={
                this.state.hrOpen ? "nav-link menu-expanded" : "nav-link"
              }
              onClick={() => this.toggleMenuState("hrOpen")}
              data-toggle="collapse"
            >
              <span className="menu-icon">
                <i className="bi bi-people-fill"></i>
              </span>
              <span className="menu-title">
                <Trans>HR Management</Trans>
              </span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={this.state.hrOpen}>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/hr/add-employee")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/hr/add-employee"
                    >
                      <Trans>Add Employee</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/hr/all-employee")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/hr/all-employee"
                    >
                      <Trans>All Employee</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/hr/attendence")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/hr/attendence"
                    >
                      <Trans>Attendence</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/hr/department")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/hr/department"
                    >
                      <Trans>Department</Trans>
                    </Link>
                  </li>
                  {/*<li className="nav-item"> <Link className={this.isPathActive('/hr/new-department') ? 'nav-link active' : 'nav-link'} to="/hr/new-department"><Trans>New Department</Trans></Link></li>*/}
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/hr/leave")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/hr/leave"
                    >
                      <Trans>Employee Leave</Trans>
                    </Link>
                  </li>
                  <li className="nav-item">
                    {" "}
                    <Link
                      className={
                        this.isPathActive("/hr/holidays")
                          ? "nav-link active"
                          : "nav-link"
                      }
                      to="/hr/holidays"
                    >
                      <Trans>Holidays</Trans>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }
}

export default withRouter(Sidebar);
