import React, { Component, useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./style.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";
import profile from "../../../assets/images/profile/profile.jpg";
import { Roofing } from "@mui/icons-material";

function Profile() {
  const token = sessionStorage.getItem("token");
  const [profileInfo, setProfileInfo] = useState();
  const type = sessionStorage.getItem("loginType");
  const emp_id = sessionStorage.getItem("emp_id");
  const [preview, setPrview] = useState();

  if (type) {
        
  }
  else {
    window.location.href = "/";
  }

  useEffect(() => {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

    axios.get(`${baseUrl}/api/profile/${type}/${emp_id}`).then((response) => {
      //console.log(response.data);
      setProfileInfo(response.data);
    });
  }, []);

  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">Profile Information:</h4>
              {type == 'Customer' ?
                <a className="btn-style btn btn-info" href="/customer/profile">
              <i className="bi bi-pencil-square"></i> Edit Profile
                </a> 
                :
                <a className="btn-style btn btn-info" href="/user/edit-profile">
                <i className="bi bi-pencil-square"></i> Edit Profile
              </a>
              }
            </div>
            {profileInfo ? (
              <div className="col-md-12 background">
                <div className="table-responsive">
                  <table className="table table-striped table-bordered">
                    <tbody>
                      <tr>
                        <td className="td-01">
                          {type == "Customer" ?
                          <img
                          className="profile-img"
                          src={profileInfo.image ? `${baseUrl}/customer/small/${profileInfo.image}` : profile }
                            /> 
                            :
                            <img
                            className="profile-img"
                            src={profileInfo.image ? `${baseUrl}/employee/small/${profileInfo.image}` : profile }
                          />
                        }
                        </td>
                        <td>
                          <table className="wid table-hover">
                            <tbody>
                              <tr>
                                <td>Full name :</td>
                                <td>
                                  {profileInfo.name} {profileInfo.first_name}{" "}
                                  {profileInfo.last_name}
                                </td>
                              </tr>
                              <tr>
                                <td>E-mail :</td>
                                <td>{profileInfo.email}</td>
                              </tr>
                              <tr>
                                <td>Phone :</td>
                                <td>{profileInfo.phone}</td>
                              </tr>
                              <tr>
                                <td>Address :</td>
                                <td>{profileInfo.address}</td>
                              </tr>
                              {type == 'Customer' ? (
                                <tr>
                                  <td>Delivery Address :</td>
                                  <td>{profileInfo.delivery_address}</td>
                                </tr>
                              ) : null}

                              <tr>
                                <td>status :</td>
                                <td>
                                  {profileInfo.status == "0" ? (
                                    <button className="btn btn-danger" disabled>
                                      Not Active
                                    </button>
                                  ) : null}
                                  {profileInfo.status == "1" ? (
                                    <button className="btn btn-success" disabled>
                                      Active
                                    </button>
                                  ) : null}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
