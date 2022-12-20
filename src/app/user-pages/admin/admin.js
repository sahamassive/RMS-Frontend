import React, { Component, useEffect, useState } from "react";
import DataTable  from "react-data-table-component";
import './style.css';

function Admin() { 
    const [allData, setAllData] = useState([]);
    useEffect(() => {
        const url = "https://jsonplaceholder.typicode.com/todos";
        fetch(url)
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                setAllData(response.data)
        })
    },[]);
    return (
            <div>
            <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
              <div className="btn-section">
              <h4 className="card-title">Admin</h4>
              <a  className="btn-style btn btn-info" href="/super-admin/employee/registration"><i className="bi bi-plus"></i>New Registration</a>
          </div>
                        <div className="table-responsive"> 
                    <DataTable/>
                </div>
              </div>
            </div>
                </div>
            </div>
        );
    }

export default Admin;