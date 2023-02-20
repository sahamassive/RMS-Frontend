import React, { Component, useEffect, useState } from "react";
import "./style.css";
import { baseUrl, restaurant_id, axios, Swal, Form } from "../constant/global";
import profile from "../../../assets/images/profile/profile.jpg";

function EditProfile() {
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

        </div>
    );
}

export default EditProfile;