import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Trans } from "react-i18next";
import "./style2.css";
import { useHistory } from "react-router-dom";
import { baseUrl, axios } from "../user-pages/constant/global";
const token = sessionStorage.getItem("token");
const type = sessionStorage.getItem("loginType");
const emp_id = sessionStorage.getItem("emp_id");

class Navbar extends Component {
  //profile info

  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    // This function will be called once when the component is mounted
    // It's a good place to make asynchronous requests for data
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios.get(`${baseUrl}/api/profile/${type}/${emp_id}`).then((response) => {
      this.setState(response.data);
    });
  }

  profile() {
    window.location.href = `/user/profile`;
  }

  password() {
    window.location.href = `/user/edit-password`;
  }

  //logout function
  logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("loginType");
    sessionStorage.removeItem("customer_id");
    window.location.href = "/";
  }
  toggleOffcanvas() {
    document.querySelector(".sidebar-offcanvas").classList.toggle("active");
  }
  toggleRightSidebar() {
    document.querySelector(".right-sidebar").classList.toggle("open");
  }
  render() {
    return (
      <nav className="navbar p-0 fixed-top d-flex flex-row">
        <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo-mini" to="/">
            <img src={require("../../assets/images/logo.png")} alt="logo" />
          </Link>
        </div>
        <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
          <button
            className="navbar-toggler align-self-center"
            type="button"
            onClick={() => document.body.classList.toggle("sidebar-icon-only")}
          >
            <span className="mdi mdi-menu"></span>
          </button>
          <ul className="navbar-nav w-100">
            <li className="nav-item w-100">
              <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
              </form>
            </li>
          </ul>
          <ul className="navbar-nav navbar-nav-right">
            <Dropdown alignRight as="li" className="nav-item border-left">
              <Dropdown.Toggle
                as="a"
                className="nav-link count-indicator cursor-pointer"
              >
                <i className="mdi mdi-email"></i>
                <span className="count bg-success"></span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="navbar-dropdown preview-list">
                <h6 className="p-3 mb-0">
                  <Trans>Messages</Trans>
                </h6>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="!#"
                  onClick={(evt) => evt.preventDefault()}
                  className="preview-item"
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <img
                        src={require("../../assets/images/faces/face4.jpg")}
                        alt="profile"
                        className="rounded-circle profile-pic"
                      />
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1">
                      <Trans>Mark send you a message</Trans>
                    </p>
                    <p className="text-muted mb-0">
                      {" "}
                      1 <Trans>Minutes ago</Trans>
                    </p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="!#"
                  onClick={(evt) => evt.preventDefault()}
                  className="preview-item"
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <img
                        src={require("../../assets/images/faces/face2.jpg")}
                        alt="profile"
                        className="rounded-circle profile-pic"
                      />
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1">
                      <Trans>Cregh send you a message</Trans>
                    </p>
                    <p className="text-muted mb-0">
                      {" "}
                      15 <Trans>Minutes ago</Trans>
                    </p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="!#"
                  onClick={(evt) => evt.preventDefault()}
                  className="preview-item"
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <img
                        src={require("../../assets/images/faces/face3.jpg")}
                        alt="profile"
                        className="rounded-circle profile-pic"
                      />
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1">
                      <Trans>Profile picture updated</Trans>
                    </p>
                    <p className="text-muted mb-0">
                      {" "}
                      18 <Trans>Minutes ago</Trans>
                    </p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <p className="p-3 mb-0 text-center">
                  4 <Trans>new messages</Trans>
                </p>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown alignRight as="li" className="nav-item border-left">
              <Dropdown.Toggle
                as="a"
                className="nav-link count-indicator cursor-pointer"
              >
                <i className="mdi mdi-bell"></i>
                <span className="count bg-danger"></span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu navbar-dropdown preview-list">
                <h6 className="p-3 mb-0">
                  <Trans>Notifications</Trans>
                </h6>
                <Dropdown.Divider />
                <Dropdown.Item
                  className="dropdown-item preview-item"
                  onClick={(evt) => evt.preventDefault()}
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-calendar text-success"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">
                      <Trans>Event today</Trans>
                    </p>
                    <p className="text-muted ellipsis mb-0">
                      <Trans>
                        Just a reminder that you have an event today
                      </Trans>
                    </p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  className="dropdown-item preview-item"
                  onClick={(evt) => evt.preventDefault()}
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-settings text-danger"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject mb-1">
                      <Trans>Settings</Trans>
                    </h6>
                    <p className="text-muted ellipsis mb-0">
                      <Trans>Update dashboard</Trans>
                    </p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  className="dropdown-item preview-item"
                  onClick={(evt) => evt.preventDefault()}
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-link-variant text-warning"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject mb-1">
                      <Trans>Launch Admin</Trans>
                    </h6>
                    <p className="text-muted ellipsis mb-0">
                      <Trans>New admin wow</Trans>!
                    </p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <p className="p-3 mb-0 text-center">
                  <Trans>See all notifications</Trans>
                </p>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown alignRight as="li" className="nav-item">
              <Dropdown.Toggle
                as="a"
                className="nav-link cursor-pointer no-caret"
              >
                <div className="navbar-profile">
                {type == "Customer" ?
                    <img
                      className="img-xs rounded-circle"
                      src={this.state.image ? `${baseUrl}/customer/small/${this.state.image}` : null}
                      alt="profile"
                    /> 
                  :
                    <img
                      className="img-xs rounded-circle"
                      src={this.state.image ? `${baseUrl}/employee/small/${this.state.image}` : null}
                      alt="profile"
                   />
              }
                  <p className="mb-0 d-none d-sm-block navbar-profile-name">
                    <Trans>
                      {this.state.name} {this.state.first_name}{" "}
                      {this.state.last_name}
                    </Trans>
                  </p>
                  <i className="mdi mdi-menu-down d-none d-sm-block"></i>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="navbar-dropdown preview-list navbar-profile-dropdown-menu">
                <Dropdown.Divider />
                <Dropdown.Item
                  href="!#"
                  onClick={(evt) => evt.preventDefault()}
                  className="preview-item"
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="bi bi-lock-fill"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">
                      <Trans>
                        <button
                          className="btn btn-dark"
                          onClick={this.password}
                        >
                          Change Password
                        </button>
                      </Trans>
                    </p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="!#"
                  onClick={(evt) => evt.preventDefault()}
                  className="preview-item"
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="bi bi-person-bounding-box"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">
                      <Trans>
                        <button className="btn btn-dark" onClick={this.profile}>
                          Profile
                        </button>
                      </Trans>
                    </p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="!#"
                  onClick={(evt) => evt.preventDefault()}
                  className="preview-item"
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-logout text-danger"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">
                      <Trans>
                        <button className="btn btn-dark" onClick={this.logout}>
                          Log Out
                        </button>
                      </Trans>
                    </p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
              </Dropdown.Menu>
            </Dropdown>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            onClick={this.toggleOffcanvas}
          >
            <span className="mdi mdi-format-line-spacing"></span>
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
