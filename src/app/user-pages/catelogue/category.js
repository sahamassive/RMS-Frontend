import React, { Component, useEffect, useState } from "react";
import DataTable  from "react-data-table-component";
import './style.css';

function Category() {
    const [allData, setAllData] = useState([]);
    useEffect(() => {
        const url = "https://jsonplaceholder.typicode.com/todos";
        fetch(url)
        .then((response) => response.json())
            .then((response) => {
                setAllData(response.data);
        })
    },[]);
    return(
        <div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="btn-section">
                            <h4 className="card-title">All Category</h4>
                            <a className="btn-style btn btn-info" href="/catalogue/create-category"><i
                                    className="bi bi-plus"></i>New Category</a>
                        </div>
                        <div className="table-responsive">
                            <DataTable />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Category;