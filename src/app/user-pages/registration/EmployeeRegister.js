import React, { Component, useEffect, useState } from "react";
import Res from './EmployeeRegistration';

function EmployeeRegister() { 
    const [allData, setAllData] = useState();
    const tableData = () => { 
        axios
            .get('https://jsonplaceholder.typicode.com/todos')
            .then((response) => {
                setAllData(response.data);
                console.log(allData);
            })
        .catch((error) => { console.log(error) })
    };
    useEffect(() => {
        tableData()
    }, []);
    return (
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="section-02">
                            <h4 className="card-title">New Registration</h4>
                            <a href="/super-admin/employee/registration"><i class="bi bi-plus"></i> New Registration</a>
                        </div>
                        <div className="table-responsive">
                            <Res />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default EmployeeRegister;