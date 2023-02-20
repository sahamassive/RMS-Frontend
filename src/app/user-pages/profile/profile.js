import React, { Component, useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "./style.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";
import profile from "../../../assets/images/profile/profile.jpg";

function Profile() {
    const [profileInfo, setProfileInfo] = useState();
    const type = sessionStorage.getItem("loginType");
    const emp_id = sessionStorage.getItem("emp_id");
    const [preview, setPrview] = useState();

    useEffect(() => { 
        axios
            .get(`${baseUrl}/api/profile/${type}/${emp_id}`)
            .then((response) => { 
                console.log(response.data); 
                setProfileInfo(response.data);
            })
    }, [])
    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="btn-section">
                            <h4 className="card-title">Profile Information:</h4>
                            <a className="btn-style btn btn-info" href="/restaurant/all">
                            <i class="bi bi-pencil-square"></i> Edit Profile
                            </a>
                        </div>
                        {profileInfo ? (
                            <div className="col-md-12 background">
                                <div className="table-responsive">
                                    <table class="table table-striped table-bordered">
                                        <tr>
                                            <td>
                                                <img
                                                    className="profile-img"
                                                    src={preview ? preview : profile}
                                                />
                                            </td>
                                            <td>
                                                <table className="wid table-hover">
                                                    <tr>
                                                        <td>Full name :</td>
                                                        <td>{profileInfo.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>E-mail :</td>
                                                        <td>{profileInfo.email}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Address :</td>
                                                        <td>{profileInfo.address}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Delivery Address :</td>
                                                        <td>{profileInfo.delivery_address}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>status :</td>
                                                        <td>
                                                            {profileInfo.status == "0" ? (<button className="btn btn-danger" disabled>Not Active</button>) : null}
                                                            {profileInfo.status == "1" ? (<button className="btn btn-success" disabled>Active</button>) : null}
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;