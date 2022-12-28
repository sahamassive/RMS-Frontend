import React, { Component, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios, { all } from "axios";
import "./style.css";
const baseUrl = "http://127.0.0.1:8000";

function Section() {
  const [allData, setAllData] = useState();
  useEffect(() => {
    axios.get(`${baseUrl}/api/sections`).then((response) => {
      setAllData(response.data);
    });
  }, []);
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Action",
      cell: () => <button>Edit</button>,
    },
    ,
  ];

  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="btn-section">
              <h4 className="card-title">All section</h4>
              <a
                className="btn-style btn btn-info"
                href="/catalogue/create-section"
              >
                <i className="bi bi-plus"></i>New Section
              </a>
            </div>
            <div className="table-responsive">
              <DataTable
                columns={columns}
                pagination={true}
                data={allData}
                selectableRows={true}
                noHeader={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section;
